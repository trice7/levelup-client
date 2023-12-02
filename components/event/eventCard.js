import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EventCard = ({ obj }) => (
  <Card className="text-center">
    <Card.Header>{obj.game.title}</Card.Header>
    <Card.Body>
      <Card.Title>When: {obj.date} at {obj.time}</Card.Title>
      <Card.Text>{obj.description} players needed</Card.Text>
      <Link href={`/events/edit/${obj.id}`} passHref>
        <Button>Edit Event</Button>
      </Link>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  obj: {
    game: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
  }.isRequired,
};

export default EventCard;
