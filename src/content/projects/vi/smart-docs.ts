import img0 from "../../../assets/images/architecture/smart-docs-main.svg";
import type { ProjectContent } from "../../types";

export default {
  title: "Smart Document Management",
  theme: "dark",
  tags: ["python", "rag", "react", "ai"],
  videoBorder: false,
  description:
    "Phần mềm quản lý tài liệu thông minh tích hợp công nghệ AI trích xuất và tra cứu ngữ nghĩa.<br/><br/>Hỗ trợ các trường học và tổ chức số hóa hàng ngàn văn bản, tài liệu, giáo án. Tích hợp OCR nhận diện văn bản tiếng Việt chuẩn xác và hệ thống tìm kiếm vector ngữ nghĩa giúp tìm kiếm tài liệu theo ý định thay vì từ khóa cố định.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Kiến trúc Quản lý Tài liệu Thông minh & Pipeline OCR AI",
        caption: "Kiến trúc Hệ thống: OCR tiếng Việt, Cắt đoạn Ngữ nghĩa & Tìm kiếm Vector Qdrant",
      },
    },
  ],
} as const satisfies ProjectContent;
