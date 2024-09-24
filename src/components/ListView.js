import React from 'react';
import '../styles/ListView.css';

const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber];
};

const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function ListView({ businesses }) {
  return (
    <div className="list-view">
      {businesses.map((business, index) => (
        <div key={index} className="business-box">
          <h3 className="business-name">{business.Name}</h3>
          <p className="business-description">{business.description || 'No description available.'}</p>
          <h4 className="hours-heading">Hours of Operation:</h4>
          <ul className="hours-list">
            {business.business_hours.map((hours, idx) => (
              <li key={idx}>
                <span className="day">{getDayName(hours.day_of_week)}:</span>
                <span className="time">{formatTime(hours.open_time)} - {formatTime(hours.close_time)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListView;