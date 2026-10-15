import img0 from "../../../assets/images/architecture/warehouse-main.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Quản lý Kho thông minh",
  theme: "dark",
  tags: ["vue", "nestjs", "postgresql", "redis"],
  videoBorder: false,
  description:
    "Hệ thống quản lý kho vận thông minh (WMS) cho ngành dệt may & may mặc.<br/><br/>Hỗ trợ định danh cuộn vải, nguyên phụ liệu bằng mã vạch/QR code, kiểm soát vị trí giá kệ tự động, cảnh báo mức tồn an toàn và truy vết toàn diện lịch sử luân chuyển vật tư hàng hóa.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Kiến trúc Quản lý Kho Vận & Luân chuyển Hàng hóa Thông minh",
        caption: "Kiến trúc Hệ thống WMS: Nhập kho, Phân vùng Kệ 3D, Cache Redis & Dashboard Báo cáo",
      },
    },
  ],
} as const satisfies ProjectContent;
