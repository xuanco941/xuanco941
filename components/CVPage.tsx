import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownToLine,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Workflow,
} from 'lucide-react';

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const profile = {
  name: 'Đỗ Văn Xuân',
  role: 'Lập trình viên Fullstack',
  headline:
    'Xây dựng hệ thống nghiệp vụ, xử lý dữ liệu và tự động hóa công việc bằng AI. Có kinh nghiệm với ứng dụng bảo mật cao, cơ sở dữ liệu lớn và các sản phẩm phục vụ vận hành nội bộ.',
  location: 'Hà Nội',
  hometown: 'Ninh Bình',
  email: 'xuanco941@gmail.com',
  phone: '0388**0006',
  github: 'https://github.com/xuanco941',
  current: 'Cục Công nghệ thông tin - Tòa án tối cao',
};

const stats = [
  ['4+', 'năm kinh nghiệm'],
  ['30+', 'dự án đã tham gia'],
  ['AI + Data', 'tự động hóa, phát triển phần mềm nhanh'],
];

const stackGroups = [
  ['Frontend', ['React', 'Next.js', 'Vue', 'React Native', 'Electron']],
  ['Backend', ['Node.js', 'NestJS', 'ASP.NET', 'C#', 'REST API', "Socket"]],
  ['Database & Data', ['Oracle Database', 'SQL Server', 'PostgreSQL', 'Redis', 'Firebase', 'Qdrant']],
  ['Workflow & Security', ['Git', 'ERP/MES', 'Tự động hóa bằng AI', 'Thống kê dữ liệu', 'Kinh doanh', "Tools", "Ứng dụng di động"]],
] as const;

const highlights = [
  'Phân tích yêu cầu, thiết kế database và triển khai module nghiệp vụ từ đầu đến cuối.',
  'Xử lý, tổng hợp và thống kê dữ liệu phục vụ báo cáo, quản trị và ra quyết định.',
  'Xây dựng các hệ thống có yêu cầu bảo mật, phân quyền và kiểm soát dữ liệu chặt chẽ.',
  'Tự động hóa quy trình làm việc bằng AI để giảm thao tác thủ công và tăng tốc xử lý nghiệp vụ.',
  'Xây dựng phần mềm kinh doanh, quảng cáo, bán hàng, quản lý hay tool hỗ trợ vận hành cực nhanh và hiệu quả.'
];

