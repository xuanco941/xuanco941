<script setup lang="ts">
import { useRouter, withBase } from "../composables/useRouter";

const router = useRouter();
const basePath = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

const profile = {
  name: "Đỗ Văn Xuân",
  role: "Lập trình viên Fullstack & AI Engineer",
  headline:
    "Xây dựng hệ thống nghiệp vụ, xử lý dữ liệu và tự động hóa công việc bằng AI. Có kinh nghiệm với ứng dụng bảo mật cao, cơ sở dữ liệu lớn và các sản phẩm phục vụ vận hành nội bộ.",
  location: "Hà Nội",
  hometown: "Ninh Bình",
  email: "xuanco941@gmail.com",
  phone: "0388530006",
  github: "https://github.com/xuanco941",
  current: "Cục Công nghệ thông tin - Tòa án nhân dân tối cao",
};

const stats = [
  ["4+", "năm kinh nghiệm"],
  ["30+", "dự án đã tham gia"],
  ["10+", "lĩnh vực triển khai"],
];

const stackGroups = [
  ["Frontend", ["React", "Next.js", "Vue", "React Native", "Electron"]],
  ["Backend", ["Node.js", "NestJS", "ASP.NET", "C#", "REST API", "Socket"]],
  ["Database & Data", ["Oracle Database", "SQL Server", "PostgreSQL", "Redis", "Firebase", "Qdrant"]],
  ["AI Engineering", ["LLM Integration", "Embedding", "Semantic Chunking", "RAG", "Vector Search", "Context Management"]],
  ["Agents & Tooling", ["AI Agent", "Tool Calling", "MCP", "Agentic Workflow", "Knowledge Base", "Prompt Engineering"]],
  ["Workflow & Security", ["Git", "ERP/MES", "Tự động hóa bằng AI", "Thống kê dữ liệu", "Kinh doanh", "Tools", "Ứng dụng di động"]],
] as const;

const highlights = [
  "Thiết kế hệ thống AI Agent có khả năng sử dụng tool, MCP và workflow để xử lý các tác vụ nghiệp vụ nhiều bước.",
  "Xây dựng pipeline RAG từ ingestion, semantic chunking, embedding đến vector search và truy xuất tri thức theo ngữ cảnh.",
  "Phân tích yêu cầu, thiết kế database và triển khai module nghiệp vụ từ đầu đến cuối.",
  "Xử lý, tổng hợp và thống kê dữ liệu phục vụ báo cáo, quản trị và ra quyết định.",
  "Xây dựng các hệ thống có yêu cầu bảo mật, phân quyền và kiểm soát dữ liệu chặt chẽ.",
  "Tự động hóa quy trình làm việc bằng AI để giảm thao tác thủ công và tăng tốc xử lý nghiệp vụ.",
  "Xây dựng phần mềm kinh doanh, quảng cáo, bán hàng, quản lý hay tool hỗ trợ vận hành cực nhanh và hiệu quả.",
];

const projects = [
  [
    "Nền tảng AI Agent & RAG (duskai.vn)",
    "Xây dựng Agent tùy biến kết nối kho tri thức, embedding/vector search, MCP tooling và workflow AI để tự động hóa nghiệp vụ.",
    "AI Engineering",
  ],
  [
    "Hệ thống phần mềm ngành Tòa án",
    "Hệ thống theo dõi, quản lý quy trình xử lý án theo vòng đời nghiệp vụ toàn trình, phục vụ tra cứu và điều hành cho các cấp Tòa án nhân dân.",
    "Tòa án",
  ],
  [
    "Thống kê dữ liệu",
    "Tổng hợp, chuẩn hóa và trực quan hóa dữ liệu phục vụ báo cáo vận hành và quản trị.",
    "Data",
  ],
  [
    "Ứng dụng học tập, ôn thi",
    "Nền tảng học tập và ôn luyện trực tuyến, tiêu biểu như congchuc.online, ThiPro.",
    "EdTech",
  ],
  [
    "Robot mini điều tiết công nghiệp bằng giọng nói (ESP32)",
    "Ứng dụng robot thông minh hỗ trợ điều tiết và quản lý quy trình sản xuất.",
    "Tự động hóa",
  ],
  [
    "ERP & MES System",
    "Hệ thống điều hành sản xuất, hoạch định nguồn lực, theo dõi tiến độ và tích hợp robot.",
    "Sản xuất",
  ],
  [
    "Warehouse Management",
    "Quản lý tồn kho, nhập xuất, truy vết hàng hóa cho ngành may mặc và dệt may.",
    "Kho vận",
  ],
  [
    "Smart Document Management",
    "Quản lý tài liệu trường học, tìm kiếm nhanh và tích hợp các tính năng AI hỗ trợ xử lý.",
    "AI Docs",
  ],
  [
    "Industrial Machine IoT",
    "Quản lý thiết bị sản xuất, theo dõi trạng thái máy và kết nối PLC trong nhà máy.",
    "IoT",
  ],
] as const;

