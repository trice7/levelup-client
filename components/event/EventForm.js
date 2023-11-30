/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import { getGames } from '../../utils/data/gameData';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { createEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
};

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const [eventDate, setEventDate] = useState(initialState.date);
  const [eventTime, setEventTime] = useState(initialState.time);
  const [formDate, setFormDate] = useState('');

  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const date = new Date(e);
    const offset = date.getTimezoneOffset();
    const todayDate = new Date(date.getTime() + (offset * 60 * 1000));
    setEventDate(date.toISOString().split('T')[0]);
    setFormDate(todayDate);
  };

  const handleTimeChange = (e) => {
    setEventTime(`${e}:00`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      gameId: Number(currentEvent.game),
      description: currentEvent.description,
      date: eventDate,
      time: eventTime,
      userId: user.uid,
    };
    console.warn(payload);
    createEvent(payload).then(router.push('/events'));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Select
            aria-label="Games"
            name="game"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select a Game</option>
            {
              games.map((game) => (
                <option
                  key={game.id}
                  value={game.id}
                >
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} as="textarea" rows={3} />
        </Form.Group>
        <Form.Group>
          <DatePicker onChange={handleDateChange} name="date" value={formDate} format="yyyy-MM-dd" required />
        </Form.Group>
        <Form.Group>
          <TimePicker required onChange={handleTimeChange} value={eventTime} disableClock="true" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
