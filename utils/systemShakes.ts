/**
 * Details for special shakes defined by the system
 */
const systemShakes = {
  likes: {
    id: 0,
    url: '/likes',
    name: 'Your Favorites',
    description: 'A list of the most recent posts you liked.',
    type: 'system',
  },
  friends: {
    id: 0,
    url: '',
    name: 'Friends',
    description: 'A list of the most recent posts by users you follow.',
    type: 'system',
  },
  popular: {
    id: 0,
    url: '/popular',
    name: 'Popular',
    description: 'A list of the most recent posts with 10 or more likes.',
    thumbnail_url:
      'https://mltshp-production.s3.amazonaws.com/account/2290/profile.jpg',
    type: 'system',
  },
  incoming: {
    id: 0,
    url: '/incoming',
    name: 'Incoming!',
    description: 'A list of the most recent posts.',
    thumbnail_url: 'https://mltshp-cdn.com/static/images/incoming-header.svg',
    type: 'system',
  },
};

export default systemShakes;
