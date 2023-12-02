/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const Home = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleRefresh = () => {
    getEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    handleRefresh();
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
          <EventCard obj={event} handleRefresh={handleRefresh} />
        </section>
      ))}
    </article>
  );
};

export default Home;
