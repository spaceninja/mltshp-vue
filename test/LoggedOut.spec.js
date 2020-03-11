import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import LoggedOut from '@/components/LoggedOut.vue';

describe('LoggedOut', () => {
  test('calls $auth.loginWith when login button is clicked', async () => {
    const loginWith = sinon.stub();
    const wrapper = shallowMount(LoggedOut, {
      mocks: { $auth: { loginWith } },
    });
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(loginWith.called).toBe(true);
  });
});
