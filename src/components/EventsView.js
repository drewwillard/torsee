import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // You'll need to install this package
import 'react-calendar/dist/Calendar.css'; // And import its CSS
import '../styles/EventsView.css';  // Add this line

function EventsView({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filteredEvents = events.filter(event => new Date(event.date) >= today);
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingEvents(filteredEvents);
  }, [events]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setShowCalendar(false);
    const element = document.getElementById(`date-${newDate.toDateString()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const dateString = new Date(event.date).toDateString();
      if (!grouped[dateString]) {
        grouped[dateString] = [];
      }
      grouped[dateString].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate(upcomingEvents);

  return (
    <div className="events-view">
       <h2 className="events-header">Upcoming Events</h2>
       <div className="button-container">
       
        <button 
          className={`nav-button ${showCalendar ? 'active' : ''}`}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
      </div>
      
      {showCalendar && (
        <div className="calendar-popup">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      )}
      <div className="events-list">
        {Object.entries(groupedEvents).map(([dateString, dateEvents]) => (
          <div key={dateString} id={`date-${dateString}`} className="date-group">
            <h3>{dateString}</h3>
            {dateEvents.map((event, index) => (
              <div key={index} className="event-item">
                <h4>{event.name}</h4>
                <p>{event.description}</p>
                <p>Time: {event.time}</p>
              </div>
            ))}
          </div>
        ))}
        {upcomingEvents.length === 0 && <p>No upcoming events.</p>}
      </div>
    </div>
  );
}

export default EventsView;