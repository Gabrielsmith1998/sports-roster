import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseUrl = firebaseConfig.databaseURL;

const getRosters = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Roster.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (obj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/Roster.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseUrl}/Roster/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getRosters(uid).then(resolve);
        });
    })
    .catch(reject);
});

const deletePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseUrl}/Roster/${firebaseKey}.json`)
    .then(() => {
      getRosters(uid).then(resolve);
    })
    .catch(reject);
});

const updatePlayer = (obj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/Roster/${obj.firebaseKey}.json`, obj).then(() => {
    getRosters(uid).then(resolve);
  }).catch(reject);
});

export {
  getRosters,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
