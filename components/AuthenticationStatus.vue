<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth();
</script>

<template>
  <div>
    <div>
      <h1 v-if="status === 'authenticated'">
        <img
          v-if="status === 'authenticated' && data?.user?.image"
          :src="data.user.image"
          alt="User Avatar"
          width="32"
          height="32"
        />
        Authenticated as {{ data?.user?.fullName || data?.user?.name }}!
      </h1>
      <h1 v-else>Not logged in</h1>
    </div>
    <button
      v-if="status === 'authenticated'"
      @click="signOut({ callbackUrl: '/' })"
    >
      <span>Logout</span>
    </button>
    <button v-else @click="signIn()">
      <span>Login</span>
    </button>
    <hr />
  </div>
</template>
