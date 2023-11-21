import React, { useEffect, useState } from 'react';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <article>
      <h1>Events</h1>
      {events.map((event) => (
        <section key={event.id}>
          <EventCard obj={event} />
        </section>
      ))}
    </article>
  );
};

export default Home;
