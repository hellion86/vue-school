<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { projectsColumns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Project Page'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = projectsColumns(groupedCollabs)
console.log(projects.value)
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
