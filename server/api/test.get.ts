export default defineEventHandler(async (event) => {
  const data = await useStorage().getItem('test:message');
  return data;
});
