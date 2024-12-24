import { useState } from "react";
import img1 from "@assets/images/img_1.jpg";
import img2 from "@assets/images/img_2.jpg";
import img3 from "@assets/images/img_3.jpg";
import img4 from "@assets/images/img_4.jpg";
import img5 from "@assets/images/img_5.jpg";

import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./About.css";

const projects = [
  {
    id: 1,
    image: img2,
    title: "Khu đô thị mới Sun Urban City",
    address:
      "Khu đô thị Bắc Châu Giang, phường Lam Hạ, thành phố Phủ Lý, tỉnh Hà Nam.",
    descriptions:
      "Dự án Sun Urban City Hà Nam tọa lạc tại vị trí trung tâm mới của thành phố Phủ Lý, là một dự án tâm huyết của tập đoàn Sun Group, Sun Urban City hứa hẹn sẽ thiết lập một chuẩn mực mới về bất động sản cao cấp tại tỉnh Hà Nam.",
  },
  {
    id: 2,
    image: img1,
    title: "Vinhomes Global Gate",
    address: "Đường Trường Sa, xã Đông Hội, huyện Đông Anh, Hà Nội.",
    descriptions:
      "Dự án Vinhomes Global Gate Nằm sát cạnh Thành Cổ Loa vốn là vùng đất vượng khí được lựa chọn là kinh đô của nước Âu Lạc - là đô thị cổ đầu tiên của đất nước ta, Vinhomes Global Gate được bao bọc bởi 4 dòng sông trù phú.",
  },
  {
    id: 3,
    image: img3,
    title: "Căn hộ chung cư Citi Alto",
    address: "Đường Nguyễn Thị Định, phường Cát Lái, quận 2, TP.HCM.",
    descriptions:
      "Citi Alto nằm trong trung tâm khu đô thị Cát Lái, phường Cát Lái, quận 2, TP.HCM. Từ căn hộ, cư dân có thể kết nối đến chuỗi khu trung tâm thương mại như Mega Market, BigC, Vincom Mega Mall, công viên trung tâm khu đô thị.",
  },
  {
    id: 4,
    image: img4,
    title: "Căn hộ chung cư Avatar Thủ Đức",
    address:
      "Đường Vành Đai 2, phường Trường Thọ, thành phố Thủ Đức, thành phố Hồ Chí Minh.",
    descriptions:
      "Avatar Thủ Đức có quy mô gần 3,3 ha, thiết kế theo mô hình khu căn hộ cao cấp. Dự án gồm 6 tòa tháp từ 28 đến 33 tầng, cung cấp 2.400 sản phẩm. Với vị trí đắc địa, dự án mang đến không gian sống lý tưởng cùng tiện ích như hồ bơi, phòng gym.",
  },
  {
    id: 5,
    image: img5,
    title: "Căn hộ chung cư Raemian",
    address: "Đường DN10, phường Đông Hưng Thuận, Quận 12, TP.HCM.",
    descriptions:
      "Căn hộ Raemian Đông Thuận Quận 12 tọa lạc tại vị trí đắc địa ở trung tâm khu dân cư An Sương. Dự án có quy mô 3,3 ha, gồm 2 block cao 15 tầng với các phòng ngủ có diện tích đa dạng, phù hợp cho nhu cầu sinh sống của nhiều gia đình khác nhau.",
  },
];

const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

function AboutList() {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Lấy các mục hiện tại
  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="section section-properties">
      <div className="container">
        <div className="row">
          {/* Danh sách tài sản bên trái */}

          {getCurrentProperties().map((property) => (
            <div
              className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
              key={property.id}
            >
              <div className="property-item mb-30">
                <a href={`/about/${property.id}`} className="img">
                  <img
                    src={property.image}
                    alt="Property"
                    className="img-fluid"
                  />
                </a>
                <div className="property-content">
                  <div className="title mb-2">
                    <span>{property.title}</span>
                  </div>
                  <div>
                    <span className="d-block mb-2 text-black-50">
                      {property.address}
                    </span>
                    <span
                      className="city d-block mb-3"
                      style={{
                        fontSize: "14px",
                        fontWeight: "200",
                        textAlign: "justify",
                      }}
                    >
                      {property.descriptions}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row align-items-center py-5">
          <div className="col-lg-12 text-center">
            <div className="custom-pagination">
              {[...Array(totalPages)].map((_, index) => (
                <a
                  href="#"
                  key={index + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutList;
