import {servername} from './config/constants';
import Storage from './Storage';

export const getGroups = async () => {
  return fetch(servername + '/getGroupNames').then((groupNames) => {
    return groupNames.json().then((final) => {
      console.log(final.GroupNames);
      return final.GroupNames;
    });
  });
};

export const getUserPoints = async () => {
  return Storage.getItem('user_name').then((user_name) => {
    if (user_name == null) {
      console.log(user_name);
      return null;
    }
    console.log('USER NAME');
    console.log(user_name);
    return fetch(servername + '/getUserPoints?user_name=' + user_name).then(
      (user_points) => {
        return user_points.json().then((final) => {
          console.log(final.UserPoints);
          return final.UserPoints;
        });
      }
    );
  });
};

export const getUserGroup = async () => {
  return Storage.getItem('user_name').then((user_name) => {
    if (user_name == null) {
      console.log(user_name);
      return null;
    }
    console.log('USER NAME');
    console.log(user_name);
    return fetch(servername + '/getUserGroup?user_name=' + user_name).then(
      (group_name) => {
        return group_name.json().then((final) => {
          console.log(final.Group[0]);
          return final.Group[0];
        });
      }
    );
  });
};

export const checkGroupStatus = async ({coords}, user_name) => {
  console.log(user_name);
  console.log(coords);
  return fetch(servername + '/Spongebob', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: user_name,
      user_lat: coords.latitude,
      user_lon: coords.longitude,
    }),
  })
    .then((res) => {
      console.log(res);
      return res.json().then((final) => {
        console.log(final);
        return final;
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const joinGroup = async (user_name, groupName, password) => {
  console.log(user_name, groupName, password);
  return fetch(servername + '/joinGroup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: user_name,
      group_name: groupName,
      group_pass: password,
    }),
  }).then((res) => {
    console.log(res);
    Storage.setItem('user_name', user_name);
    return true;
  });
};

export const startSmartcarAuth = async (groupName, password) => {
  return fetch(servername + '/createGroup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      group_name: groupName,
      group_password: password,
    }),
  }).then((res) => {
    console.log(res);
    return res.json().then((final) => {
      return final.url;
    });
  });
};
