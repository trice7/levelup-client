import { clientCredentials } from '../client';

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const joinEvent = (eventId, uid, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const leaveEvent = (eventId, uid, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents,
  createEvent,
  updateEvent,
  getSingleEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
};
