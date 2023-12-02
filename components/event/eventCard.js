import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({ obj, handleRefresh }) => {
  const handleDelete = () => {
    deleteEvent(obj.id).then(handleRefresh);
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
  }).isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default EventCard;
