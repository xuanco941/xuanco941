import { ref } from "vue";
import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";
import { raycast } from "./utils/raycast";
import { scenes } from "../animations/scenes";
import { waypoints } from "../animations/waypoints";

export const isThreeReady = ref(false);

let canvas: HTMLCanvasElement | null = null;

const init = (_canvas: HTMLCanvasElement) => {
  canvas = _canvas;

  const onReady = async () => {
    try {
      threeSizes.init(_canvas);
      scenes.init();
      waypoints.init();
      camera.init();
      renderTarget.init();
      renderer.init(canvas);

      objects.init();
      raycast.init();

      await renderer.compile();
      renderer.setIsActive(true);
      waypoints.updateReferences();

      isThreeReady.value = true;
    } catch (err) {
      console.error("[Three] Init error:", err);
      isThreeReady.value = true;
    }
  };

  if (resources.isReady) {
    onReady();
  } else {
    resources.once("ready", onReady);
  }
};

const destroy = () => {
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
  canvas = null;
  isThreeReady.value = false;
};

export const three = { init, destroy, isThreeReady };

