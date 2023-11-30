import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';

const Home = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <article>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
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
