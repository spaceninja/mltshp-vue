import { MltshpShake } from '~/types/MltshpShake';

const getShakePath = (shake: MltshpShake) => {
  if (shake.type === 'magic') return shake.url;
  const shakeUrl = new URL(shake.url);
  const shakePath = shakeUrl.pathname;
  if (shake.type === 'user') return shakePath;
  return `/shake${shakePath}`;
};

export default getShakePath;
