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
