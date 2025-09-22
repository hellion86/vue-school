import { tasksWithProjectQuery, taskQuery, updateTaskQuery, deleteTaskQuery } from '@/utils/supaQueries'

import type { TasksWithProjects, Task } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasksWithProjects = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasksWithProjects = useMemoize(async (key: number) => await tasksWithProjectQuery)
  const loadTask = useMemoize(async (id: number) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof task | typeof tasksWithProjects
    query: typeof taskQuery | typeof tasksWithProjectQuery
    key: number
    loaderFn: typeof loadTask | typeof loadTasksWithProjects
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams): void => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(tasksWithProjects.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getTasksWithProjects = async () => {
    tasksWithProjects.value = null

    const { data, error, status } = await loadTasksWithProjects(0)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) tasksWithProjects.value = data

    validateCache({ ref: tasksWithProjects, query: tasksWithProjectQuery, key: 0, loaderFn: loadTasksWithProjects })
  }

  const getTask = async (id: number) => {
    task.value = null

    const { data, error, status } = await loadTask(id)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) task.value = data

    validateCache({ ref: task, query: taskQuery, key: id, loaderFn: loadTask })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, task.value.id)
  }

  const deleteTask = async () => {
    if (!task.value) return

    await deleteTaskQuery(task.value.id)
  }

  return {
    tasksWithProjects,
    task,
    getTasksWithProjects,
    getTask,
    updateTask,
    deleteTask,
  }
})
