import { ref, watch, onMounted } from "vue";
import { resources } from "../utils/resources";
import { isThreeReady } from "../three";
import { cvVisible } from "./useRouteObserver";
import gsap from "gsap";

export const preloaderVisible = ref(true);

export const usePreloader = () => {
  const displayProgress = ref(0);
  let isFinished = false;

  const updateUI = (val: number) => {
    const percent = Math.min(100, Math.max(0, Math.round(val * 100)));
    const rect = document.querySelector(".preloader-rect") as HTMLElement | null;
    const bar = document.querySelector(".preloader-bar-fill") as HTMLElement | null;
    const percentText = document.querySelector(".preloader-percent") as HTMLElement | null;
    const statusText = document.querySelector(".preloader-status") as HTMLElement | null;

    if (rect) rect.style.transform = `scaleY(${val})`;
    if (bar) bar.style.width = `${percent}%`;
    if (percentText) percentText.textContent = `${percent}%`;

    if (statusText) {
      if (percent < 25) {
        statusText.textContent = "Khởi tạo hệ thống...";
      } else if (percent < 75) {
        statusText.textContent = "Đang tải mô hình & không gian 3D...";
      } else if (percent < 98) {
        statusText.textContent = "Biên dịch WebGL Shaders...";
      } else {
        statusText.textContent = "Sẵn sàng trải nghiệm!";
      }
    }
  };

  const tweenTo = (target: number, duration: number = 0.3) => {
    gsap.to(displayProgress, {
      value: target,
      duration,
      ease: "power1.out",
      onUpdate: () => updateUI(displayProgress.value),
    });
  };

  const hideImmediately = () => {
    preloaderVisible.value = false;
    document.body.classList.remove("is-loading");
    const preloader = document.querySelector(".preloader") as HTMLElement | null;
    if (preloader) preloader.classList.add("preloader-hidden");
  };

  const finishLoading = () => {
    if (isFinished) return;
    isFinished = true;

    gsap.to(displayProgress, {
      value: 1,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: () => updateUI(displayProgress.value),
      onComplete: () => {
        gsap.delayedCall(0.35, () => {
          const preloader = document.querySelector(".preloader") as HTMLElement | null;
          if (preloader) {
            gsap.to(preloader, {
              opacity: 0,
              scale: 1.03,
              duration: 0.55,
              ease: "power2.inOut",
              onComplete: () => {
                document.body.classList.remove("is-loading");
                preloader.classList.add("preloader-hidden");
                preloaderVisible.value = false;
              },
            });
          } else {
            document.body.classList.remove("is-loading");
            preloaderVisible.value = false;
          }
        });
      },
    });
  };

  onMounted(() => {
    // If entered on /cv directly, don't show preloader
    if (cvVisible.value || (typeof window !== "undefined" && window.location.pathname.includes("/cv"))) {
      hideImmediately();
      return;
    }

    // Initial state
    if (resources.isReady) {
      tweenTo(0.85, 0.4);
    } else {
      const current = resources.loaded / Math.max(1, resources.toLoad);
      const initial = Math.max(0.15, current * 0.85);
      tweenTo(initial, 0.4);

      resources.on("progress", (newProgress) => {
        const val = 0.15 + newProgress * 0.7; // up to 85%
        tweenTo(val, 0.3);
      });
    }

    resources.once("ready", () => {
      if (!isThreeReady.value) {
        tweenTo(0.92, 0.4);
      }
    });
  });

  watch(
    [isThreeReady, cvVisible],
    ([threeReady, isCv]) => {
      if (isCv) {
        hideImmediately();
        return;
      }

      if (threeReady && !isFinished) {
        finishLoading();
      }
    },
    { immediate: true },
  );
};
