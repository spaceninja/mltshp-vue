<template>
  <div>
    <h1>Shake List Page: {{ title }}</h1>
    <p>{{ shake && shake.description }}</p>
    <ShakePagination
      :shake-url="shake && shake.url"
      :shake-type="shake && shake.type"
      :next-key="isRoot ? null : page && page.first_key"
      :prev-key="page && page.last_key"
      :is-user="isUser"
    />
    <ShakeDetail v-bind="shake" :owner="user" />
    <ShakeList :shakes="user && user.shakes" />
    <PostList :posts="page && page.posts" />
    <h3>Page Info</h3>
    <pre>{{ JSON.stringify(page, undefined, 2) }}</pre>
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import ShakeList from '@/components/ShakeList';
import ShakeDetail from '@/components/ShakeDetail';
import ShakePagination from '@/components/ShakePagination';

export default {
  components: {
    PostList,
    ShakeList,
    ShakeDetail,
    ShakePagination,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
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
