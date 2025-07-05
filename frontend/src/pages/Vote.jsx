import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';
import axios from 'axios';

function Vote() {
  // state to store candidates and selected vote
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState('');

  // fetch candidate list when page loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // temporary dummy data
        const data = ['Alice', 'Bob', 'Charlie'];
        setCandidates(data);
      } catch (err) {
        alert('failed to load candidates');
      }
    };

    fetchCandidates();
  }, []);

  // handle vote submit
  const handleVote = async (e) => {
    e.preventDefault();

    if (!selected) {
      alert('please select a candidate');
      return;
    }

    try {
      const token = getToken(); // get jwt from localstorage

      await axios.post(
        'http://localhost:5001/api/vote',
        { candidate: selected },
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token to backend
          },
        }
      );

      alert('vote submitted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'vote submission failed');
    }
  };

  return (
    <form onSubmit={handleVote}>
      <h2>vote for your candidate</h2>

      {candidates.map((name, index) => (
        <div key={index}>
          <input
            type="radio"
            id={name}
            name="candidate"
            value={name}
            onChange={(e) => setSelected(e.target.value)}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}

      <button type="submit">submit vote</button>
    </form>
  );
}

export default Vote;
