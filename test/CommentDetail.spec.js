import { shallowMount } from '@vue/test-utils';
import CommentDetail from '@/components/CommentDetail.vue';

const atUser = 'test';
const body = 'this is the message';
const postedAt = '2020-03-11';
const userWithAvatar = {
  name: 'Bob Dobbs',
  profileImageUrl: 'http://example.com/avatar.jpg',
};
const userNoAvatar = {
  name: 'Bob Dobbs',
  profileImageUrl: '',
};

const factory = (username, user = userWithAvatar) =>
  shallowMount(CommentDetail, {
    stubs: ['nuxt-link'],
    mocks: {
      $md: {
        render(string) {
          return string;
        },
      },
    },
    propsData: {
      body: `${username ? `@${username} ` : ''}${body}`,
      postedAt,
      user,
    },
  });

describe('CommentDetail', () => {
  test('comment details are rendered', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain(body);
    expect(wrapper.text()).toContain(postedAt);
    expect(wrapper.text()).toContain(userWithAvatar.name);
    expect(wrapper.contains('img')).toBe(true);
  });
  test('username in comments are linked', () => {
    expect(
      CommentDetail.computed.bodyWithUsernames.call({
        body: `@${atUser} ${body}`,
      })
    ).toContain(`[@${atUser}](/user/${atUser})`);
  });
  test('no image if the user does not have one', () => {
    const wrapper = factory('', userNoAvatar);
    expect(wrapper.contains('img')).toBe(false);
  });
});
