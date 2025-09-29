// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vote {
   
    enum Gender { NotSpecified, Male, Female, Other }
    enum VotingStatus { NotStarted, InProgress, Ended }

    struct Voter {
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voteCandidateId; // 0 if not voted
        address voterAddress;
    }

    struct Candidate {
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress;
        uint votes;
    }

   
    address public electionCommission;
    address public winner; // address(0) if tie or no winner
    uint public nextVoterId = 1;
    uint public nextCandidateId = 1;

    uint public startTime;
    uint public endTime;
    bool public stopVoting;

    uint public maxCandidates;

    IERC20 public gldToken;

    mapping(uint => Voter) public voterDetails; // voterId => Voter
    mapping(uint => Candidate) public candidateDetails; // candidateId => Candidate

    // quick existence lookup
    mapping(address => bool) public isCandidate;
    mapping(address => bool) public isVoter;

    /* ============================
       Events
       ============================ */
    event CandidateRegistered(address indexed candidate, uint indexed candidateId, string name);
    event VoterRegistered(address indexed voter, uint indexed voterId, string name);
    event VoteCast(address indexed voter, uint indexed candidateId);
    event WinnerAnnounced(address indexed winner, uint votes);
    event TieDeclared(uint maxVotes);
    event VotingPeriodSet(uint startTime, uint endTime);
    event EmergencyStopped();

    /* ============================
       Constructor
       ============================ */
    constructor(address _gldToken, uint _maxCandidates) {
        require(_gldToken != address(0), "Invalid token address");
        require(_maxCandidates > 0, "maxCandidates must be > 0");

        electionCommission = msg.sender;
        gldToken = IERC20(_gldToken);
        maxCandidates = _maxCandidates;
    }

    /* ============================
       Modifiers
       ============================ */
    modifier onlyCommissioner() {
        require(msg.sender == electionCommission, "Not authorized");
        _;
    }

    modifier isValidAge(uint _age) {
        require(_age >= 18, "Not eligible for voting");
        _;
    }

    modifier isVotingOpen() {
        require(!stopVoting, "Voting stopped by commissioner");
        require(startTime != 0 && block.timestamp >= startTime, "Voting not started");
        require(block.timestamp <= endTime, "Voting ended");
        _;
    }

    modifier whenNotStarted() {
        require(startTime == 0 || block.timestamp < startTime, "Action not allowed after voting start");
        _;
    }

    /* ============================
       Registration functions
       ============================ */

    /// @notice Register a candidate (EOA). Commissioner cannot register as candidate.
    function registerCandidate(
        string calldata _name,
        string calldata _party,
        uint _age,
        Gender _gender
    ) external isValidAge(_age) whenNotStarted {
        require(!isCandidate[msg.sender], "Already registered as candidate");
        require(nextCandidateId <= maxCandidates, "Candidate registration full");
        require(msg.sender != electionCommission, "Commissioner cannot register");

        candidateDetails[nextCandidateId] = Candidate({
            name: _name,
            party: _party,
            age: _age,
            gender: _gender,
            candidateId: nextCandidateId,
            candidateAddress: msg.sender,
            votes: 0
        });

        isCandidate[msg.sender] = true;

        emit CandidateRegistered(msg.sender, nextCandidateId, _name);
        nextCandidateId++;
    }

    /// @notice Register a voter (EOA).
    function registerVoter(
        string calldata _name,
        uint _age,
        Gender _gender
    ) external isValidAge(_age) whenNotStarted {
        require(!isVoter[msg.sender], "Already registered as voter");

        voterDetails[nextVoterId] = Voter({
            name: _name,
            age: _age,
            voterId: nextVoterId,
            gender: _gender,
            voteCandidateId: 0,
            voterAddress: msg.sender
        });

        isVoter[msg.sender] = true;

        emit VoterRegistered(msg.sender, nextVoterId, _name);
        nextVoterId++;
    }

    

    /// @notice Returns all registered candidates as an array (frontend friendly).
    function getCandidateList() external view returns (Candidate[] memory) {
        uint length = nextCandidateId - 1;
        Candidate[] memory list = new Candidate[](length);
        for (uint i = 0; i < length; i++) {
            list[i] = candidateDetails[i + 1];
        }
        return list;
    }

    /// @notice Returns all registered voters as an array.
    function getVoterList() external view returns (Voter[] memory) {
        uint length = nextVoterId - 1;
        Voter[] memory list = new Voter[](length);
        for (uint i = 0; i < length; i++) {
            list[i] = voterDetails[i + 1];
        }
        return list;
    }

    /// @notice Returns the current voting status.
    function getVotingStatus() public view returns (VotingStatus) {
        if (startTime == 0 || block.timestamp < startTime) {
            return VotingStatus.NotStarted;
        } else if (!stopVoting && block.timestamp >= startTime && block.timestamp <= endTime) {
            return VotingStatus.InProgress;
        } else {
            return VotingStatus.Ended;
        }
    }

  

    /// @notice Cast vote for candidate by voter id.
    function castVote(uint _voterId, uint _candidateId) external isVotingOpen {
        require(_voterId > 0 && _voterId < nextVoterId, "Invalid voterId");
        require(_candidateId > 0 && _candidateId < nextCandidateId, "Invalid candidateId");

        Voter storage voter = voterDetails[_voterId];
        require(voter.voterAddress == msg.sender, "Not authorized voter");
        require(voter.voteCandidateId == 0, "You have already voted");

        // token gating: require voter holds at least some tokens
        require(gldToken.balanceOf(msg.sender) > 0, "Token balance too low to vote");

        // record vote
        voter.voteCandidateId = _candidateId;
        candidateDetails[_candidateId].votes++;

        emit VoteCast(msg.sender, _candidateId);
    }

    

    /// @notice Set voting period relative to now (durations in seconds).
    /// @param _startDelay seconds from now when voting should start (0 means start now)
    /// @param _duration seconds length of voting (must be >= 3600)
    function setVotingPeriod(uint _startDelay, uint _duration) external onlyCommissioner {
        require(_duration >= 3600, "_duration must be >= 1 hour");

        startTime = block.timestamp + _startDelay;
        endTime = startTime + _duration;

        emit VotingPeriodSet(startTime, endTime);
    }

    /// @notice Announce the voting result. Sets winner = address(0) if tie or no votes.
    function announceVotingResult() external onlyCommissioner {
        require(nextCandidateId > 1, "No candidates registered");

        uint maxVotes = 0;
        address currentWinner = address(0);
        bool tie = false;

        for (uint i = 1; i < nextCandidateId; i++) {
            uint v = candidateDetails[i].votes;
            if (v > maxVotes) {
                maxVotes = v;
                currentWinner = candidateDetails[i].candidateAddress;
                tie = false;
            } else if (v == maxVotes && v != 0) {
                // if we find another candidate having votes equal to maxVotes -> tie
                tie = true;
            }
        }

        if (maxVotes == 0) {
            // no votes cast
            winner = address(0);
            emit TieDeclared(0);
        } else if (tie) {
            // declare tie, clear winner
            winner = address(0);
            emit TieDeclared(maxVotes);
        } else {
            winner = currentWinner;
            emit WinnerAnnounced(winner, maxVotes);
        }
    }

    /// @notice Emergency stop voting
    function emergencyStopVoting() external onlyCommissioner {
        stopVoting = true;
        emit EmergencyStopped();
    }

    /// @notice Resume voting (if needed)
    function resumeVoting() external onlyCommissioner {
        stopVoting = false;
    }
}