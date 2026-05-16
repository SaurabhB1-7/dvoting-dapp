// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;

    mapping(address => bool) public hasVoted;

    constructor() {
        candidates.push(Candidate("Alice", 0));
        candidates.push(Candidate("Bob", 0));
    }

    function vote(uint candidateIndex) public {

        require(!hasVoted[msg.sender], "You have already voted");

        candidates[candidateIndex].voteCount++;

        hasVoted[msg.sender] = true;
    }
}