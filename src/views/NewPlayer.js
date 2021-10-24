import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  createPlayer,
  getRosters,
  updatePlayer,
} from '../api/data/sportsRosterData';

const initialState = {
  name: '',
  position: '',
  image: '',
};

export default function NewPlayer({
  obj,
  setPlayers,
  setEditPlayers,
  user,
}) {
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: user.uid,
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      image: e.target.value,
    }));
  };

  const handleChangePosition = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      position: e.target.value,
    }));
  };

  useEffect(() => {
    let isMounted = true;
    if (obj.firebaseKey) {
      if (isMounted) {
        setFormInput({
          name: obj.name,
          position: obj.position,
          firebaseKey: obj.firebaseKey,
          uid: obj.uid,
          image: obj.image,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
    setEditPlayers({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => {
        getRosters(user.uid).then(setPlayers);
        resetForm();
        history.push('/team');
      });
    } else {
      createPlayer(formInput).then(() => {
        getRosters(user.uid).then(setPlayers);
        resetForm();
        history.push('/team');
      });
    }
  };

  return (
    <div>
      <h1 className="page-headers">Add a Player</h1>
      <form onSubmit={handleSubmit} className="player-form">
        <input
          className="search-bar"
          name="name"
          id="name"
          placeholder="Enter Players Name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
        <input
          className="search-bar"
          image="image"
          type="url"
          placeholder="Enter Image URL"
          value={formInput.image}
          onChange={handleChangeImage}
          required
        />
        <select
          className="dropDown"
          category="category"
          value={formInput.position}
          id="category"
          onChange={handleChangePosition}
          required
        >
          <option value="">Position</option>
          <option value="Pitcher">Pitcher</option>
          <option value="Catcher">Catcher</option>
          <option value="In-Field">In-Field</option>
          <option value="Out-Field">Out-Field</option>
        </select>
        <button className="btn btn-success" type="submit">
          {obj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}

NewPlayer.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};

NewPlayer.defaultProps = { obj: {}, user: {} };
