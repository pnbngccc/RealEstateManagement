import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "../../../components/Slider/Slider";

function AboutList() {
  const { id } = useParams();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyInfo = async () => {
      try {
        const propertyResponse = await axios.get(
          `http://localhost:5000/api/news/${id}`
        );

        if (propertyResponse.data.success) {
          setAbout(propertyResponse.data.data);
        } else {
          throw new Error("Không tìm thấy tài sản.");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError(err.response?.data?.message || "Lỗi khi lấy dữ liệu tài sản.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyInfo();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!about) {
    return <div>Tài sản không tồn tại hoặc dữ liệu bị lỗi.</div>;
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
    <div className="container-detail container my-4">
      <div className="details">
        <div className="wrapper">
          <Slider images={about.images} />
          <div className="info">
            <div className="d-flex justify-content-between">
              <div className="post">
                <h1 className="h4">{about.title}</h1>
                <div className="d-flex align-items-center">
                  <span>
                    {" "}
                    Được đăng bởi{" "}
                    {about.idAuthor?.username || "Người dùng không xác định"}
                  </span>
                </div>
                <div className="wrapper">
                  Cập nhật lần cuối vào: {formatDate(about.published_date)}
                </div>
              </div>
            </div>
            <div className="custom">{about.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutList;
