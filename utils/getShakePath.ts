import { MltshpShake } from '~/types/MltshpShake';

/**
 * Get Shake Path
 * Given a shake object, will take the URL and break it down to the path
 * that this system expects: /user/name, /shake/name, and some special
 * system shakes that provide their own paths.
 */
const getShakePath = (shake: MltshpShake) => {
  if (shake.type === 'system') return shake.url;
  const shakeUrl = new URL(shake.url);
  const shakePath = shakeUrl.pathname;
  if (shake.type === 'user') return shakePath;
  return `/shake${shakePath}`;
};

export default getShakePath;