const handleBack = () => {
  router.push("/");
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <main class="page-shell">
    <div class="ambient-layer" aria-hidden="true">
      <div class="circuit-grid"></div>
      <div class="glow glow-cyan"></div>
      <div class="glow glow-coral"></div>
    </div>

    <div class="site-wrap">
      <nav class="top-nav">
        <a :href="withBase('/')" @click.prevent="handleBack" class="brand">
          <span>DX</span>
          Portfolio
        </a>
        <div class="top-actions">
          <a :href="withBase('/')" @click.prevent="handleBack" class="switch-page-link">Trang 3D</a>
          <button @click="handlePrint" class="download-btn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Tải PDF
          </button>
        </div>
      </nav>

      <article id="top" class="cv-sheet">
        <header class="hero">
          <div class="hero-copy">
            <div class="signal-line">
              <span>Fullstack</span>
              <span>/</span>
              <span>Web</span>
              <span>/</span>
              <span>Mobile</span>
              <span>/</span>
              <span>Data</span>
              <span>/</span>
              <span>AI</span>
            </div>
            <h1>{{ profile.name }}</h1>
            <p class="role">{{ profile.role }}</p>
            <p class="headline">{{ profile.headline }}</p>

            <div class="info-grid">
              <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ profile.location }} | Quê quán: {{ profile.hometown }}</span>
              </div>
              <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 12h.01"></path>
                  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                  <path d="M22 13a18.15 18.15 0 0 1-20 0"></path>
                  <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </svg>
                <span>{{ profile.current }}</span>
              </div>
              <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>{{ profile.email }}</span>
              </div>
              <div class="info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{{ profile.phone }}</span>
              </div>
            </div>
          </div>

          <aside class="portrait-panel" style="min-height: 100%">
            <div class="portrait">
              <img :src="`${basePath}avt.png`" alt="Đỗ Văn Xuân" />
            </div>
            <div class="stats-grid">
              <div class="stat" v-for="[value, label] in stats" :key="label">
                <strong>{{ value }}</strong>
                <span>{{ label }}</span>
              </div>
            </div>
          </aside>
        </header>

        <div class="content-grid">
          <aside class="left-column">
            <section id="profile" class="cv-section">
              <div class="section-title">
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  </svg>
                </span>
                <h2>Hồ sơ ngắn gọn</h2>
              </div>
              <p>
                Developer thiên về hệ thống nghiệp vụ, dữ liệu, các phần mềm xử lý tự động bằng AI. Tôi có thể làm việc từ backend,
                database đến frontend, ưu tiên tốc độ, hiệu năng, khả năng mở rộng và trải nghiệm sử dụng rõ ràng.
              </p>
            </section>

            <section id="skills" class="cv-section">
              <div class="section-title">
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </span>
                <h2>Công nghệ chính</h2>
              </div>
              <div class="stack-list">
                <div v-for="[title, items] in stackGroups" :key="title" class="stack-group">
                  <h3>{{ title }}</h3>
                  <div class="chip-row">
                    <span v-for="item in items" :key="item" class="chip">{{ item }}</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" class="cv-section">
              <div class="section-title">
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <h2>Liên hệ</h2>
              </div>
              <div class="contact-list">
                <a :href="`mailto:${profile.email}`">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  {{ profile.email }}
                </a>
                <a :href="profile.github" target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  github.com/xuanco941
                </a>
                <span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  {{ profile.phone }}
                </span>
              </div>
            </section>

            <section class="cta-panel">
              <div>
                <h2>Sẵn sàng trao đổi cơ hội phù hợp</h2>
                <p>
                  Phù hợp với vị trí Fullstack Developer, Data-oriented Developer, công ty non-tech cần freelancer xây dựng phần mềm nhanh có tính hoàn thiện cao hoặc các team xây dựng hệ thống nghiệp vụ bảo mật, tự động hóa và xử lý dữ liệu.
                </p>
              </div>
              <a :href="`mailto:${profile.email}`">
                Liên hệ
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
            </section>
          </aside>

          <section class="right-column">
            <section class="cv-section">
              <div class="section-title">
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="8" height="8" x="3" y="3" rx="2"></rect>
                    <path d="M7 11v4a2 2 0 0 0 2 2h4"></path>
                    <rect width="8" height="8" x="13" y="13" rx="2"></rect>
                  </svg>
                </span>
                <h2>Điểm mạnh trong công việc</h2>
              </div>
              <div class="highlight-list">
                <div v-for="(item, index) in highlights" :key="item" class="highlight">
                  <span>{{ index + 1 }}</span>
                  <p>{{ item }}</p>
                </div>
              </div>
            </section>

            <section id="projects" class="cv-section">
              <div class="section-title">
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 12h.01"></path>
                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                    <path d="M22 13a18.15 18.15 0 0 1-20 0"></path>
                    <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                  </svg>
                </span>
                <h2>Dự án tiêu biểu</h2>
              </div>
              <div class="project-grid">
                <article v-for="[name, detail, tag] in projects" :key="name" class="project-card">
                  <div class="project-head">
                    <h3>{{ name }}</h3>
                    <span>{{ tag }}</span>
                  </div>
                  <p>{{ detail }}</p>
                </article>
              </div>
            </section>
          </section>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
