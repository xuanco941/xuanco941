import React, { createContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'vi';

const vietnamese = {
    hero: {
        greeting: "XIN CHÀO, TÔI LÀ XUÂN",
        role: "LẬP TRÌNH VIÊN FULLSTACK",
        tagline: "Kiến tạo trải nghiệm số"
    },
    about: {
        title: "GIỚI THIỆU",
        subtitle: "// TÔI LÀ AI",
        description: "Tôi tập trung xây dựng các ứng dụng full-stack có khả năng mở rộng bằng công nghệ hiện đại. Stack chính gồm React, Node.js, NestJS, ASP.NET và database.\n\nTôi thích biến các bài toán nghiệp vụ phức tạp thành sản phẩm rõ ràng, dễ dùng và dễ bảo trì.",
        details: "Quê quán: Ninh Bình\nNơi ở hiện tại: Hà Nội\nĐang làm việc tại: Cục CNTT - Tòa án tối cao"
    },
    skills: {
        title: "CÔNG NGHỆ",
        subtitle: "// KỸ NĂNG"
    },
    projects: {
        title: "DỰ ÁN",
        subtitle: "// SẢN PHẨM ĐÃ LÀM",
        view: "XEM DỰ ÁN →",
        items: [
            { title: "Hệ thống ERP & MES", description: "Hệ thống điều hành sản xuất tích hợp robot và hoạch định nguồn lực." },
            { title: "Quản lý kho hàng", description: "Hệ thống quản lý kho cho ngành may mặc và dệt may." },
            { title: "Quản lý tài liệu thông minh", description: "Phần mềm quản lý tài liệu trường học tích hợp các tính năng AI." },
            { title: "Quản lý IVF", description: "Hệ thống quản lý định lượng và quy trình IVF chuyên biệt." },
            { title: "Quản lý thiết bị & PLC", description: "Quản lý thiết bị máy móc trong công nghiệp sản xuất có kết nối PLC." },
            { title: "Game HTML5", description: "Các game web tương tác xây dựng bằng Canvas và WebGL." },
            { title: "Web bán hàng", description: "Nền tảng thương mại điện tử trọn gói với tích hợp thanh toán." },
            { title: "Dự án freelance", description: "Nhiều dự án freelance đa dạng cho các nhu cầu khác nhau." }
        ]
    },
    contact: {
        title: "LIÊN HỆ",
        subtitle: "Sẵn sàng hiện thực hóa ý tưởng",
        email: "EMAIL",
        cta: "Sẵn sàng cho dự án freelance và cơ hội toàn thời gian.\nHãy cùng tạo nên sản phẩm hữu ích!",
        stats: {
            exp: "Năm kinh nghiệm",
            proj: "Dự án đã làm",
            sat: "Tập trung chất lượng"
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
            projects: "Sản phẩm",
            contact: "Liên lạc"
        },
        scroll: "CUỘN ĐỂ KHÁM PHÁ",
        viewing: "ĐANG XEM",
        section: "PHẦN"
    }
};

export const translations = {
    en: vietnamese,
    vi: vietnamese
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof vietnamese;
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
