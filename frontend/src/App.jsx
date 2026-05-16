import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
  "function vote(uint256 candidateIndex) public",
  "function candidates(uint256) public view returns (string memory name, uint256 voteCount)"
];

function App() {

  const [aliceVotes, setAliceVotes] = useState(0);
  const [bobVotes, setBobVotes] = useState(0);

  async function connectContract() {

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    return contract;
  }

  async function loadVotes() {

    try {

      const contract = await connectContract();

      const alice = await contract.candidates(0);
      const bob = await contract.candidates(1);

      setAliceVotes(Number(alice.voteCount));
      setBobVotes(Number(bob.voteCount));

    } catch (error) {
      console.log(error);
    }
  }

  async function voteAlice() {

    try {

      const contract = await connectContract();

      const tx = await contract.vote(0);

      await tx.wait();

      loadVotes();

    } catch (error) {
      console.log(error);
    }
  }

  async function voteBob() {

    try {

      const contract = await connectContract();

      const tx = await contract.vote(1);

      await tx.wait();

      loadVotes();

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadVotes();
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "Arial"
      }}
    >
      <h1>🗳 Blockchain Voting App</h1>

      <div
        style={{
          border: "1px solid gray",
          padding: "30px",
          margin: "20px",
          borderRadius: "10px"
        }}
      >
        <h2>Alice</h2>

        <p>Votes: {aliceVotes}</p>

        <button onClick={voteAlice}>
          Vote Alice
        </button>
      </div>

      <div
        style={{
          border: "1px solid gray",
          padding: "30px",
          margin: "20px",
          borderRadius: "10px"
        }}
      >
        <h2>Bob</h2>

        <p>Votes: {bobVotes}</p>

        <button onClick={voteBob}>
          Vote Bob
        </button>
      </div>
    </div>
  );
}

export default App;