const projects = [
  ['Quản lý án toàn trình (qlta.toaan.gov.vn)', 'Hệ thống theo dõi, quản lý quy trình xử lý án theo vòng đời nghiệp vụ, phục vụ tra cứu và điều hành.', 'Tòa án'],
  ['Thống kê dữ liệu', 'Tổng hợp, chuẩn hóa và trực quan hóa dữ liệu phục vụ báo cáo vận hành và quản trị.', 'Data'],
  ['Ứng dụng học tập, ôn thi', 'Nền tảng học tập và ôn luyện trực tuyến, tiêu biểu như congchuc.online, ThiPro.', 'EdTech'],
  ['Robot mini điều tiết công nghiệp bằng giọng nói (ESP32)', 'Ứng dụng robot thông minh hỗ trợ điều tiết và quản lý quy trình sản xuất.', 'Tự động hóa'],
  ['ERP & MES System', 'Hệ thống điều hành sản xuất, hoạch định nguồn lực, theo dõi tiến độ và tích hợp robot.', 'Sản xuất'],
  ['Warehouse Management', 'Quản lý tồn kho, nhập xuất, truy vết hàng hóa cho ngành may mặc và dệt may.', 'Kho vận'],
  ['Smart Document Management', 'Quản lý tài liệu trường học, tìm kiếm nhanh và tích hợp các tính năng AI hỗ trợ xử lý.', 'AI Docs'],
  ['Industrial Machine IoT', 'Quản lý thiết bị sản xuất, theo dõi trạng thái máy và kết nối PLC trong nhà máy.', 'IoT'],
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function CVPage() {
  return (
    <main className="page-shell">
      <div className="ambient-layer" aria-hidden="true">
        <div className="circuit-grid" />
        <motion.div
          className="glow glow-cyan"
          animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="glow glow-coral"
          animate={{ x: [0, -24, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="site-wrap">
        <nav className="top-nav">
          <a href={basePath} className="brand">
            <span>DX</span>
            Portfolio
          </a>
          <div className="nav-links">
            <a href="#profile">Hồ sơ</a>
            <a href="#skills">Kỹ năng</a>
            <a href="#projects">Dự án</a>
            <a href="#contact">Liên hệ</a>
          </div>
          <div className="top-actions">
            <a href={basePath} className="switch-page-link">Trang 3D</a>
            <button onClick={() => window.print()} className="download-btn">
              <ArrowDownToLine size={17} />
              Tải PDF
            </button>
          </div>
        </nav>

        <article id="top" className="cv-sheet">
          <header className="hero">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="hero-copy">
              <div className="signal-line">
                <span>Fullstack</span>
                <span>/</span>
                <span>Dữ liệu</span>
                <span>/</span>
                <span>Tự động hóa AI</span>
              </div>
              <h1>{profile.name}</h1>
              <p className="role">{profile.role}</p>
              <p className="headline">{profile.headline}</p>

              <div className="info-grid">
                <Info icon={<MapPin size={16} />} text={`${profile.location} | Quê quán: ${profile.hometown}`} />
                <Info icon={<BriefcaseBusiness size={16} />} text={profile.current} />
                <Info icon={<Mail size={16} />} text={profile.email} />
                <Info icon={<Phone size={16} />} text={profile.phone} />
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="portrait-panel"
            >
              <div className="portrait">
                <img src={`${basePath}avt.png`} alt="Đỗ Văn Xuân" />
              </div>
              <div className="stats-grid">
                {stats.map(([value, label]) => (
                  <div className="stat" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </header>

          <div className="content-grid">
            <aside className="left-column">
              <Section id="profile" title="Hồ sơ ngắn gọn" icon={<Sparkles size={18} />}>
                <p>
                  Developer thiên về hệ thống nghiệp vụ, dữ liệu, các phần mềm xử lý tự động bằng AI. Tôi có thể làm việc từ backend,
                  database đến frontend, ưu tiên tốc độ, hiệu năng, khả năng mở rộng và trải nghiệm sử dụng rõ ràng.
                </p>
              </Section>

              <Section id="skills" title="Công nghệ chính" icon={<Code2 size={18} />}>
                <div className="stack-list">
                  {stackGroups.map(([title, items]) => (
                    <div key={title} className="stack-group">
                      <h3>{title}</h3>
                      <div className="chip-row">
                        {items.map((item) => (
                          <span className="chip" key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="contact" title="Liên hệ" icon={<Mail size={18} />}>
                <div className="contact-list">
                  <a href={`mailto:${profile.email}`}><Mail size={15} /> {profile.email}</a>
                  <a href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> github.com/xuanco941</a>
                  <span><Phone size={15} /> {profile.phone}</span>
                </div>
              </Section>

              <section className="cta-panel">
                <div>
                  <h2>Sẵn sàng trao đổi cơ hội phù hợp</h2>
                  <p>
                    Phù hợp với vị trí Fullstack Developer, Data-oriented Developer, công ty non-tech cần freelancer xây dựng phần mềm nhanh có tính hoàn thiện cao hoặc các team xây dựng hệ thống nghiệp vụ bảo mật, tự động hóa và xử lý dữ liệu.
                  </p>
                </div>
                <a href={`mailto:${profile.email}`}>
                  Liên hệ <ExternalLink size={16} />
                </a>
              </section>
            </aside>

            <section className="right-column">
              <Section title="Điểm mạnh trong công việc" icon={<Workflow size={18} />}>
                <div className="highlight-list">
                  {highlights.map((item, index) => (
                    <div key={item} className="highlight">
                      <span>{index + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="projects" title="Dự án tiêu biểu" icon={<BriefcaseBusiness size={18} />}>
                <div className="project-grid">
                  {projects.map(([name, detail, tag]) => (
                    <article className="project-card" key={name}>
                      <div className="project-head">
                        <h3>{name}</h3>
                        <span>{tag}</span>
                      </div>
                      <p>{detail}</p>
                    </article>
                  ))}
                </div>
              </Section>

            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="info-item">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id?: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="cv-section">
      <div className="section-title">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default CVPage;
