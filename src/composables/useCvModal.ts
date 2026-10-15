import { ref } from "vue";

export const isCvModalOpen = ref(false);

export const openCvModal = () => {
  isCvModalOpen.value = true;
};

export const closeCvModal = () => {
  isCvModalOpen.value = false;
};
