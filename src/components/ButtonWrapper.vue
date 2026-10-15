<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  renderAs?: "button" | "a" | "div";
  variant?: "accent" | "border" | "theme" | "background" | "gray";
  rounded?: boolean;
}

const props = defineProps<Props>();

const classes = computed(() => [
  "button-wrapper",
  { [`button-wrapper-${props.variant}`]: props.variant !== undefined },
  { "button-wrapper-rounded": props.rounded },
]);
</script>

<template>
  <component :is="props.renderAs ?? 'button'" :class="classes">
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
.button-wrapper {
  border: none;
  border-radius: 100px;
  letter-spacing: 0.02em;
  font-size: var(--font-size-md);
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  background-color: transparent;
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;

  &-rounded {
    border-radius: 50%;
    aspect-ratio: 1;
  }

  &-accent {
    background: linear-gradient(135deg, #ff8a00 0%, #ff6200 100%);
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);
    box-shadow: 0 4px 14px rgba(255, 123, 0, 0.3);

    @include mixins.hover {
      &:hover {
        background: #0284c7;
        color: var(--color-white-400);
        --icon-color: var(--color-white-400);
        box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
      }
    }
  }

  &-theme {
    background-color: rgba(22, 38, 77, 0.8);
    border: 1px solid rgba(56, 189, 248, 0.25);
    color: var(--color-text-400);
    --icon-color: var(--color-text-400);

    @include mixins.hover {
      &:hover {
        background-color: var(--color-cyan-500);
        color: var(--color-white-400);
        --icon-color: var(--color-white-400);
      }
    }
  }

  &-background {
    background-color: rgba(15, 28, 63, 0.8);
    border: 1px solid rgba(56, 189, 248, 0.25);
    color: var(--color-text-400);
    --icon-color: var(--color-text-400);

    @include mixins.hover {
      &:hover {
        background-color: var(--color-cyan-500);
        color: var(--color-white-400);
        --icon-color: var(--color-white-400);
      }
    }
  }

  &-gray {
    background-color: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);

    @include mixins.hover {
      &:hover {
        background-color: #334155;
      }
    }
  }

  &-border {
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    background-color: rgba(15, 28, 63, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--color-text-400);
    --icon-color: var(--color-text-400);

    @include mixins.hover {
      &:hover {
        background-color: rgba(2, 132, 199, 0.2);
        color: var(--color-white-400);
        --icon-color: var(--color-white-400);
        border-color: var(--color-cyan-400);
      }
    }
  }
}
</style>
