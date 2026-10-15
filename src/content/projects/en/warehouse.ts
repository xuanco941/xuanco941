import img0 from "../../../assets/images/architecture/warehouse-main.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Smart Warehouse Logistics",
  theme: "dark",
  tags: ["vue", "nestjs", "postgresql", "redis"],
  videoBorder: false,
  description:
    "Intelligent Warehouse Management System (WMS) tailored for the apparel and textile industry.<br/><br/>Provides barcode/QR-based roll tracking, automated bin allocation, safety stock thresholds, and full provenance tracking across raw fabric inventory and finished goods.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Smart Warehouse Management System Architecture",
        caption: "Overall Architecture: Inbound Scanning, 3D Bin Slotting, Redis Cache & Live Analytics",
      },
    },
  ],
} as const satisfies ProjectContent;
