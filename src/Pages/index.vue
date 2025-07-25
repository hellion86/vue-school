<script setup lang="ts">
// import { supabase } from '@/lib/supabaseClient';
// import { onMounted } from 'vue';


// const getProjects = async () => {
//   const { data, error } = await supabase
//   .from('projects')
//     .select()

//   console.log(data);

// }

// onMounted(() => {
//   getProjects()
// })
</script>

<template>
  <div class="">
    <h1>Home page</h1>
    <RouterLink :to="{ name: '/Projects/[id]', params: { 'id': 12 } }">go to Project 12</RouterLink>
    <RouterLink :to="{ name: '/Projects/' }">go to Projects</RouterLink>
    <RouterLink :to="{ name: '/Tasks/' }">go to Tasks</RouterLink>
  </div>
</template>




