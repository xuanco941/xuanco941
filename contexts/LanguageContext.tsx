import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'vi';

export const translations = {
    en: {
        hero: {
            greeting: "HI, I'M XUAN",
            role: "FULLSTACK DEVELOPER",
            tagline: "Building Digital Experiences"
        },
        about: {
            title: "ABOUT ME",
            subtitle: "// WHO I AM",
            description: "I focus on building scalable full-stack applications using modern technologies. My stack includes React, Node.js, ASP.NET, and cloud infrastructure.\n\nCreating elegant solutions for complex problems is my passion.",
            details: "Hometown: Ninh Binh\nCurrent Residence: Hanoi\nWork: IT Department - Supreme Court"
        },
        skills: {
            title: "TECH STACK",
            subtitle: "// MY SKILLS"
        },
        projects: {
            title: "PROJECTS",
            subtitle: "// MY WORK",
            view: "VIEW PROJECT →",
            items: [
                { title: "ERP & MES System", description: "Manufacturing execution system with robot integration and resource planning." },
                { title: "Warehouse Management", description: "Inventory management system for garment and textile industry." },
                { title: "Smart Doc Management", description: "School document management system integrated with AI features." },
                { title: "IVF Quantity Management", description: "Specialized management system for IVF processes and resources." },
                { title: "Industrial Machine IoT", description: "Production machinery management system integrating with PLC connections." },
                { title: "HTML5 Games", description: "Interactive web games built with Canvas and WebGL." },
                { title: "E-commerce Platform", description: "Full-featured online store with payment integration and order management." },
                { title: "Freelance Projects", description: "Various other freelance projects for diverse clients." }
            ]
        },
        contact: {
            title: "LET'S CONNECT",
            subtitle: "Ready to bring your ideas to life",
            email: "EMAIL",
            cta: "Available for freelance projects and full-time opportunities.\nLet's build something amazing together!",
            stats: {
                exp: "Years Experience",
                proj: "Projects Completed",
                sat: "Client Satisfaction"
            }
        },
        ui: {
            nav: {
                home: "HOME",
                about: "ABOUT ME",
                tech: "TECH STACK",
                projects: "PROJECTS",
                contact: "CONTACT"
            },
            subtitles: {
                home: "Welcome",
                about: "Who I Am",
                tech: "Skills",
                projects: "My Work",
                contact: "Get in Touch"
            },
            scroll: "SCROLL TO EXPLORE",
            viewing: "VIEWING",
            section: "SECTION"
        }
    },
    vi: {
        hero: {
            greeting: "XIN CHÀO, TÔI LÀ XUÂN",
            role: "LẬP TRÌNH VIÊN FULLSTACK",
            tagline: "Kiến tạo Trải nghiệm Số"
        },
        about: {
            title: "GIỚI THIỆU",
            subtitle: "// TÔI LÀ AI",
            description: "Tôi tập trung xây dựng các ứng dụng full-stack mở rộng bằng công nghệ hiện đại. Stack bao gồm React, Node.js, ASP.NET và cloud.\n\nĐam mê tạo ra giải pháp tinh tế cho các vấn đề phức tạp.",
            details: "Quê quán: Ninh Bình\nNơi ở: Hà Nội\nĐang làm việc tại: Cục CNTT - Tòa án tối cao"
        },
        skills: {
            title: "CÔNG NGHỆ",
            subtitle: "// KỸ NĂNG"
        },
        projects: {
            title: "DỰ ÁN",
            subtitle: "// CÔNG VIỆC",
            view: "XEM DỰ ÁN →",
            items: [
                { title: "Hệ thống ERP & MES", description: "Hệ thống điều hành sản xuất tích hợp robot và hoạch định nguồn lực." },
                { title: "Quản lý Kho Hàng", description: "Hệ thống quản lý kho cho ngành may mặc và dệt may." },
                { title: "Quản lý Tài Liệu", description: "Phần mềm quản lý tài liệu trường học tích hợp các tính năng AI." },
                { title: "Quản lý IVF", description: "Hệ thống quản lý định lượng và quy trình IVF chuyên biệt." },
                { title: "Quản lý Thiết bị & PLC", description: "Quản lý thiết bị máy móc trong công nghiệp sản xuất có kết nối PLC." },
                { title: "Game HTML5", description: "Các game web tương tác xây dựng bằng Canvas và WebGL." },
                { title: "Web Bán Hàng", description: "Nền tảng thương mại điện tử trọn gói với tích hợp thanh toán." },
                { title: "Và nhiều dự án khác...", description: "Các dự án freelance đa dạng." }
            ]
        },
        contact: {
            title: "LIÊN HỆ",
            subtitle: "Sẵn sàng hiện thực hóa ý tưởng",
            email: "EMAIL",
            cta: "Sẵn sàng cho dự án freelance và toàn thời gian.\nHãy cùng tạo nên điều tuyệt vời!",
            stats: {
                exp: "Năm Kinh Nghiệm",
                proj: "Dự Án Đã Làm",
                sat: "Sự Hài Lòng"
            }
        },
        ui: {
            nav: {
                home: "TRANG CHỦ",
                about: "VỀ TÔI",
                tech: "CÔNG NGHỆ",
                projects: "DỰ ÁN",
                contact: "LIÊN HỆ"
            },
            subtitles: {
                home: "Chào mừng",
                about: "Tôi là ai",
                tech: "Kỹ năng",
                projects: "Công việc",
                contact: "Liên lạc"
            },
            scroll: "CUỘN ĐỂ KHÁM PHÁ",
            viewing: "ĐANG XEM",
            section: "PHẦN"
        }
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.en;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'vi',
    setLanguage: () => { },
    t: translations.vi
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('vi');

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};
