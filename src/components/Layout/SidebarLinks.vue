<script setup lang="ts">
  import { menuKey, type MenuInjectionOptions } from '@/utils/injectionKeys'

  const { menuOpen } = inject(menuKey) as MenuInjectionOptions

  interface LinkProp {
    title: string
    icon: string
    to?: string
  }

  defineProps<{
    links: LinkProp[]
  }>()

  const emit = defineEmits<{
    actionClicked: [string]
  }>()

  const emitActionClicked = (lintTitle: string) => {
    emit('actionClicked', lintTitle)
  }
</script>
<template>
  <template
    v-for="link in links"
    :key="link.title">
    <RouterLink
      exactActiveClass="text-primary bg-muted"
      v-if="link.to"
      :to="link.to"
      class="nav-link"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="text-nowrap"
        :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </RouterLink>
    <div
      v-else
      class="nav-link cursor-pointer"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="emitActionClicked(link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="text-nowrap"
        :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </div>
  </template>
</template>

<style scoped>
  .nav-link {
    @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
  }
</style>
