import img0 from "../../../assets/images/architecture/erp-mes-main.jpg";
import img1 from "../../../assets/images/architecture/erp-mes-telemetry.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Manufacturing ERP & MES",
  theme: "dark",
  tags: ["erp", "react", "node", "iot", "websockets"],
  videoBorder: false,
  description:
    "Integrated Manufacturing Execution System (MES) & Enterprise Resource Planning (ERP) coupled with voice-controlled mini robots (ESP32).<br/><br/>Digitizes shop-floor operations, dispatches work orders, tracks machine health via WebSockets in real time, and coordinates automated line operations via speech recognition.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Manufacturing ERP & MES Architecture with IoT Robotics",
        caption: "Overall Architecture: ERP Core, MES Dispatch & Voice-Controlled AGV",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Real-time WebSockets Telemetry & ESP32 Robotics",
        caption: "Shopfloor WebSockets Telemetry, OEE Performance & IoT Robot Integration",
      },
    },
  ],
} as const satisfies ProjectContent;
