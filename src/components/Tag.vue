<script setup lang="ts">
import { computed } from "vue";
import { tagLabels, type TagVariant } from "./tagVariants";

const props = defineProps<{
  variant: TagVariant;
}>();

const classes = computed(() => ["tag", `tag-variant-${props.variant}`]);
</script>

<template>
  <div :class="classes">
    <p class="tag-copy">{{ tagLabels[props.variant] }}</p>
  </div>
</template>

<style scoped lang="scss">
.tag {
  border-radius: var(--radius-md);
  padding: calc(var(--space-xxs) - var(--stroke-md)) calc(var(--space-sm) - var(--stroke-md));
  border: var(--stroke-md) solid transparent;

  &-copy {
    font-size: var(--font-size-xs);
    font-weight: 700;
  }

  &-variant {
    &-three {
      background-color: #ed9c55;
      color: #492708;
    }

    &-react {
      background-color: #61dafb;
      color: #0f2e36;
    }

    &-vue {
      background-color: #42b883;
      color: #0b2e1e;
    }

    &-websockets {
      background-color: #2674a4;
      color: white;
    }

    &-redis {
      background-color: #ce4036;
      color: white;
    }

    &-html {
      color: var(--color-text-400);
      border-color: var(--color-grayscale-400);
    }

    &-css {
      color: var(--color-text-400);
      border-color: var(--color-grayscale-400);
    }

    &-javascript {
      background-color: #ffdf4f;
      color: #362d03;
    }

    &-node {
      background-color: #237d23;
      color: white;
    }

    &-next {
      background-color: white;
      color: black;
    }

    &-kubernetes {
      background-color: #326ce5;
      color: white;
    }

    &-postgresql {
      background-color: #2f6c92;
      color: white;
    }

    &-ogl {
      background-color: #0e5495;
      color: white;
    }

    &-glsl {
      background-color: #95630e;
      color: white;
    }

    &-ai {
      background: linear-gradient(135deg, #7928ca, #ff0080);
      color: white;
    }

    &-mcp {
      background-color: #00d2ff;
      color: #003744;
    }

    &-rag {
      background-color: #9b51e0;
      color: white;
    }

    &-nestjs {
      background-color: #ea2845;
      color: white;
    }

    &-dotnet {
      background-color: #512bd4;
      color: white;
    }

    &-csharp {
      background-color: #68217a;
      color: white;
    }

    &-oracle {
      background-color: #f80000;
      color: white;
    }

    &-sqlserver {
      background-color: #cc292b;
      color: white;
    }

    &-iot {
      background-color: #00979d;
      color: white;
    }

    &-qdrant {
      background-color: #dc382d;
      color: white;
    }

    &-python {
      background-color: #3776ab;
      color: white;
    }

    &-security {
      background-color: #10b981;
      color: #022c1e;
    }

    &-erp {
      background-color: #f59e0b;
      color: #451a03;
    }
  }
}
</style>
