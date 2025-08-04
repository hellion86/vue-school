<script setup lang="ts">
import { usePageStore } from '@/stores/page';
import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { projectsColumns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = 'Project Page'
const projectsData = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) {
    console.log(error)
  }
  
  projectsData.value = data

}

await getProjects()

</script>

<template>
  <DataTable v-if="projectsData" :columns="projectsColumns" :data="projectsData" />
</template>
