import {servername} from './config/constants';

export const getGroups = () => {
  console.log('hmmm');
  return [
    'Smartcar',
    'Shell',
    'Hello',
    'Here Maps',
    'hi',
    'bye',
    'woohoo',
    'meh',
    'cat',
    'dog',
  ];
};

export const getUserGroup = () => {
  return 'My Group returned here';
};

export const setGroup = (groupName) => {
  return 'this will work lol' + groupName;
};

export const startSmartcarAuth = async (groupName, password) => {
  fetch('https://mywebsite.com/endpoint/', {
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
    return res.json().then((final) => {
      return final.url;
    });
  });
  console.log(await res.json());
  return res.json();
};
