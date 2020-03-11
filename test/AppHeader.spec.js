import { shallowMount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';
import UserMenu from '@/components/UserMenu.vue';

const factory = loggedIn =>
  shallowMount(AppHeader, {
    stubs: ['nuxt-link'],
    mocks: {
      $auth: {
        loggedIn,
        user: {
          id: 1,
          name: 'test',
          shakes: [
            {
              name: 'User Shake',
              url: '/user/test',
              type: 'user',
              id: 1,
            },
            {
              name: 'Group Shake 1',
              url: '/shake/group-shake-1',
              type: 'group',
              id: 2,
            },
            {
              name: 'Group Shake 2',
              url: '/shake/group-shake-2',
              type: 'group',
              id: 3,
            },
          ],
        },
      },
      $route: { path: '/before/1' },
    },
  });

describe('AppHeader', () => {
  test('no navigation & user when logged out', () => {
    const wrapper = factory(false);
    expect(wrapper.contains('nav')).toBe(false);
    expect(wrapper.find(UserMenu).exists()).toBe(false);
  });

  test('show navigation & user when logged in', () => {
    const wrapper = factory(true);
    expect(wrapper.find(UserMenu).exists()).toBe(true);
  });

  test('user shake is not duplicated in navigation', () => {
    const wrapper = factory(true);
    expect(wrapper.findAll('[to = "/user/test"]').length).toBe(1);
  });

  test('paginated routes get `is-active` class', () => {
    const wrapper = factory(true);
    expect(
      wrapper
        .find('nav')
        .find('[to = "/"]')
        .classes()
    ).toContain('is-active');
  });
});
