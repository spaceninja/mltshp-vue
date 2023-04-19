import { getToken } from '#auth';

export default eventHandler(async (event) => {
  const token = await getToken({ event });
  console.log('API TOKEN', token);
  return token || 'no token present';
});
