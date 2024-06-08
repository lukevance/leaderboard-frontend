import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RaceResult {
  id: string;
  overallPlace: number;
  // bib: string;
  name: string;
  divisionPlace: string;
  division: string;
  fromCity: string;
  fromProvState: string;
  teamName: string;
  gunTime: string;
  overallPace: string;
}

interface Race {
  raceId: string;
  raceName: string;
  date: string;
  // published: boolean;
  // results_provider: string;
  // results_url: string;
  results: RaceResult[];
  resultsCount: number;
}

const RaceDetail: React.FC = () => {
  const { raceId } = useParams<{ raceId: string }>();
  const [race, setRace] = useState<Race | null>(null);
  const [filter, setFilter] = useState<'all' | 'wicked'>('all');
  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/race-results/${raceId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch race data');
        }
        const raceData = await response.json();
        setRace(raceData);
      } catch (error) {
        console.error('Error fetching race data:', error);
      }
    };

    fetchRaceData();
  }, [raceId, serverUrl]);

  const toggleFilter = () => {
    setFilter(filter === 'all' ? 'wicked' : 'all');
  };

  if (!race) {
    return <div>Loading...</div>;
  }

  const filteredResults = filter === 'wicked'
    ? race.results.filter(result => result.teamName === 'Wicked' || result.teamName.toLowerCase() === 'wicked running club')
    : race.results;

  return (
    <div>
      <h3>{race.raceName} - {race.date}</h3>
      <p>Total Participants: {filteredResults.length}</p>
      <button onClick={toggleFilter}>
        {filter === 'all' ? 'Show Wicked Running Club' : 'Show All Runners'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            {/* <th>Bib</th> */}
            <th>Name</th>
            <th>Division Place</th>
            <th>Division</th>
            {/* <th>City</th>
            <th>State</th> */}
            <th>Team Name</th>
            <th>Gun Time</th>
            <th>Overall Pace</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result) => (
            <tr key={result.id}>
              <td>{result.overallPlace}</td>
              {/* <td>{result.bib}</td> */}
              <td>{result.name}</td>
              <td>{result.divisionPlace}</td>
              <td>{result.division}</td>
              {/* <td>{result.fromCity}</td>
              <td>{result.fromProvState}</td> */}
              <td>{result.teamName}</td>
              <td>{result.gunTime}</td>
              <td>{result.overallPace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceDetail;
