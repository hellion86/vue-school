<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { projectsColumns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Project Page'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()


await getGroupedCollabs(projects.value)
console.log(groupedCollabs)
</script>

<template>
  <DataTable v-if="projects" :columns="projectsColumns" :data="projects" />
</template>
