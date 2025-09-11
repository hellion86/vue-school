<script setup lang="ts">
import { usePageStore } from '@/stores/page';
import { projectsColumns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = 'Project Page'

const projectsLoader = useProjectsStore()
const { getProjects } = projectsLoader
const { projectsData } = storeToRefs(projectsLoader)

await getProjects()

</script>

<template>
  <DataTable v-if="projectsData" :columns="projectsColumns" :data="projectsData" />
</template>
