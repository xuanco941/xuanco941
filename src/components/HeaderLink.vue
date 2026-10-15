<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
  isDarkTheme?: boolean;
}>();
</script>

<template>
  <button
    class="header-link"
    data-cursor="circle-white"
    :class="{ 'header-link-active': props.isActive, 'header-link-dark': props.isDarkTheme }"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.header-link {
  font-family: "Space Grotesk", "Plus Jakarta Sans", sans-serif;
  letter-spacing: 0.05em;
  font-weight: 700;
  border: none;
  background: none;
  transition: color 0.15s ease-in-out;
  font-size: 13.5px;
  width: 128px;
  white-space: nowrap;
  text-transform: uppercase;
  z-index: 2;
  border-radius: 100px;
  padding: 8px 0;
  color: #e2e8f0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition:
      background-color 0.15s ease-in-out,
      opacity 0.15s ease-in-out;
    background-color: rgba(56, 189, 248, 0.2);
    border-radius: 100px;
    z-index: -1;
    opacity: 0;
  }

  &-dark {
    &::after {
      background-color: var(--color-dark-blue-600);
    }
  }

  &-active {
    &::after {
      opacity: 0 !important;
    }
  }

  @include mixins.hover {
    &:hover {
      color: var(--color-white-400);

      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
