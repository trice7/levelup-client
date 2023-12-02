import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';

const EventCard = ({ obj, handleRefresh }) => {
  const { user } = useAuth();

  const handleDelete = () => {
    deleteEvent(obj.id).then(handleRefresh);
  };

  const handleJoin = () => {
    const payload = {
      userId: user.uid,
    };
    joinEvent(obj.id, user.uid, payload).then(handleRefresh);
  };

  const handleLeave = () => {
    const payload = {
      userId: user.uid,
    };
    leaveEvent(obj.id, user.uid, payload).then(handleRefresh);
  };

  return (
    <Card className="text-center">
      <Card.Header>{obj.game.title}</Card.Header>
      <Card.Body>
        <Card.Title>When: {obj.date} at {obj.time}</Card.Title>
        <Card.Text>{obj.description} players needed</Card.Text>
        <Link href={`/events/edit/${obj.id}`} passHref>
          <Button>Edit Event</Button>
        </Link>
        <Button variant="danger" onClick={handleDelete}>Delete Event</Button>
        {obj.joined ? (<Button variant="warning" onClick={handleLeave}>Leave Event</Button>) : (<Button variant="success" onClick={handleJoin}>Join Event</Button>)}
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  obj: PropTypes.shape({
    game: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    joined: PropTypes.bool,
  }).isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default EventCard;
