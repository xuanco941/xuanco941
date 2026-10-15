import img0 from "../../../assets/images/architecture/edtech-main.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Nền tảng Ôn thi trực tuyến (ThiPro)",
  theme: "dark",
  tags: ["react", "node", "redis", "javascript"],
  videoBorder: false,
  live: "https://congchuc.online",
  description:
    "Nền tảng học tập, thi thử và ôn luyện trắc nghiệm trực tuyến (congchuc.online, ThiPro).<br/><br/>Hệ thống được thiết kế chịu tải cao với hàng chục ngàn người dùng đồng thời, phân tích kết quả làm bài theo thời gian thực, lưu trữ kết quả qua Redis cache và tự động tạo đề thi ngẫu nhiên theo ma trận kiến thức.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Kiến trúc Nền tảng Thi Trực tuyến Tải cao ThiPro",
        caption: "Kiến trúc Hệ thống: Ingress Edge, Session Điều phối Thi, Redis Ma trận & Chấm điểm Tự động",
      },
    },
  ],
} as const satisfies ProjectContent;
