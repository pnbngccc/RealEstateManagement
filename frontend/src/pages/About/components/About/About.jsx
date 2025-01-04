import { useState, useEffect } from "react";
import axios from "axios";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./About.css";

const itemsPerPage = 6;

function ProjectList() {
  const [abouts, setAbouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(`http://localhost:5000/api/news`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token qua header
        },
      });
      if (response.data.success && Array.isArray(response.data.data)) {
        setAbouts(response.data.data);
      } else {
        setError("Không thể tải dữ liệu dự án.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu dự án:", err);
      setError("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(abouts.length / itemsPerPage);

  const getCurrentProjects = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return abouts.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }
  // Hàm để định dạng ngày
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };
  return (
    <div className="section section-properties">
      <div className="container">
        <div className="row">
          {getCurrentProjects().map((about) => (
            <div
              className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
              key={about._id}
            >
              <div className="property-item mb-30">
                <a href={`/about/${about.id}`} className="img">
                  <img
                    src={
                      about.images && about.images.length > 0
                        ? about.images[0]
                        : "default-image.jpg"
                    } // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
                    alt="About"
                    className="img-fluid"
                  />
                </a>
                <div className="property-content">
                  <div className="price mb-2">
                    <span>{about.title}</span>
                  </div>
                  <div>
                    <span className="d-block mb-2 text-black-50">
                      Cập nhật lần cuối vào: {formatDate(about.published_date)}{" "}
                    </span>
                    <span
                      className="city d-block mb-3"
                      style={{
                        fontSize: "14px",
                        fontWeight: "200",
                        textAlign: "justify",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {about.description}
                    </span>

                    <a
                      href={`/about/${about._id}`}
                      className="btn btn-primary py-2 px-3"
                    >
                      Xem chi tiết
                    </a>
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
                  key={`page-${index + 1}`}
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

export default ProjectList;
