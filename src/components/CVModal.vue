<script setup lang="ts">
import { isCvModalOpen, closeCvModal } from "../composables/useCvModal";
import { locale } from "../i18n/store";
import { ref } from "vue";
import XIcon from "./icons/X.vue";

const copied = ref(false);

const handleCopyEmail = () => {
  navigator.clipboard.writeText("xuanco941@gmail.com");
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isCvModalOpen" class="cv-backdrop" @click.self="closeCvModal">
        <div class="cv-modal">
          <!-- Top bar -->
          <div class="cv-header">
            <div class="cv-title-group">
              <span class="cv-tag">CURRICULUM VITAE</span>
              <h2 class="cv-name">{{ locale === 'en' ? 'Xuan Do (Do Van Xuan)' : 'Đỗ Văn Xuân' }}</h2>
              <p class="cv-role">{{ locale === 'en' ? 'Fullstack & AI Engineer' : 'Lập trình viên Fullstack & Kỹ sư AI' }}</p>
            </div>
            <div class="cv-controls">
              <button class="cv-action-btn" @click="handlePrint" title="Print CV">
                🖨️ {{ locale === 'en' ? 'Print / Save' : 'In / Lưu' }}
              </button>
              <button class="cv-close-btn" @click="closeCvModal" aria-label="Close CV">
                <XIcon class="cv-close-icon" />
              </button>
            </div>
          </div>

          <!-- Body content -->
          <div class="cv-body">
            <!-- Quick Info Bar -->
            <div class="cv-quick-info">
              <div class="cv-info-item">
                <span class="cv-info-label">📍 {{ locale === 'en' ? 'Location' : 'Địa điểm' }}</span>
                <span class="cv-info-value">{{ locale === 'en' ? 'Hanoi (Hometown: Ninh Binh)' : 'Hà Nội (Quê quán: Ninh Bình)' }}</span>
              </div>
              <div class="cv-info-item">
                <span class="cv-info-label">✉️ Email</span>
                <button class="cv-copy-link" @click="handleCopyEmail">
                  xuanco941@gmail.com {{ copied ? '✓' : '' }}
                </button>
              </div>
              <div class="cv-info-item">
                <span class="cv-info-label">📞 {{ locale === 'en' ? 'Phone' : 'Điện thoại' }}</span>
                <span class="cv-info-value">0388530006</span>
              </div>
              <div class="cv-info-item">
                <span class="cv-info-label">🌐 GitHub</span>
                <a href="https://github.com/xuanco941" target="_blank" rel="noreferrer" class="cv-info-link">
                  github.com/xuanco941
                </a>
              </div>
              <div class="cv-info-item">
                <span class="cv-info-label">🚀 AI Platform</span>
                <a href="https://duskai.vn" target="_blank" rel="noreferrer" class="cv-info-link highlight">
                  duskai.vn
                </a>
              </div>
            </div>

            <!-- Stats -->
            <div class="cv-stats">
              <div class="cv-stat-box">
                <span class="cv-stat-num">4+</span>
                <span class="cv-stat-desc">{{ locale === 'en' ? 'Years of Experience' : 'Năm kinh nghiệm' }}</span>
              </div>
              <div class="cv-stat-box">
                <span class="cv-stat-num">30+</span>
                <span class="cv-stat-desc">{{ locale === 'en' ? 'Projects Delivered' : 'Dự án đã triển khai' }}</span>
              </div>
              <div class="cv-stat-box">
                <span class="cv-stat-num">10+</span>
                <span class="cv-stat-desc">{{ locale === 'en' ? 'Enterprise Domains' : 'Lĩnh vực nghiệp vụ' }}</span>
              </div>
            </div>

            <!-- Summary -->
            <section class="cv-section">
              <h3 class="cv-section-title">// {{ locale === 'en' ? 'EXECUTIVE SUMMARY' : 'TỔNG QUAN NĂNG LỰC' }}</h3>
              <p class="cv-text">
                {{
                  locale === 'en'
                    ? 'Fullstack Developer and AI Engineer specializing in enterprise systems, high-concurrency architectures, and agentic workflows. Extensive experience designing and developing mission-critical software, data pipelines, and security-controlled applications in the Court sector of Vietnam. Creator of DuskAI (duskai.vn) — a modern AI workspace featuring RAG embeddings, vector search, and tool execution.'
                    : 'Lập trình viên Fullstack và Kỹ sư AI giàu kinh nghiệm xây dựng các hệ thống nghiệp vụ quy mô lớn, tải cao và quy trình tự động hóa bằng AI. Trực tiếp tham gia nghiên cứu, thiết kế và phát triển các phần mềm và hệ thống thông tin cốt lõi trong ngành Tòa án của nước Việt Nam, đòi hỏi bảo mật nghiêm ngặt và kiến trúc CSDL Oracle vững chắc. Tác giả nền tảng DuskAI (duskai.vn) tích hợp AI Agent, pipeline RAG, vector search và trực quan hóa dữ liệu.'
                }}
              </p>
            </section>

            <!-- Key Highlights -->
            <section class="cv-section">
              <h3 class="cv-section-title">// {{ locale === 'en' ? 'CORE COMPETENCIES & HIGHLIGHTS' : 'ĐIỂM NHẤN CHUYÊN MÔN' }}</h3>
              <ul class="cv-bullets">
                <li>
                  <strong>{{ locale === 'en' ? 'Vietnam Court Sector Systems:' : 'Hệ thống ngành Tòa án Việt Nam:' }}</strong>
                  {{
                    locale === 'en'
                      ? ' Architected, developed, and maintained core operational software and database management systems across nationwide judicial units.'
                      : ' Thiết kế, phát triển và vận hành các phần mềm, cơ sở dữ liệu nghiệp vụ phục vụ quản lý, điều hành và thống kê trong ngành Tòa án Việt Nam.'
                  }}
                </li>
                <li>
                  <strong>{{ locale === 'en' ? 'AI Engineering & Agentic Workflows:' : 'AI Engineering & Agentic Workflows:' }}</strong>
                  {{
                    locale === 'en'
                      ? ' Built DuskAI (duskai.vn) platform, implementing end-to-end RAG pipelines (ingestion, semantic chunking, Qdrant vector search) and MCP tool-calling agents.'
                      : ' Xây dựng nền tảng DuskAI (duskai.vn), triển khai pipeline RAG hoàn chỉnh (semantic chunking, embedding, Qdrant vector search) và AI Agent hỗ trợ gọi công cụ MCP.'
                  }}
                </li>
                <li>
                  <strong>{{ locale === 'en' ? 'Database & High-Scale Systems:' : 'Cơ sở dữ liệu & Hệ thống tải cao:' }}</strong>
                  {{
                    locale === 'en'
                      ? ' Deep expertise in Oracle Database, SQL Server, PostgreSQL, Redis caching, high-concurrency event loops, and microservices.'
                      : ' Thành thạo thiết kế CSDL lớn với Oracle Database, SQL Server, PostgreSQL, Redis cache, tối ưu truy vấn phức tạp và đảm bảo toàn vẹn dữ liệu.'
                  }}
                </li>
                <li>
                  <strong>{{ locale === 'en' ? 'IoT & Industrial Automation:' : 'IoT & Tự động hóa sản xuất:' }}</strong>
                  {{
                    locale === 'en'
                      ? ' Developed MES/ERP systems with voice-controlled micro-robots (ESP32) and industrial PLC connectivity for smart factory operations.'
                      : ' Xây dựng hệ thống MES/ERP kết hợp Robot mini điều khiển bằng giọng nói qua ESP32 và kết nối PLC giám sát dây chuyền sản xuất công nghiệp.'
                  }}
                </li>
              </ul>
            </section>

            <!-- Technical Skills Matrix -->
            <section class="cv-section">
              <h3 class="cv-section-title">// {{ locale === 'en' ? 'TECHNICAL SKILLS MATRIX' : 'DANH MỤC CÔNG NGHỆ' }}</h3>
              <div class="cv-skills-grid">
                <div class="cv-skill-card">
                  <div class="cv-skill-title">AI & Agentic Systems</div>
                  <div class="cv-skill-tags">
                    <span>AI Agent</span>
                    <span>MCP (Model Context Protocol)</span>
                    <span>RAG Pipeline</span>
                    <span>Vector Search (Qdrant)</span>
                    <span>Semantic Chunking</span>
                    <span>LLM Integration</span>
                  </div>
                </div>
                <div class="cv-skill-card">
                  <div class="cv-skill-title">Backend & APIs</div>
                  <div class="cv-skill-tags">
                    <span>Node.js</span>
                    <span>NestJS</span>
                    <span>ASP.NET Core</span>
                    <span>C#</span>
                    <span>RESTful API</span>
                    <span>WebSocket</span>
                    <span>Microservices</span>
                  </div>
                </div>
                <div class="cv-skill-card">
                  <div class="cv-skill-title">Frontend & Mobile</div>
                  <div class="cv-skill-tags">
                    <span>React</span>
                    <span>Next.js</span>
                    <span>Vue.js</span>
                    <span>TypeScript</span>
                    <span>Three.js</span>
                    <span>TailwindCSS</span>
                    <span>React Native</span>
                    <span>Electron</span>
                  </div>
                </div>
                <div class="cv-skill-card">
                  <div class="cv-skill-title">Databases & Infrastructure</div>
                  <div class="cv-skill-tags">
                    <span>Oracle Database</span>
                    <span>SQL Server</span>
                    <span>PostgreSQL</span>
                    <span>Redis</span>
                    <span>Qdrant</span>
                    <span>Docker</span>
                    <span>Git</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Featured Projects Brief -->
            <section class="cv-section">
              <h3 class="cv-section-title">// {{ locale === 'en' ? 'FEATURED ENTERPRISE PROJECTS' : 'DỰ ÁN TIÊU BIỂU' }}</h3>
              <div class="cv-project-items">
                <div class="cv-project-item">
                  <div class="cv-project-header">
                    <span class="cv-project-name">DuskAI (duskai.vn)</span>
                    <span class="cv-project-role">Lead Architect & Developer</span>
                  </div>
                  <p class="cv-project-desc">
                    {{
                      locale === 'en'
                        ? 'Next-gen AI workspace platform with RAG embedding pipelines, Qdrant vector retrieval, MCP tool calling, and DuskOffice with data visualization.'
                        : 'Nền tảng AI Workspace thế hệ mới tích hợp RAG embedding chuyên sâu, tìm kiếm vector Qdrant, kết nối MCP và DuskOffice với biểu đồ Recharts.'
                    }}
                  </p>
                </div>

                <div class="cv-project-item">
                  <div class="cv-project-header">
                    <span class="cv-project-name">{{ locale === 'en' ? 'Vietnam Court Sector Core Systems' : 'Hệ thống Phần mềm ngành Tòa án Việt Nam' }}</span>
                    <span class="cv-project-role">Core Fullstack Engineer</span>
                  </div>
                  <p class="cv-project-desc">
                    {{
                      locale === 'en'
                        ? 'Comprehensive case lifecycle management, statistics, and secure document workflow systems across court tiers with enterprise Oracle Database.'
                        : 'Phần mềm quản lý, thống kê và điều hành nghiệp vụ xuyên suốt các cấp Tòa án trên toàn quốc với kiến trúc CSDL Oracle chuẩn hóa và bảo mật cao.'
                    }}
                  </p>
                </div>

                <div class="cv-project-item">
                  <div class="cv-project-header">
                    <span class="cv-project-name">{{ locale === 'en' ? 'Manufacturing ERP & MES + Voice Robot' : 'Hệ thống ERP & MES Sản xuất + Robot giọng nói' }}</span>
                    <span class="cv-project-role">Fullstack & IoT Engineer</span>
                  </div>
                  <p class="cv-project-desc">
                    {{
                      locale === 'en'
                        ? 'Production execution system integrating speech-controlled ESP32 mini robots, live OEE tracking, and shop-floor scheduling.'
                        : 'Hệ thống điều hành sản xuất kết hợp robot mini giọng nói ESP32, giám sát năng suất OEE và điều độ dây chuyền thời gian thực.'
                    }}
                  </p>
                </div>

                <div class="cv-project-item">
                  <div class="cv-project-header">
                    <span class="cv-project-name">{{ locale === 'en' ? 'Textile Smart Warehouse (WMS)' : 'Quản lý Kho thông minh ngành Dệt may' }}</span>
                    <span class="cv-project-role">Fullstack Engineer</span>
                  </div>
                  <p class="cv-project-desc">
                    {{
                      locale === 'en'
                        ? 'Barcode/QR inventory tracking, automated bin routing, and fabric material allocation engine.'
                        : 'Hệ thống quản lý kho vận nguyên phụ liệu, cuộn vải bằng mã vạch/QR, truy vết xuất nhập tồn và định vị giá kệ tự động.'
                    }}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <!-- Footer -->
          <div class="cv-footer">
            <span class="cv-footer-text">Đỗ Văn Xuân • xuanco941@gmail.com • 0388530006 • duskai.vn</span>
            <button class="cv-footer-close" @click="closeCvModal">{{ locale === 'en' ? 'Close' : 'Đóng' }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.cv-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(3, 3, 8, 0.88);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.cv-modal {
  background: #0b0f19;
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 60px rgba(0, 243, 255, 0.15), 0 20px 40px rgba(0, 0, 0, 0.8);
  color: #e2e8f0;
  font-family: 'Urbanist', sans-serif;
  overflow: hidden;
}

.cv-header {
  padding: 24px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(180deg, rgba(0, 243, 255, 0.08) 0%, transparent 100%);
}

.cv-tag {
  font-family: 'ProFontWindows', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #00f3ff;
  display: inline-block;
  margin-bottom: 6px;
}

.cv-name {
  font-size: 28px;
  font-weight: 900;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.cv-role {
  font-size: 16px;
  color: #38bdf8;
  font-weight: 600;
  margin: 4px 0 0;
}

.cv-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cv-action-btn {
  font-family: 'ProFontWindows', monospace;
  font-size: 13px;
  padding: 8px 14px;
  border-radius: 8px;
  background: rgba(0, 243, 255, 0.12);
  border: 1px solid rgba(0, 243, 255, 0.4);
  color: #00f3ff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 243, 255, 0.25);
    border-color: #00f3ff;
  }
}

.cv-close-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    color: #ef4444;
  }
}

