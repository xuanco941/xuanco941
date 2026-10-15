import img0 from "../../../assets/images/architecture/erp-mes-main.jpg";
import img1 from "../../../assets/images/architecture/erp-mes-telemetry.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "ERP & MES Sản xuất",
  theme: "dark",
  tags: ["erp", "react", "node", "iot", "websockets"],
  videoBorder: false,
  description:
    "Hệ thống điều hành sản xuất MES và hoạch định nguồn lực ERP tích hợp Robot mini giọng nói sử dụng ESP32.<br/><br/>Hệ thống số hóa toàn diện quy trình sản xuất công nghiệp, điều độ lệnh sản xuất, theo dõi trạng thái thiết bị thời gian thực qua WebSockets và nhận diện chỉ thị giọng nói điều tiết dây chuyền thông minh.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Kiến trúc Tổng thể Hệ thống ERP & MES Tích hợp IoT Robotics",
        caption: "Kiến trúc Điều hành Sản xuất MES, ERP & Robot AGV Giọng nói",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Quy trình Telemetry xưởng sản xuất và IoT ESP32",
        caption: "Quy trình WebSockets Telemetry, Giám sát OEE & Điều khiển Robot ESP32",
      },
    },
  ],
} as const satisfies ProjectContent;
