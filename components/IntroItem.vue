<template>
  <li class="flex items-center gap-2">
    <Icon
      size="1.2rem"
      :color="iconColor"
      :name="iconName"
      class="min-h-fit min-w-fit opacity-80"
    />
    <span><slot /></span>
  </li>
</template>

<script setup lang="ts">
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: 'black',
  },
})
</script>