.cv-close-icon {
  width: 18px;
  height: 18px;
}

.cv-body {
  padding: 24px 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cv-quick-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.cv-info-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cv-info-label {
  font-size: 12px;
  color: #94a3b8;
  font-family: 'ProFontWindows', monospace;
}

.cv-info-value {
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
}

.cv-copy-link,
.cv-info-link {
  font-size: 14px;
  color: #38bdf8;
  text-decoration: none;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }

  &.highlight {
    color: #f43f5e;
    font-weight: 800;
  }
}

.cv-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.cv-stat-box {
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.06), rgba(121, 40, 202, 0.06));
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cv-stat-num {
  font-size: 28px;
  font-weight: 900;
  color: #00f3ff;
  line-height: 1;
}

.cv-stat-desc {
  font-size: 12px;
  color: #cbd5e1;
  margin-top: 4px;
  font-family: 'ProFontWindows', monospace;
}

.cv-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cv-section-title {
  font-family: 'ProFontWindows', monospace;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: #00f3ff;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  padding-bottom: 6px;
  margin: 0;
}

.cv-text {
  font-size: 14.5px;
  line-height: 1.65;
  color: #cbd5e1;
  margin: 0;
}

.cv-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    position: relative;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.6;
    color: #cbd5e1;

    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: #00f3ff;
      font-weight: bold;
    }

    strong {
      color: #ffffff;
    }
  }
}

