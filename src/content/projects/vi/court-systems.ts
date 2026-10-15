import img0 from "../../../assets/images/architecture/court-main.jpg";
import img1 from "../../../assets/images/architecture/court-case-lifecycle.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Hệ thống Phần mềm ngành Tòa án",
  theme: "dark",
  tags: ["dotnet", "oracle", "vue", "security"],
  videoBorder: false,
  description:
    "Nghiên cứu, phát triển và vận hành các phần mềm và hệ thống thông tin cốt lõi trong ngành Tòa án của nước Việt Nam.<br/><br/>Hệ thống phục vụ công tác tra cứu, thống kê, kiểm soát tiến độ xử lý nghiệp vụ, số hóa và lưu chuyển hồ sơ chứng cứ trên quy mô rộng. Được thiết kế với kiến trúc dữ liệu Oracle chuẩn hóa, bảo mật cấp cao, phân quyền đa tầng và đảm bảo tính sẵn sàng, toàn vẹn dữ liệu cho toàn bộ ngành.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Kiến trúc Hệ thống Tòa án & Luồng Dữ liệu CSDL Oracle",
        caption: "Kiến trúc Tổng thể Hệ thống Thông tin & CSDL ngành Tòa án",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Quy trình nghiệp vụ tố tụng tư pháp Tòa án",
        caption: "Quy trình giải quyết vụ án: Tiếp nhận đơn, Thụ lý, Phân công Thẩm phán & Xét xử",
      },
    },
  ],
} as const satisfies ProjectContent;
