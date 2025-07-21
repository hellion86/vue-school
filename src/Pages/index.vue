<script setup lang="ts">

</script>

<template>
  <div class="">
    <h1>Home page</h1>
    <RouterLink :to="{ name: '/Projects/[id]', params: { 'id': 12 } }">go to Project 12</RouterLink>
  </div>
</template>
