import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import OverallRankings from './components/OverallRankings';
import Results from './components/Results';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="sidebar">
          <ul>
            <li><Link to="/">Overall Rankings</Link></li>
            <li>
              <Link to="/results">Race Results</Link>
              <ul className="submenu">
                <li><Link to="/results/0">Race 1</Link></li>
                <li><Link to="/results/1">Race 2</Link></li>
                {/* Add more race links as needed */}
              </ul>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<OverallRankings />} />
            <Route path="/results/*" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;