import React, { useState, useEffect, useRef } from 'react';
import '../styles/MainStreet.css';
import torcMap from '../images/torc-map.png'; // Import the image

const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber];
};

const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function MainStreet({ businesses }) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [popupStyle, setPopupStyle] = useState({});
  const mainStreetRef = useRef(null);
  const districtNameRef = useRef(null);

  const handleInteraction = (business, event) => {
    event.preventDefault();
    if (business === selectedBusiness) {
      setSelectedBusiness(null);
    } else {
      setSelectedBusiness(business);
      calculatePopupPosition(business);
    }
  };

  const calculatePopupPosition = (business) => {
    if (mainStreetRef.current) {
      const mainStreetRect = mainStreetRef.current.getBoundingClientRect();
      const businessElement = mainStreetRef.current.querySelector(`[data-index="${business.index}"]`);
      const businessRect = businessElement.getBoundingClientRect();

      const popupHeight = 150; // Estimate popup height, adjust as needed
      const popupWidth = 200; // Estimate popup width, adjust as needed
      const margin = 0; // Margin between popup and business

      let top, left, transform;

      // Check if there's enough space above the business
      if (businessRect.top - mainStreetRect.top > popupHeight + margin) {
        // Position above
        top = (businessRect.top - mainStreetRect.top - popupHeight - margin) / mainStreetRect.height * 100 + '%';
        transform = 'translateX(-50%)';
      } else {
        // Position below
        top = (businessRect.bottom - mainStreetRect.top + margin) / mainStreetRect.height * 100 + '%';
        transform = 'translate(-50%, 20%)';
      }

      // Center horizontally
      left = (businessRect.left - mainStreetRect.left + businessRect.width / 2) / mainStreetRect.width * 100 + '%';

      // Adjust horizontal position if too close to the edges
      const leftPixels = (businessRect.left - mainStreetRect.left + businessRect.width / 2);
      if (leftPixels < popupWidth / 2 + 10) {
        left = '10px';
        transform = transform.replace('-50%', '0');
      } else if (leftPixels > mainStreetRect.width - popupWidth / 2 - 10) {
        left = 'auto';
        const right = '10px';
        transform = transform.replace('-50%', '0');
        setPopupStyle({ top, left, right, transform });
        return;
      }

      setPopupStyle({ top, left, transform });
    }
  };

  useEffect(() => {
    const handleOutsideInteraction = (event) => {
      if (selectedBusiness && !event.target.closest('.business, .popup')) {
        setSelectedBusiness(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction);

    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
    };
  }, [selectedBusiness]);

  function updateDistrictNamePosition() {
    if (!mainStreetRef.current || !districtNameRef.current) return;

    const mainStreet = mainStreetRef.current;
    const districtName = districtNameRef.current;
    const businessRect = mainStreet.getBoundingClientRect();
    const districtNameRect = districtName.getBoundingClientRect();

    const viewportMiddle = window.innerHeight / 2;
    let top = viewportMiddle - businessRect.top;

    // Constrain top position
    if (top < districtNameRect.height / 2) {
      top = districtNameRect.height / 2;
    } else if (top > businessRect.height - districtNameRect.height / 2) {
      top = businessRect.height - districtNameRect.height / 2;
    }

    districtName.style.top = `${top}px`;
    districtName.style.left = '50%';
  }

  useEffect(() => {
    updateDistrictNamePosition();
    window.addEventListener('scroll', updateDistrictNamePosition);
    window.addEventListener('resize', updateDistrictNamePosition);
    return () => {
      window.removeEventListener('scroll', updateDistrictNamePosition);
      window.removeEventListener('resize', updateDistrictNamePosition);
    };
  }, []);

  return (
    <div className="main-street" ref={mainStreetRef}>
      <div className="road"></div>
      <div className="torc-map-container">
        <div className="map-wrapper map-box">
          <img src={torcMap} alt="Torc Map" className="torc-map" />
          <div className="map-marker main-street-marker">X</div>
        </div>
      </div>
      <div className="main-street-district-name district-name" ref={districtNameRef}>Main Street</div>
      {businesses.map((business, index) => (
        <div
          key={index}
          data-index={index}
          className={`business position-${business.x} category-${business.category_id || 'unknown'}`}
          onClick={(e) => handleInteraction({...business, index}, e)}
          onTouchStart={(e) => handleInteraction({...business, index}, e)}
        >
          {business.Name ? business.Name[0] : ''}
        </div>
      ))}
      {selectedBusiness && (
        <div 
          className="popup"
          style={popupStyle}
        >
          <h3>{selectedBusiness.Name}</h3>
          <p>{selectedBusiness.description || 'No description available.'}</p>
          <h4>Hours of Operation:</h4>
          <ul>
            {selectedBusiness.business_hours.map((hours, index) => (
              <li key={index}>
                {getDayName(hours.day_of_week)}: {formatTime(hours.open_time)} - {formatTime(hours.close_time)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MainStreet;