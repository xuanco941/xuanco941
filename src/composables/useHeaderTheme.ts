import { ref, watch } from "vue";
import { lenis } from "./useScroll";
import { sizes } from "../utils/sizes";

export const useHeaderTheme = ({
  onUpdate,
}: {
  onUpdate?: (element: HTMLElement | null, boundingClientRect: DOMRect | null, hasScrolledIntoView: boolean) => void;
} = {}) => {
  let aboutElement: HTMLElement | null = null;
  const isDarkTheme = ref(false);
  const hasScrolledIntoView = ref(false);

  const handleScroll = () => {
    if (!aboutElement) {
      aboutElement = typeof window !== "undefined" ? document.querySelector("#about") : null;
    }

    if (aboutElement) {
      const aboutBounding = aboutElement.getBoundingClientRect();
      const isLandscape = sizes.isLandscape;
      const isScrolledIntoView = aboutBounding.top - (isLandscape ? sizes.height * 0.225 : 0) < 0;
      const isScrolledPast = aboutBounding.bottom - 36 < 0;

      hasScrolledIntoView.value = isScrolledIntoView;
      isDarkTheme.value = isScrolledIntoView && !isScrolledPast;

      if (typeof onUpdate === "function") {
        onUpdate(aboutElement, aboutBounding, isScrolledIntoView);
      }
    }
  };

  watch(
    lenis,
    (instance, _previous, onCleanup) => {
      if (!instance) return;
      instance.on("scroll", handleScroll);
      onCleanup(() => instance.off("scroll", handleScroll));
    },
    { immediate: true },
  );

  return {
    isDarkTheme,
    hasScrolledIntoView,
  };
};
