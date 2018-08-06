import * as humps from 'humps';

const parseError = message => {
  return message.reduce((acc, err) => {
    return { ...acc, [humps.camelize(err.key)]: err.message };
  }, {});
};

export default parseError;
