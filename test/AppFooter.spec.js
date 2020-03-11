import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/AppFooter.vue';

const factory = loggedIn =>
  shallowMount(AppFooter, {
    stubs: ['nuxt-link'],
    mocks: { $auth: { loggedIn } },
  });

describe('AppFooter', () => {
  test('show navigation when logged in', () => {
    const wrapper = factory(true);
    expect(wrapper.contains('nav')).toBe(true);
  });

  test('no navigation when logged out', () => {
    const wrapper = factory(false);
    expect(wrapper.contains('nav')).toBe(false);
  });
});
