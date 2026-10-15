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
    "DuskAI (duskai.vn) is a next-generation AI Workspace, Agentic Workflow & RAG platform designed and developed by me.<br/><br/>The DuskAI ecosystem integrates advanced RAG embedding pipelines, semantic text chunking, Qdrant Vector DB indexing, Model Context Protocol (MCP) tooling, and DuskOffice with interactive Recharts analytics—empowering businesses and professionals to automate complex multi-step workflows.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "DuskAI Enterprise System Architecture & Workflow",
        caption: "Overall DuskAI Enterprise Architecture & Multi-Agent Orchestration",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "DuskAI RAG Embedding & Vector Retrieval Pipeline",
        caption: "RAG Embedding Pipeline, Semantic Chunking & Qdrant Vector Search",
      },
    },
  ],
} as const satisfies ProjectContent;
