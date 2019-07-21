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
  console.log('getUserPoints');
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
          console.log(final.Points);
          return final.Points[0];
        });
      }
    );
  });
};

export const redeemPoints = async (user_name, vendor) => {
  return fetch(servername + '/useUserPoints', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: user_name,
    }),
  })
    .then((res) => {
      console.log(res);
      return res.json().then((final) => {
        console.log(final);
        return final.Points[0];
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getUserGroup = async () => {
  return Storage.getItem('user_name').then((user_name) => {
    if (user_name == null) {
      return null;
    }
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

export const getUsersInGroup = async (group_name) => {
  return fetch(servername + '/getUsersInGroup?group_name=' + group_name).then(
    (user_list) => {
      return user_list.json().then((final) => {
        console.log(final.Users);
        return final.Users;
      });
    }
  );
};

export const checkGroupStatus = async ({coords}, user_name) => {
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

export const endTrip = async ({coords}, user_name) => {
  return fetch(servername + '/Squidward', {
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
    if (res.status == 200) {
      console.log(res);
      Storage.setItem('user_name', user_name);
      return true;
    } else {
      return false;
    }
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
