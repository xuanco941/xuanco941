import img0 from "../../../assets/images/architecture/duskai-main.jpg";
import img1 from "../../../assets/images/architecture/duskai-rag-pipeline.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "DuskAI (duskai.vn)",
  theme: "dark",
  tags: ["ai", "rag", "mcp", "qdrant", "react"],
  videoBorder: false,
  live: "https://duskai.vn",
  description:
    "DuskAI (duskai.vn) là nền tảng AI Workspace, Agentic Workflow & RAG thế hệ mới do tôi trực tiếp nghiên cứu và phát triển.<br/><br/>Hệ sinh thái DuskAI bao gồm bộ công cụ RAG Embedding chuyên sâu, semantic chunking tiếng Việt, tích hợp cơ sở dữ liệu vector Qdrant, kết nối Model Context Protocol (MCP) và DuskOffice hỗ trợ trực quan hóa dữ liệu bằng biểu đồ Recharts, tự động hóa quy trình nghiệp vụ cho doanh nghiệp và cá nhân.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "DuskAI System Architecture & Workflow",
        caption: "Kiến trúc Tổng thể Hệ thống DuskAI & Điều phối AI Agent",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "DuskAI RAG Embedding & Vector Retrieval Pipeline",
        caption: "Pipeline RAG Embedding, Semantic Chunking & Vector Search Qdrant",
      },
    },
  ],
} as const satisfies ProjectContent;
