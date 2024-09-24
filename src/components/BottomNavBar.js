import React from 'react';
import '../styles/BottomNavBar.css';

function BottomNavBar({ view, setView }) {
  return (
    <div className="bottom-nav-bar">
      
      <button 
        className={`nav-button ${view === 'events' ? 'active' : ''}`}
        onClick={() => setView('events')}
      >
        Events
      </button>
      <button 
        className={`nav-button ${view === 'businesses' ? 'active' : ''}`}
        onClick={() => setView('businesses')}
      >
        Businesses
      </button>
      <button 
        className={`nav-button ${view === 'contact' ? 'active' : ''}`}
        onClick={() => setView('contact')}
      >
        Contact
      </button>
    </div>
  );
}

export default BottomNavBar;