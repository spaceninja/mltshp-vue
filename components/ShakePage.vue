<template>
  <div>
    <ShakeDetail v-bind="shake" :owner="user" />
    <hr />
    <PostList :posts="page && page.posts" />
    <hr />
    <ShakePagination
      :shake-url="shake && shake.url"
      :shake-type="shake && shake.type"
      :next-key="isRoot ? null : page && page.first_key"
      :prev-key="page && page.last_key"
      :is-user="isUser"
      :page-count="page && page.posts.length"
    />
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import ShakeDetail from '@/components/ShakeDetail';
import ShakePagination from '@/components/ShakePagination';

export default {
  components: {
    PostList,
    ShakeDetail,
    ShakePagination,
  },
  props: {
    shake: {
      type: Object,
      default: null,
    },
    page: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
