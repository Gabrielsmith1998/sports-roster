import React from 'react';
import { useHistory } from 'react-router-dom';
import { signOutUser } from '../auth';

export default function Navagation() {
  const history = useHistory();

  return (
    <div className="routes">
      <button className="btn btn-light" type="button" onClick={() => history.push('/team')}>
        View Team
      </button>
      <button className="btn btn-info" type="button" onClick={() => history.push('/new')}>
        Add Player
      </button>
      <button className="btn btn-danger" type="button" onClick={signOutUser}>
        Log Out
      </button>
    </div>
  );
}
