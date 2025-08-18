<script setup lang="ts">
import { tasksWithProjectQuery, type TasksWithProjects } from '@/utils/supaQueries';
import { usePageStore } from '@/stores/page';
import { tasksColumns } from '@/utils/tableColumns/tasksColumns';

const Tasks = ref<TasksWithProjects | null>(null)

usePageStore().pageData.title = 'Tasks Page'

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectQuery

  if (error)  useErrorStore().setError({ error, customCode: status})

  Tasks.value = data
}

await getTasks()

</script>
<template>
  <DataTable v-if="Tasks" :columns="tasksColumns" :data="Tasks" />
</template>
