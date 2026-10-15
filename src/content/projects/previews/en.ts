import thumbnailDuskAI from "../../../assets/images/architecture/duskai-main.jpg";
import thumbnailCourt from "../../../assets/images/architecture/court-main.jpg";
import thumbnailErpMes from "../../../assets/images/architecture/erp-mes-main.jpg";
import thumbnailWarehouse from "../../../assets/images/architecture/warehouse-main.svg";
import thumbnailSmartDocs from "../../../assets/images/architecture/smart-docs-main.svg";
import thumbnailEdtech from "../../../assets/images/architecture/edtech-main.svg";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "DuskAI (duskai.vn)",
    slug: "duskai",
    thumbnail: thumbnailDuskAI,
    description: "AI Agent, RAG Embedding & Workspace Platform",
  },
  {
    title: "Vietnam Court Sector Systems",
    slug: "court-systems",
    thumbnail: thumbnailCourt,
    description: "Enterprise software & data systems for Vietnam Court sector",
  },
  {
    title: "Manufacturing ERP & MES",
    slug: "erp-mes",
    thumbnail: thumbnailErpMes,
    description: "Smart production ERP with voice-controlled mini robot",
  },
  {
    title: "Smart Warehouse Logistics",
    slug: "warehouse",
    thumbnail: thumbnailWarehouse,
    description: "Textile warehouse & inventory traceability system",
  },
  {
    title: "Smart Document AI",
    slug: "smart-docs",
    thumbnail: thumbnailSmartDocs,
    description: "School document repository with OCR & semantic search",
  },
  {
    title: "Online Exam Platform (ThiPro)",
    slug: "edtech-thipro",
    thumbnail: thumbnailEdtech,
    description: "High-concurrency online learning & examination engine",
  },
] as const satisfies ProjectPreview[];
