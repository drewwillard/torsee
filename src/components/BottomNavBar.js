import React from 'react';
import '../styles/BottomNavBar.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

function BottomNavBar({ setView, currentView }) {
  return (
    <div className="bottom-nav-bar">
      
      <button 
        className={`nav-button ${currentView === 'events' ? 'active' : ''}`}
        onClick={() => setView('events')}
      >
        <FaCalendarAlt />
        <span>Events</span>
      </button>
      <button 
        className={`nav-button ${currentView === 'businesses' ? 'active' : ''}`}
        onClick={() => setView('businesses')}
      >
        <FaMapMarkerAlt />
        <span>Locations</span>
      </button>
      <button 
        className={`nav-button ${currentView === 'contact' ? 'active' : ''}`}
        onClick={() => setView('contact')}
      >
        <FaEnvelope />
        <span>Contact</span>
      </button>
    </div>
  );
}

export default BottomNavBar;