import type { GroupedCollabs } from "@/types/GroupedCollabs"
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from "@/utils/supaQueries"

export const useCollabs = () => {

  const groupedCollabs = ref<GroupedCollabs>({})
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filterdItems = items.filter((item) => item.collaborators.length)

    const promises = filterdItems.map((item) => getProfilesByIds(item.collaborators))

    const result = await Promise.all(promises)

    filterdItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = result[index]
    })

  }
  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs,
  }
}
