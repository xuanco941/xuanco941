<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";
import { locale } from "../../../i18n/store";
import { useRouter, withBase } from "../../../composables/useRouter";

const router = useRouter();
const contactElement = ref<HTMLElement | null>(null);
const copied = ref(false);

const copyEmail = () => {
  navigator.clipboard.writeText("xuanco941@gmail.com");
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2500);
};

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      
      <div class="contact-details">
        <a href="mailto:xuanco941@gmail.com" class="contact-email" data-cursor="circle-white" data-sound="click">
          xuanco941@gmail.com
        </a>
        <div class="contact-info-list">
          <span class="contact-badge">📞 0388530006</span>
          <span class="contact-badge">📍 {{ locale === 'en' ? 'Hanoi, Vietnam' : 'Hà Nội, Việt Nam' }}</span>
          <a href="https://duskai.vn" target="_blank" rel="noreferrer" class="contact-badge highlight">🚀 duskai.vn</a>
        </div>
      </div>

      <div class="contact-actions">
        <Social variant="background" />
        <a 
          :href="withBase('/cv')"
          @click.prevent="router.push('/cv')" 
          class="action-btn cv-btn" 
          data-cursor="circle-white" 
          data-sound="click"
          data-hoversound="hover"
        >
          📄 {{ t('view-cv') }}
        </a>
        <button 
          @click="copyEmail" 
          class="action-btn copy-btn" 
          data-cursor="circle-white" 
          data-sound="click"
          data-hoversound="hover"
        >
          {{ copied ? (locale === 'en' ? '✓ Copied' : '✓ Đã sao chép') : (locale === 'en' ? 'Copy Email' : 'Sao chép Email') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 7;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
    }
  }

  &-title {
    font-family: "Urbanist", sans-serif;
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &-email {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--color-text-400);
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    @include mixins.mq("md") {
      font-size: var(--font-size-xl);
    }
  }

  &-info-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: 4px;
  }

  &-badge {
    font-family: "ProFontWindows", monospace;
    font-size: var(--font-size-sm);
    padding: 5px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(56, 189, 248, 0.3);
    background-color: rgba(15, 28, 63, 0.7);
    backdrop-filter: blur(8px);
    text-decoration: none;
    color: #e2e8f0;

    &.highlight {
      background-color: rgba(244, 63, 94, 0.2);
      border-color: rgba(244, 63, 94, 0.5);
      color: #fda4af;
      font-weight: 700;
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }
}

.action-btn {
  font-family: "Space Grotesk", "ProFontWindows", monospace;
  font-size: var(--font-size-sm);
  padding: 8px 18px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cv-btn {
  background: linear-gradient(135deg, #ff8a00 0%, #ff6200 100%);
  color: #ffffff;
  border: 1px solid #ff7b00;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(255, 123, 0, 0.35);

  &:hover {
    background: #0284c7;
    border-color: #38bdf8;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
  }
}

.copy-btn {
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(15, 28, 63, 0.6);
  backdrop-filter: blur(8px);
  color: var(--color-text-400);

  &:hover {
    background-color: rgba(2, 132, 199, 0.25);
    border-color: var(--color-cyan-400);
    color: #ffffff;
  }
}
</style>
