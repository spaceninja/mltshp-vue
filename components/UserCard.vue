<template>
  <div>
    <h4>
      <img :src="user.avatarImgUrl" :alt="user.name" width="32" height="32" />
      {{ user.firstName }}
      {{ user.lastName }}
    </h4>
    <ul v-if="user.todos">
      <li v-for="todo in user.todos" :key="todo.id">
        <span>{{ todo.title }}</span>
        <button @click="removeTodo(todo.id)">x</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  user: { type: Object, required: true },
  todos: { type: Array, default: null },
});

const emit = defineEmits(['remove-todo']);

const removeTodo = (id) => {
  emit('remove-todo', id);
};
</script>
