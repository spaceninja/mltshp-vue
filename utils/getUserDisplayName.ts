import { MltshpUser } from '~/types/MltshpUser';

const getUserDisplayName = (user: MltshpUser) =>
  user && user.shakes && user.shakes[0] ? user.shakes[0].name : user.name;

export default getUserDisplayName;
