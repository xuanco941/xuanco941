import img0 from "../../../assets/images/architecture/court-main.jpg";
import img1 from "../../../assets/images/architecture/court-case-lifecycle.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Vietnam Court Sector Systems",
  theme: "dark",
  tags: ["dotnet", "oracle", "vue", "security"],
  videoBorder: false,
  description:
    "Engineering, developing, and operating core software and mission-critical enterprise systems in the Court sector of Vietnam.<br/><br/>The system powers workflow tracking, operational coordination, document security, and nationwide judicial analytics across court levels. Engineered with enterprise Oracle Database design, high-grade security, multi-tier RBAC, and robust data integrity.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Judicial Sector Enterprise Architecture & Oracle Cluster",
        caption: "Overall Architecture & High-Availability Oracle Database Cluster",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Judicial Case Lifecycle & Procedural Pipeline",
        caption: "Case Lifecycle Pipeline: Filing, Allocation, Digital Dossier & Court Trial",
      },
    },
  ],
} as const satisfies ProjectContent;
