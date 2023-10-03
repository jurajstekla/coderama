export const apiData = () => {
  //eslint-disable-next-line
  return process.env.NODE_ENV === 'production' ? '.' : 'http://localhost:8080/dms';
};

export const responseStatus = {
  400: { description: 'badCredentials' }
};