.cv-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.cv-skill-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cv-skill-title {
  font-size: 13px;
  font-weight: 700;
  color: #38bdf8;
  font-family: 'ProFontWindows', monospace;
}

.cv-skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  span {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 11.5px;
    color: #e2e8f0;
  }
}

.cv-project-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cv-project-item {
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid #00f3ff;
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cv-project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.cv-project-name {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.cv-project-role {
  font-size: 12px;
  color: #94a3b8;
  font-family: 'ProFontWindows', monospace;
}

.cv-project-desc {
  font-size: 13px;
  line-height: 1.5;
  color: #cbd5e1;
  margin: 0;
}

.cv-footer {
  padding: 16px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
}

.cv-footer-text {
  font-size: 12px;
  color: #64748b;
  font-family: 'ProFontWindows', monospace;
}

.cv-footer-close {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 6px 16px;
  color: #ffffff;
  font-family: 'ProFontWindows', monospace;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    color: #000000;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media print {
  .cv-backdrop {
    position: static;
    background: #ffffff;
    color: #000000;
    padding: 0;
  }

  .cv-modal {
    box-shadow: none;
    border: none;
    max-height: none;
    max-width: 100%;
    color: #000000;
    background: #ffffff;
  }

  .cv-controls,
  .cv-footer {
    display: none;
  }
}
</style>
