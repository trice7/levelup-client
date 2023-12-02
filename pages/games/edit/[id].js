import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleGame } from '../../../utils/data/gameData';

const EditGame = () => {
  const [game, setGame] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGame);
  }, [id]);

  return (
    <div>
      <h2> Edit Game</h2>
      <GameForm user={user} obj={game} />
    </div>
  );
};

export default EditGame;
