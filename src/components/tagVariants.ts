export type TagVariant =
  | "three"
  | "websockets"
  | "react"
  | "vue"
  | "redis"
  | "gray"
  | "html"
  | "css"
  | "javascript"
  | "node"
  | "next"
  | "kubernetes"
  | "postgresql"
  | "ogl"
  | "glsl"
  | "ai"
  | "mcp"
  | "rag"
  | "nestjs"
  | "dotnet"
  | "csharp"
  | "oracle"
  | "sqlserver"
  | "iot"
  | "qdrant"
  | "python"
  | "security"
  | "erp";

export const tagLabels = {
  three: "Three.js",
  websockets: "WebSockets",
  react: "React",
  vue: "Vue.js",
  redis: "Redis",
  gray: "Gray",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  node: "Node.js",
  next: "Next.js",
  kubernetes: "Kubernetes",
  postgresql: "PostgreSQL",
  ogl: "OGL.js",
  glsl: "GLSL",
  ai: "AI Agent",
  mcp: "MCP Tooling",
  rag: "RAG Pipeline",
  nestjs: "NestJS",
  dotnet: "ASP.NET Core",
  csharp: "C#",
  oracle: "Oracle DB",
  sqlserver: "SQL Server",
  iot: "IoT / PLC",
  qdrant: "Qdrant",
  python: "Python",
  security: "Security",
  erp: "ERP / MES",
} as const satisfies Record<TagVariant, string>;
