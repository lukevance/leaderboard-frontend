import React from 'react';

// Define the shape of a ranking item
interface Ranking {
  name: string;
  points: number;
}

// Sample data
const rankings: Ranking[] = [
  { name: 'Alice', points: 120 },
  { name: 'Bob', points: 100 },
  { name: 'Charlie', points: 90 },
  // Add more mock data as needed
];

const Rankings: React.FC = () => {
  return (
    <div>
      <h1>Club Rankings</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;
