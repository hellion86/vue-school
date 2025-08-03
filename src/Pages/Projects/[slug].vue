<script setup lang="ts">
const router = useRouter()

</script>

<template>
  <div class="">
    <h1>Project</h1>
    <p>
      {{ router.currentRoute.value.params?.slug }}
    </p>
    <RouterLink to="/projects">go back to projects</RouterLink>
  </div>
</template>