/* Base Reset & Fonts for CV */
.page-shell {
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:
    radial-gradient(circle at 18% 0%, rgba(45, 212, 191, 0.12), transparent 26%),
    radial-gradient(circle at 82% 8%, rgba(59, 130, 246, 0.1), transparent 24%),
    #f6f8fb;
  color: #0f172a;
}

.page-shell * {
  box-sizing: border-box;
}

.ambient-layer {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.circuit-grid {
  position: absolute;
  inset: 0;
  opacity: 0.42;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
  background-size: 48px 48px, 48px 48px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.42), transparent 82%);
}

.glow {
  position: absolute;
  width: 18rem;
  height: 18rem;
  border-radius: 999px;
  filter: blur(70px);
}

.glow-cyan {
  left: 8%;
  top: 12%;
  background: rgba(45, 212, 191, 0.14);
}

.glow-coral {
  right: 10%;
  bottom: 18%;
  background: rgba(59, 130, 246, 0.12);
}

.site-wrap {
  position: relative;
  max-width: 1140px;
  margin: 0 auto;
  padding: 18px 32px 36px;
  z-index: 1;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.brand,
.nav-links,
.download-btn,
.switch-page-link,
.contact-list a,
.cta-panel a {
  display: inline-flex;
  align-items: center;
}

.top-actions {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.brand {
  gap: 12px;
  color: #0f172a;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
}

.brand span {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(20, 184, 166, 0.28);
  border-radius: 8px;
  background: rgba(20, 184, 166, 0.08);
  color: #0f766e;
  font-weight: 900;
}

.nav-links {
  gap: 28px;
  font-size: 14px;
}

.nav-links a {
  color: #475569;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #0f766e;
}

.download-btn {
  gap: 8px;
  border: 0;
  border-radius: 8px;
  background: #0f766e;
  color: #ffffff;
  padding: 10px 16px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(15, 118, 110, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;
}

.download-btn:hover {
  transform: translateY(-1px);
  background: #115e59;
}

.switch-page-link {
  justify-content: center;
  min-height: 38px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 13px;
  background: #ffffff;
  color: #334155;
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.switch-page-link:hover {
  transform: translateY(-1px);
  background: #f1f5f9;
  color: #0f172a;
}

.cv-sheet {
  position: relative;
  overflow: hidden;
  border: 1px solid #dbe4ef;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(18px);
}

.cv-sheet::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(20, 184, 166, 0.08), transparent 22%, transparent 78%, rgba(59, 130, 246, 0.06)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.75), transparent 30%);
}

.cv-sheet > * {
  position: relative;
  z-index: 1;
}

.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  padding: 28px;
  border-bottom: 1px solid #e2e8f0;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

.signal-line {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 14px;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  font-weight: 800;
}

.signal-line span:nth-child(even) {
  color: #94a3b8;
}

.hero h1 {
  margin: 0;
  max-width: 760px;
  color: #0f172a;
  font-size: clamp(38px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 900;
}

.role {
  margin-top: 10px;
  color: #2563eb;
  font-size: 19px;
  font-weight: 800;
}

.headline {
  max-width: 760px;
  margin-top: 12px;
  color: #334155;
  font-size: 14px;
  line-height: 1.7;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  color: #334155;
  font-size: 13px;
  margin-top: 8px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  min-width: 0;
  border: 1px solid #dbe4ef;
  border-radius: 8px;
  background: #ffffff;
  padding: 8px 10px;
}

.info-item svg {
  flex: 0 0 auto;
  margin-top: 2px;
  color: #0f766e;
}

.portrait-panel {
  position: relative;
  min-height: 0;
  overflow: hidden;
  border: 1px solid #dbe4ef;
  border-radius: 10px;
  background: #ffffff;
  padding: 16px;
}

.portrait-panel::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #14b8a6, transparent);
}

.portrait {
  position: relative;
  max-width: 240px;
  aspect-ratio: 4 / 5;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 18px;
}

.stat {
  border: 1px solid #dbe4ef;
  border-radius: 8px;
  background: #ffffff;
  padding: 9px 7px;
  text-align: center;
}

.stat strong {
  display: block;
  color: #0f766e;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.1;
}

.stat span {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 10px;
  line-height: 1.35;
}

.content-grid {
  display: grid;
  grid-template-columns: 0.84fr 1.16fr;
}

.left-column,
.right-column {
  padding: 28px;
}

.left-column {
  border-right: 1px solid #e2e8f0;
}

.cv-section {
  margin-bottom: 26px;
}

.cv-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.section-title > span {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(20, 184, 166, 0.28);
  border-radius: 8px;
  background: rgba(20, 184, 166, 0.08);
  color: #0f766e;
}

.section-title h2 {
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0;
}

.cv-section p,
.highlight p,
.project-card p,
.cta-panel p {
  color: #334155;
  line-height: 1.62;
  font-size: 14px;
  margin: 0;
}

.stack-list {
  display: grid;
  gap: 14px;
}

.stack-group h3 {
  margin: 0 0 7px;
  color: #0f172a;
  font-size: 13px;
  font-weight: 800;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  border: 1px solid #cde7e4;
  border-radius: 6px;
  background: #ecfdf5;
  padding: 5px 8px;
  color: #0f766e;
  font-size: 11px;
  line-height: 1;
}

.contact-list {
  display: grid;
  gap: 9px;
  color: #334155;
  font-size: 13px;
}

.contact-list a,
.contact-list span {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: #475569;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-list a:hover {
  color: #0f766e;
}

.highlight-list {
  display: grid;
  gap: 12px;
}

.highlight {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 12px;
}

.highlight > span {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 900;
}

.highlight p {
  padding-top: 5px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.project-card {
  border: 1px solid #dbe4ef;
  border-radius: 8px;
  background: #ffffff;
  padding: 13px;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(20, 184, 166, 0.42);
  background: #f8fafc;
}

.project-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
}

.project-head h3 {
  margin: 0;
  color: #0f172a;
  font-size: 15px;
  font-weight: 900;
}

.project-head span {
  flex: 0 0 auto;
  border: 1px solid #cde7e4;
  border-radius: 6px;
  background: #ecfdf5;
  padding: 4px 7px;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 9px;
  font-weight: 900;
}

.project-card p {
  color: #64748b;
  font-size: 13px;
}

.cta-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid #dbe4ef;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8fafc, #ecfeff);
  padding: 16px;
}

