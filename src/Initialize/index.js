import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getRosters } from '../api/data/sportsRosterData';
import SignIn from '../views/SignIn';
import Navagation from '../api/components/Navagation';
import Routes from '../routes';

function Initialize() {
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
        };
        setUser(userInfoObj);
        getRosters(authed.uid).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <Container>
        {user ? (
          <>
            <Navagation />
            <Routes
              user={user}
              players={players}
              setPlayers={setPlayers}
            />
          </>
        ) : (
          <SignIn user={user} />
        )}
      </Container>
    </>
  );
}

export default Initialize;
