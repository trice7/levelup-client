import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EventForm from '../../../components/event/EventForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleEvent } from '../../../utils/data/eventData';

const EditEvent = () => {
  const [event, setEvent] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEvent);
  }, [id]);

  return (
    <div>
      <h2>Edit Event{id}</h2>
      <EventForm user={user} obj={event} />
    </div>
  );
};

export default EditEvent;
