import { projectsQuery } from '@/utils/supaQueries'

import type { Projects } from "@/utils/supaQueries"
import { useMemoize } from '@vueuse/core'


export const useProjectsStore = defineStore('projects-store', () => {
  const projectsData = ref<Projects>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const validateCache = () => {
    if (projectsData.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(projectsData.value) === JSON.stringify(data)) {
          return
        }
        else {
          loadProjects.delete('projects')
          if (!error && data) projectsData.value = data
        }
      })
    }

  }
  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) projectsData.value = data

    validateCache()
  }

  return {
    getProjects,
    projectsData
  }
})
