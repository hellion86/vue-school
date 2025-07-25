<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { onMounted, ref } from 'vue';
import type { Tables } from '../../../database/types'

const getProjects = async ()  => {
  const { data } = await supabase.from('projects')
    .select()

  return data 

}

const projectsData = ref<Tables<'projects'>[] | null>(null)

onMounted(async () => {
  projectsData.value = await getProjects()
})

</script>

<template>
  <div class="">
    <h1>Project page</h1>
    <RouterLink to="/">go back</RouterLink>
     <table>
      <tr v-for="project in projectsData" :key="project.id">
        <td>{{ project.id}}</td>
        <td>{{ project.name }}</td>
        <td>{{ project.status }}</td>
        <td>{{ project.created_at }}</td>
      </tr>
    </table>
  </div>
</template>
