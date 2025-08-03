<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';

import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';
import { usePageStore } from '@/stores/page';

const getTasks = async ()  => {
  const { data } = await supabase.from('tasks')
    .select()
  return data 
}

usePageStore().pageData.title = 'Tasks Page'

const Tasks = ref<Tables<'tasks'>[] | null>(null)

Tasks.value = await getTasks()

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({row}) => h(RouterLink, {to: `/tasks/${row.original.id}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name'))
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
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators'))),
  },
]

</script>

<template>
  <DataTable v-if="Tasks" :columns="columns" :data="Tasks" />
</template>
