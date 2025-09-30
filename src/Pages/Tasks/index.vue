<script setup lang="ts">
  import { usePageStore } from '@/stores/page'
  import { tasksColumns } from '@/utils/tableColumns/tasksColumns'

  usePageStore().pageData.title = 'Tasks Page'
  const tasksLoader = useTasksStore()
  const { tasksWithProjects } = storeToRefs(tasksLoader)
  const { getTasksWithProjects } = tasksLoader
  await getTasksWithProjects()

  const { getGroupedCollabs, groupedCollabs } = useCollabs()

  getGroupedCollabs(tasksWithProjects.value ?? [])

  const columnsWithCollabs = tasksColumns(groupedCollabs)

  useHead({
    title: 'Pulse | Tasks'
  })
</script>
<template>
  <DataTable
    v-if="tasksWithProjects"
    :columns="columnsWithCollabs"
    :data="tasksWithProjects" />
</template>
