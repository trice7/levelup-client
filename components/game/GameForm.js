import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user, obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (obj) {
      const gameObj = {
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: obj.number_of_players,
        skillLevel: obj.skill_level,
        gameTypeId: obj.game_type?.id,
      };
      setCurrentGame(gameObj);
    }
  }, [obj]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    const updatedGame = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
      id: obj.id,
    };

    if (obj.id) {
      updateGame(updatedGame).then(router.push('/games'));
    } else {
      // Send POST request to your API
      createGame(game).then(() => router.push('/games'));
    }
  };

  const handleTest = () => {
    console.warn(currentGame);
  };

  return (
    <>
      <Button onClick={handleTest}>Test</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Select
            aria-label="Game Type"
            name="gameTypeId"
            onChange={handleChange}
            value={currentGame.gameTypeId}
            className="mb-3"
            required
          >
            <option value="">Select a Game Type</option>
            {
              gameTypes.map((type) => (
                <option
                  key={type.id}
                  value={type.id}
                >
                  {type.label}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    game_type: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    maker: PropTypes.string,
    skill_level: PropTypes.number,
    title: PropTypes.string,
    number_of_players: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  obj: '',
};

export default GameForm;
