import React, { useState, useEffect } from 'react';
import MainStreet from './components/MainStreet';
import BroadwayStreet from './components/Broadway';
import HotSprings from './components/HotSprings';
import ListView from './components/ListView';
import EventsView from './components/EventsView';
import ContactView from './components/ContactView';
import CategoryDropdown from './components/CategoryDropdown';
import BottomNavBar from './components/BottomNavBar';
import { supabase } from './supabaseClient';
import './styles/App.css';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('businesses');
  const [businessView, setBusinessView] = useState('map');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select(`
            *,
            business_hours (
              day_of_week,
              open_time,
              close_time
            ),
            description,
            business_categories (
              sub_categories (
                id,
                name,
                category_id,
                categories (
                  id,
                  name
                )
              )
            )
          `)
          .order('y', { ascending: true }); // Order by 'y' value

        if (error) throw error;

        // Process the data to add category_id to each business
        const processedData = data.map(business => ({
          ...business,
          category_id: business.business_categories[0]?.sub_categories.category_id
        }));

        setBusinesses(processedData);
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }

      // Fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*');

      if (eventsError) {
        console.error('Error fetching events:', eventsError);
      } else {
        setEvents(eventsData);
      }
    }

    fetchData();
  }, []);

  const mainStreetBusinesses = businesses.filter(b => b.district === 'Main');
  const broadwayStreetBusinesses = businesses.filter(b => b.district === 'Broadway');
  const hotSpringsBusinesses = businesses.filter(b => b.district === 'Hot Springs');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <div className="collection-heading">
        <h1 className="main-heading">T or See</h1>
        <p className="text-center">See Truth or Consequences</p>
        <button className="search-button"></button>
      </div>
      
      {view === 'businesses' && (
        <>
          <div className="button-container">
            <CategoryDropdown 
              selectedCategory={selectedCategory} 
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="button-container">
            <button 
              className={`nav-button ${businessView === 'map' ? 'active' : ''}`}
              onClick={() => setBusinessView('map')}
            >
              Map
            </button>
            <button 
              className={`nav-button ${businessView === 'list' ? 'active' : ''}`}
              onClick={() => setBusinessView('list')}
            >
              List
            </button>
          </div>

          {businessView === 'map' ? (
            <>
              <div className="road"></div>
              {mainStreetBusinesses.length > 0 && (
                <MainStreet 
                  businesses={mainStreetBusinesses.filter(b => selectedCategory === 'all' || b.category_id === parseInt(selectedCategory))} 
                />
              )}
              {broadwayStreetBusinesses.length > 0 && (
                <BroadwayStreet 
                  businesses={broadwayStreetBusinesses.filter(b => selectedCategory === 'all' || b.category_id === parseInt(selectedCategory))} 
                />
              )}
              {hotSpringsBusinesses.length > 0 && (
                <HotSprings 
                  businesses={hotSpringsBusinesses.filter(b => selectedCategory === 'all' || b.category_id === parseInt(selectedCategory))} 
                />
              )}
            </>
          ) : (
            <ListView 
              businesses={businesses.filter(b => selectedCategory === 'all' || b.category_id === parseInt(selectedCategory))} 
            />
          )}
        </>
      )}

      {view === 'events' && <EventsView events={events} />}
      {view === 'contact' && <ContactView />}

      <BottomNavBar view={view} setView={setView} />
    </div>
  );
}

export default App;