<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { h, onMounted, ref } from 'vue';
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { RouterLink } from 'vue-router';

const getProjects = async ()  => {
  const { data } = await supabase.from('projects')
    .select()
  return data 
}

const projectsData = ref<Tables<'projects'>[] | null>(null)

onMounted(async () => {
  projectsData.value = await getProjects()
})

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({row}) => h(RouterLink, {to: `/projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name'))
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({row}) => h('div', {class: 'text-left font-medium'}, row.getValue('status'))
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({row}) => h('div', {class: 'text-left font-medium'}, JSON.stringify(row.getValue('collaborators')))
  },
]
</script>

<template>
  <DataTable v-if="projectsData" :columns="columns" :data="projectsData" />
</template>
