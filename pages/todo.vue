<template>
  <div>
    <select v-model="userSelect">
      <option :value="null" selected>None</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <UserCard
      v-if="selectedData"
      :user="selectedData"
      :todos="selectedData.todos"
      @remove-todo="removeTodo"
    />
  </div>
</template>

<script setup lang="ts">
// useRepo accesses the combined database
import { useRepo } from 'pinia-orm';
// load the models
import User from '~/models/User';
import Todo from '~/models/Todo';
// load the placeholder data
import data from '~/data';

// create the repos for each model
const userRepo = useRepo(User);
const todoRepo = useRepo(Todo);

// hook into the value of the select
const userSelect = ref(null);

// populate the database
userRepo.save(data.users);

// get all the users with their todos as relation
const users = computed(() => userRepo.with('todos').get());

// get the selected user's data
const selectedData = computed(() =>
  users.value.find((user) => user.id === userSelect.value)
);

// remove a todo
const removeTodo = (id) => {
  todoRepo.destroy(id);
};
</script>
