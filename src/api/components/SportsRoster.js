import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deletePlayer, getRosters, updatePlayer } from '../data/sportsRosterData';

export default function SportsRoster({
  player,
  setPlayers,
  setEditPlayers,
  user,
}) {
  const history = useHistory();
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey).then(() => getRosters(user.uid).then(setPlayers));
    } else {
      updatePlayer(player.uid).then(setPlayers);
    }
  };

  return (
    <div className="rosterStyle">
      <div
        key={player.firebaseKey}
        className="d-flex justify-content-between alert alert-light"
        role="alert"
      >
        <button
          onClick={() => setEditPlayers(player) || history.push('/new')}
          className="btn btn-info"
          type="button"
        >
          EDIT
        </button>
        <div className="player-info">
          <div className="player-image">
            <img src={player.image} alt="sports player" />
          </div>
          {player.name} <br />
          Postion: {player.position}
        </div>
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          id="delete"
          type="button"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

SportsRoster.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};

SportsRoster.defaultProps = { user: {} };
