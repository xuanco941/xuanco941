import { ref, onMounted } from "vue";
import { resources } from "../utils/resources";
import { cvVisible } from "./useRouteObserver";
import gsap from "gsap";

export const preloaderVisible = ref(true);

export const usePreloader = () => {
  const currentProgress = { value: 0 };
  let isDone = false;

  const updateUI = (ratio: number) => {
    const percent = Math.min(100, Math.max(0, Math.round(ratio * 100)));
    const rect = document.querySelector(".preloader-rect") as HTMLElement | null;
    const bar = document.querySelector(".preloader-bar-fill") as HTMLElement | null;
    const percentText = document.querySelector(".preloader-percent") as HTMLElement | null;
    const statusText = document.querySelector(".preloader-status") as HTMLElement | null;

    if (rect) rect.style.transform = `scaleY(${ratio})`;
    if (bar) bar.style.width = `${percent}%`;
    if (percentText) percentText.textContent = `${percent}%`;

    if (statusText) {
      if (percent < 30) {
        statusText.textContent = "Khởi tạo hệ thống...";
      } else if (percent < 75) {
        statusText.textContent = "Đang tải mô hình & không gian 3D...";
      } else if (percent < 100) {
        statusText.textContent = "Biên dịch WebGL Shaders...";
      } else {
        statusText.textContent = "Sẵn sàng trải nghiệm!";
      }
    }
  };

  const setProgress = (target: number, duration: number = 0.3) => {
    gsap.to(currentProgress, {
      value: target,
      duration,
      ease: "power2.out",
      onUpdate: () => updateUI(currentProgress.value),
    });
  };

  const hidePreloader = () => {
    if (isDone) return;
    isDone = true;

    setProgress(1, 0.25);

    gsap.delayedCall(0.35, () => {
      const preloader = document.querySelector(".preloader") as HTMLElement | null;
      if (preloader) {
        gsap.to(preloader, {
          opacity: 0,
          scale: 1.03,
          duration: 0.5,
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
  };

  onMounted(() => {
    // If on /cv, hide immediately
    if (cvVisible.value || (typeof window !== "undefined" && window.location.pathname.includes("/cv"))) {
      isDone = true;
      preloaderVisible.value = false;
      document.body.classList.remove("is-loading");
      const el = document.querySelector(".preloader") as HTMLElement | null;
      if (el) el.classList.add("preloader-hidden");
      return;
    }

    // Safety timeout: never hang more than 3.5s
    const safetyTimer = setTimeout(() => {
      if (!isDone) {
        hidePreloader();
      }
    }, 3500);

    // Initial progress
    if (resources.isReady) {
      clearTimeout(safetyTimer);
      hidePreloader();
    } else {
      const initial = Math.max(0.15, (resources.loaded / Math.max(1, resources.toLoad)) * 0.9);
      setProgress(initial, 0.3);

      resources.on("progress", (newProgress) => {
        const val = 0.15 + newProgress * 0.85; // scales from 0.15 to 1.0
        setProgress(Math.min(0.99, val), 0.25);
      });

      resources.once("ready", () => {
        clearTimeout(safetyTimer);
        hidePreloader();
      });
    }
  });
};
