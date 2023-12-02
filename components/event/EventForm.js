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
import { createEvent, updateEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
};

const EventForm = ({ user, obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  // const [eventDate, setEventDate] = useState(initialState.date);
  // const [eventTime, setEventTime] = useState(initialState.time);
  // const [formDate, setFormDate] = useState('');

  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);

    if (obj) setCurrentEvent(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const date = new Date(e);
    // const offset = date.getTimezoneOffset();
    // const todayDate = new Date(date.getTime() + (offset * 60 * 1000));
    // setEventDate(date.toISOString().split('T')[0]);
    // setFormDate(todayDate);
    setCurrentEvent((prevState) => ({
      ...prevState,
      date: date.toISOString().split('T')[0],
    }));
  };

  const handleTimeChange = (e) => {
    // setEventTime(`${e}:00`);
    setCurrentEvent((prevState) => ({
      ...prevState,
      time: `${e}:00`,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      gameId: Number(currentEvent.game),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
    };

    const updatedPayload = {
      gameId: Number(currentEvent.game),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
      id: obj.id,
    };

    if (obj.id) {
      updateEvent(updatedPayload).then(router.push('/events'));
    } else {
      createEvent(payload).then(router.push('/events'));
    }
  };

  const handleTest = () => {
    console.warn(obj);
  };

  return (
    <div>
      <Button onClick={handleTest}>Test Obj</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Select
            aria-label="Games"
            name="game"
            onChange={handleChange}
            value={currentEvent.game?.id}
            className="mb-3"
            required
          >
            <option value="">Please Select a Game</option>
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
          <DatePicker onChange={handleDateChange} name="date" value={currentEvent.date} format="yyyy-MM-dd" required />
        </Form.Group>
        <Form.Group>
          <TimePicker required onChange={handleTimeChange} value={currentEvent.time} disableClock="true" />
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }),
  }),
};

EventForm.defaultProps = {
  obj: '',
};

export default EventForm;
