<script setup lang="ts">

defineProps<{
  message: string,
  customCode: number,
  code: string,
  hint: string | null,
  statusCode: number,
  details: string
}>()
</script>
<template>
 <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customCode || code }}</h1>
    <p v-if="statusCode" class="error__code">Status code: {{ statusCode }}</p>
    <p class="error__msg">{{ message }}</p>
    <p v-if="hint">{{ hint }}</p>
    <p v-if="details">{{ details }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
	</div>
</template>
