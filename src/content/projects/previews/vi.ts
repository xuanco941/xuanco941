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
    description: "Nền tảng AI Agent, RAG Embedding & Workspace",
  },
  {
    title: "Phần mềm ngành Tòa án",
    slug: "court-systems",
    thumbnail: thumbnailCourt,
    description: "Hệ thống phần mềm và CSDL ngành Tòa án Việt Nam",
  },
  {
    title: "ERP & MES Sản xuất",
    slug: "erp-mes",
    thumbnail: thumbnailErpMes,
    description: "Hệ thống sản xuất tích hợp robot mini giọng nói",
  },
  {
    title: "Quản lý Kho thông minh",
    slug: "warehouse",
    thumbnail: thumbnailWarehouse,
    description: "Quản lý kho dệt may & truy vết xuất nhập tồn",
  },
  {
    title: "Smart Document Management",
    slug: "smart-docs",
    thumbnail: thumbnailSmartDocs,
    description: "Quản lý tài liệu thông minh tích hợp AI trích xuất",
  },
  {
    title: "Nền tảng Ôn thi trực tuyến",
    slug: "edtech-thipro",
    thumbnail: thumbnailEdtech,
    description: "Hệ thống luyện thi trắc nghiệm tải cao trực tuyến",
  },
] as const satisfies ProjectPreview[];