.cta-panel h2 {
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 900;
}

.cta-panel p {
  margin-top: 8px;
  font-size: 13px;
}

.cta-panel a {
  flex: 0 0 auto;
  justify-content: center;
  gap: 8px;
  border: 1px solid #99f6e4;
  border-radius: 8px;
  padding: 10px 16px;
  background: #ffffff;
  color: #0f766e;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.2s ease;
}

.cta-panel a:hover {
  background: #ccfbf1;
}

.left-column .cta-panel {
  min-height: 170px;
  align-items: flex-start;
  flex-direction: column;
}

.left-column .cta-panel a {
  margin-top: auto;
}

/* Responsive */
@media (max-width: 980px) {
  .site-wrap {
    padding: 14px 14px 28px;
  }

  .nav-links {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 18px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .left-column {
    border-right: 0;
    border-bottom: 1px solid #e2e8f0;
  }

  .left-column,
  .right-column {
    padding: 20px;
  }

  .portrait-panel {
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: center;
    gap: 14px;
    padding: 14px;
  }

  .portrait {
    width: 100%;
    max-width: 150px;
    margin: 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-top: 0;
  }
}

@media (max-width: 520px) {
  .brand span {
    font-size: 14px;
  }

  .download-btn {
    padding: 9px 12px;
  }

  .hero,
  .left-column,
  .right-column {
    padding: 14px;
  }

  .hero h1 {
    font-size: clamp(32px, 9vw, 42px);
  }

  .portrait-panel {
    grid-template-columns: 88px 1fr;
    gap: 10px;
    padding: 10px;
  }

  .portrait {
    max-width: 88px;
  }

  .stats-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 5px;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}

/* Print Stylesheet for A4 Export */
@media print {
  @page {
    size: A4;
    margin: 9mm;
  }

  html,
  body {
    width: 210mm;
    background: #ffffff !important;
    color: #0f172a !important;
    overflow: visible !important;
  }

  .page-shell {
    background: #ffffff !important;
    color: #0f172a !important;
  }

  .cv-sheet::before {
    display: none;
  }

  .ambient-layer,
  .top-nav,
  .top-actions,
  .cta-panel a {
    display: none !important;
  }

  .site-wrap {
    max-width: none;
    padding: 0;
  }

  .cv-sheet {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: #ffffff;
  }

  .hero {
    align-items: start;
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.72fr);
    gap: 14px;
    padding: 0 0 12px;
    border-bottom: 1px solid #e2e8f0;
  }

  .hero h1 {
    color: #0f172a;
    font-size: 34px;
    line-height: 1;
  }

  .portrait-panel {
    display: block;
    align-self: start;
    justify-self: end;
    width: 68mm;
    min-height: 0;
    padding: 5mm;
  }

  .portrait {
    width: 32mm;
    max-width: 32mm;
    margin: 0 auto;
  }

  .stats-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2mm;
    margin-top: 4mm;
  }

  .content-grid {
    grid-template-columns: 0.8fr 1.2fr;
  }

  .left-column {
    padding-right: 18px;
    border-right: 1px solid #e2e8f0;
  }

  .right-column {
    padding-left: 18px;
  }
}
</style>
