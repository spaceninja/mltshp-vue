export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await useStorage().setItem('test:message', body);
  return 'Data is set';
});
