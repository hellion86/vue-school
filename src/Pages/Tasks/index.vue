<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { onMounted, ref } from 'vue';
import type { Tables } from '../../../database/types'

const getTasks = async ()  => {
  const { data } = await supabase.from('tasks')
    .select()

  return data 

}

const Tasks = ref<Tables<'tasks'>[] | null>(null)

onMounted(async () => {
  Tasks.value = await getTasks()
})

</script>

<template>
  <div class="">
    <h1>Tasks page</h1>
    <RouterLink to="/">go back</RouterLink>
     <table>
      <tr v-for="task in Tasks" :key="task.id">
        <td>{{ task.id}}</td>
        <td>{{ task.description }}</td>
        <td>{{ task.status }}</td>
        <td>{{ task.name }}</td>
        <td>{{ task.project_id }}</td>
      </tr>
    </table>
  </div>
</template>
