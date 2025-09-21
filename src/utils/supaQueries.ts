import { supabase } from "@/lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";

// TASKS
export type TasksWithProjects = QueryData<typeof tasksWithProjectQuery>
export type Task = QueryData<ReturnType<typeof taskQuery>>

export const tasksWithProjectQuery = supabase.from('tasks').select(`
    *,
    projects ( 
      id,
      name,
      slug
    )
  `)

export const updateTaskQuery = (updateTask = {}, id: number) => {
  return supabase.from('tasks').update(updateTask).eq('id', id)
}

export const taskQuery = (id: number) => supabase.from('tasks').select(`
  *,
  projects (
    id,
    name,
    slug
  )
`).eq('id', id).single()


// PROJECTS
export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) => supabase.from('projects').select(`
  *,
  tasks (
    id,
    name,
    status,
    due_date
  )  
`).eq('slug', slug).single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const updateProjectQuery = (updateProject = {}, id: number) => {
  return supabase.from('projects').update(updateProject).eq('id', id)
}
export const updateProjectSlugQuery = (updateProject = {}, slug: string) => {
  return supabase.from('projects').update(updateProject).eq('slug', slug)
}

// PROFILE

export const profileQuery = ({ column, value }: { column: string, value: string }) => {
  return supabase.from("profiles").select().eq(column, value).single()
}

export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase.from('profiles')
    .select('username, avatar_url, id, full_name')
    .in('id', userIds)
}

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
