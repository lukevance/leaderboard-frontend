import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

interface Race {
  name: string;
  date: string;
  results: { name: string; time: string }[];
}

const races: Race[] = [
  {
    name: 'Race 1',
    date: '2024-01-15',
    results: [
      { name: 'Alice', time: '25:30' },
      { name: 'Bob', time: '26:15' },
      { name: 'Charlie', time: '27:45' },
    ],
  },
  {
    name: 'Race 2',
    date: '2024-02-20',
    results: [
      { name: 'Alice', time: '24:50' },
      { name: 'Bob', time: '25:10' },
      { name: 'Charlie', time: '26:30' },
    ],
  },
  // Add more mock data as needed
];

const RaceDetail: React.FC = () => {
  const { raceId } = useParams<{ raceId: string }>();
  const raceIndex = parseInt(raceId || '0', 10);
  const race = races[raceIndex];

  return (
    <div>
      <h3>{race.name} - {race.date}</h3>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {race.results.map((result, resultIndex) => (
            <tr key={resultIndex}>
              <td>{resultIndex + 1}</td>
              <td>{result.name}</td>
              <td>{result.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RaceResults: React.FC = () => {
  return (
    <div>
      <h2>Race Results</h2>
      <nav>
        <ul>
          {races.map((race, index) => (
            <li key={index}>
              <Link to={`/race-results/${index}`}>{race.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        <Route path=":raceId" element={<RaceDetail />} />
      </Routes>
    </div>
  );
};

export default RaceResults;
