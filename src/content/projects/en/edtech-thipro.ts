import img0 from "../../../assets/images/architecture/edtech-main.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Online Exam Platform (ThiPro)",
  theme: "dark",
  tags: ["react", "node", "redis", "javascript"],
  videoBorder: false,
  live: "https://congchuc.online",
  description:
    "High-throughput online examination and learning assessment engine (congchuc.online, ThiPro).<br/><br/>Architected to reliably support tens of thousands of simultaneous examinees with sub-millisecond score ingestion, Redis caching, anti-cheat detection, and dynamic matrix question shuffling.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "High-Concurrency Online Examination Architecture",
        caption: "Overall Architecture: Ingress Edge, Session Coordinator, Redis Matrix & Auto-Scoring Engine",
      },
    },
  ],
} as const satisfies ProjectContent;
