<template>
  <li class="flex items-center gap-2">
    <Icon
      size="1.2rem"
      :name="iconName"
      class="opacity-80 flex-shrink-0"
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
    required: false,
    default: 'black',
  },
})
</script>

<style scoped>
.icon {
  color: v-bind(iconColor);
}
</style>
