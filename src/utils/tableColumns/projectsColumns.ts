import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '../supaQueries'
import { RouterLink } from 'vue-router'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppPlaceEditStatus.vue'

export const projectsColumns = (collabs: Ref<GroupedCollabs>): ColumnDef<Projects[0]>[] => {
  return [
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name'),
      cell: ({ row }) =>
        h(
          RouterLink,
          {
            to: `/projects/${row.original.slug}`,
            class: 'text-left font-medium hover:bg-muted block w-full'
          },
          () => row.getValue('name')
        )
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status'),
      cell: ({ row }) => h('div', { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, { modelValue: row.original.status, readonly: true })
      )
    },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators'),
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-left font-medium h-20 flex items-center' },
          collabs.value[row.original.id]
            ? collabs.value[row.original.id].map((collab) => {
              return h(RouterLink, { to: `/user/${collab.username}` }, () => {
                return h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
                  h(AvatarImage, { src: collab.avatar_url || '' })
                )
              })
            })
            : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            })
        )
      }
    }
  ]
}
