import img0 from "../../../assets/images/architecture/smart-docs-main.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Smart Document AI",
  theme: "dark",
  tags: ["python", "rag", "react", "ai"],
  videoBorder: false,
  description:
    "Intelligent document repository with built-in OCR and semantic AI knowledge extraction.<br/><br/>Enables educational institutions and enterprises to digitize thousands of unstructured papers, curricula, and administrative decrees with Vietnamese-optimized OCR and vector-powered semantic lookup.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Smart Document Management & OCR Architecture",
        caption: "Overall Architecture: Ingestion, Vietnamese OCR, Semantic Chunking & Qdrant Search",
      },
    },
  ],
} as const satisfies ProjectContent;
