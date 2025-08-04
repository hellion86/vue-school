import type { ColumnDef } from "@tanstack/vue-table"
import type { TasksWithProjects } from "../supaQueries"
import { RouterLink } from "vue-router"

export const tasksColumns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h(RouterLink, { to: `/tasks/${row.original.id}`, class: 'text-left font-medium hover:bg-muted block w-full' }, () => row.getValue('name'))
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('status')),
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('due_date')),
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project ID'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('project_id')),
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project link'),
    cell: ({ row }) => {
      return row.original.projects && h(RouterLink, { to: `/projects/${row.original.projects.slug}`, class: 'text-left font-medium' },
        () => row.original.projects?.name)
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators'))),
  },
]
