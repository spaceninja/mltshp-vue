import { shallowMount } from '@vue/test-utils';
import AppAlert from '@/components/AppAlert.vue';

// suppress this component's console logging
console.log = jest.fn();

describe('AppAlert', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(AppAlert, {
      propsData: { error: 'Error' },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('can accept an error string', () => {
    expect(AppAlert.computed.message.call({ error: 'Error from String' })).toBe(
      'Error from String'
    );
  });

  test('can accept an error object', () => {
    expect(
      AppAlert.computed.message.call({ error: new Error('Error from Object') })
    ).toBe('Error from Object');
  });

  test('shows generic error if type is not string or object', () => {
    expect(AppAlert.computed.message.call({ error: 404 })).toBe(
      'Something went wrong!'
    );
  });
});
