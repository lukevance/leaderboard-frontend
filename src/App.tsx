import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import OverallRankings from './components/OverallRankings';
import Results from './components/Results';

interface Race {
  id: string;
  raceName: string;
}

const App: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

  useEffect(() => {
    const testCors = async () => {
      const response = await fetch(`${serverUrl}/api/test-cors`);
      console.log(response);
    }
    const fetchRaces = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/race-results`);
        if (!response.ok) {
          throw new Error('Failed to fetch race results');
        }
        const raceData = await response.json();
        setRaces(raceData);
      } catch (error) {
        console.error('Error fetching race results:', error);
      }
    };

    testCors();
    fetchRaces();
  }, [serverUrl]);

  return (
    <Router>
      <div className="App">
        <nav className="sidebar">
          <ul>
            <li><Link to="/">Overall Rankings</Link></li>
            <li>
              <Link to="/results">Race Results</Link>
              <ul className="submenu">
                {races.map((race) => (
                  <li key={race.id}>
                    <Link to={`/results/${race.id}`}>{race.raceName}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<OverallRankings />} />
            <Route path="/results/:raceId" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;