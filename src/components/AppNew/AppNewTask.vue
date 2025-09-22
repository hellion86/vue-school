<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewTask';
import { profilesQuery, projectsQuery } from '@/utils/supaQueries';

const sheetOpen = defineModel<boolean>()

type SelectOption = {
  label: string, 
  value: string | number
}

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[]
})

const gerProjectOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id
    })
  });
}
const gerProfileOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id
    })
  });
}

const getOptions = async () => {
  await Promise.all([gerProjectOptions(), gerProfileOptions()])
}
getOptions()

const createTask = async (formData: CreateNewTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formData))
    }, 2000);
  })
}

</script>
<template>
<Sheet v-model:open="sheetOpen">
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create new task</SheetTitle>
    </SheetHeader>
    <FormKit type="form" @submit="createTask" submit-label="Create task">
      <FormKit 
        label="Name" 
        placeholder="My new task!"
      />
      <FormKit 
        type="select"
        name="For"
        id="For"
        label="For"
        placeholder="Select a user"
        :options="selectOptions.profiles"
      /> 
      <FormKit 
        type="select"
        name="Project"
        id="Project"
        label="Project"
        placeholder="Select a project"
        :options="selectOptions.projects"
      /> 
      <FormKit 
        type="textarea"
        name="Description"
        id="Description"
        label="Description"
        placeholder="Task description"
      /> 
    </FormKit>
  </SheetContent>
</Sheet> 
</template>
<style lang="scss">
</style>
