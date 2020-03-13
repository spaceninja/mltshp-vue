import { shallowMount } from '@vue/test-utils';
import CommentList from '@/components/CommentList.vue';

const commentsArray = [
  { id: 1, body: 'alpha', postedAt: '2020-03-13', user: { id: 1 } },
  { id: 2, body: 'gamma', postedAt: '2020-03-13', user: { id: 2 } },
  { id: 3, body: 'delta', postedAt: '2020-03-13', user: { id: 3 } },
];

const factory = (comments = commentsArray) =>
  shallowMount(CommentList, {
    propsData: {
      comments,
      shareKey: 'test',
    },
  });

describe('CommentList', () => {
  test('comments are rendered in a list', () => {
    const wrapper = factory();
    expect(wrapper.findAll('commentdetail-stub').length).toBe(3);
  });

  test('no list if no comments', () => {
    const wrapper = factory([]);
    expect(wrapper.contains('ol')).toBe(false);
  });

  test('handle reply-to event from CommentDetail', async () => {
    const wrapper = factory();
    wrapper.find('commentdetail-stub').vm.$emit('reply-to', 'Bob Dobbs');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.replyTo).toBe('Bob Dobbs');
  });
});
