import React, { useEffect, useRef } from 'react';
import '../styles/ListView.css';

const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber];
};

const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function ListView({ businesses, selectedBusinessId, setIsViewingBusinessDetails, setSelectedBusinessId, handleViewBusinessDetails, setView }) {
  const selectedBusinessRef = useRef(null);

  useEffect(() => {
    if (selectedBusinessId && selectedBusinessRef.current) {
      selectedBusinessRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsViewingBusinessDetails(false);
    }
  }, [businesses, selectedBusinessId, setIsViewingBusinessDetails]);

  if (!businesses || businesses.length === 0) {
    return <div>No businesses to display</div>;
  }

  const handleViewEvents = (businessId) => {
    setView('events');
  };

  return (
    <div className="list-view">
      {businesses.map((business, index) => (
        <div 
          key={business.id || index}
          className={`business-box ${business.id === selectedBusinessId ? 'selected' : ''}`}
          ref={business.id === selectedBusinessId ? selectedBusinessRef : null}
          onClick={() => handleViewBusinessDetails(business.id)}
        >
          <h3 className="business-name">{business.Name}</h3>
          <p className="business-description">{business.description || 'No description available.'}</p>
          <h4 className="hours-heading">Hours of Operation:</h4>
          {business.business_hours && business.business_hours.length > 0 ? (
            <ul className="hours-list">
              {business.business_hours.map((hours, idx) => (
                <li key={idx}>
                  <span className="day">{getDayName(hours.day_of_week)}:</span>
                  <span className="time">{formatTime(hours.open_time)} - {formatTime(hours.close_time)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="unknown-hours">Unknown</p>
          )}
          {business.hasEvents && (
            <button 
              className="view-events-button"
              onClick={(e) => {
                e.stopPropagation();
                handleViewEvents(business.id);
              }}
            >
              View Events
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListView;