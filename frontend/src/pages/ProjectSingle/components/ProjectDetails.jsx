import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chat from "@assets/images/chat.png";
import pin from "@assets/images/pin.png";
import axios from "axios";
import MyMap from "../../../components/Map/Map";
import Slider from "../../../components/Slider/Slider";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchPropertyInfo = async () => {
      try {
        const propertyResponse = await axios.get(
          `http://localhost:5000/api/project/${id}`
        );

        if (propertyResponse.data.success) {
          setProject(propertyResponse.data.data);
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

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (project && project.address) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              project.address
            )}`
          );

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error(
              "Không tìm thấy tọa độ cho địa chỉ:",
              project.address
            );
          }
        } catch (err) {
          console.error("Lỗi khi lấy tọa độ:", err);
        }
      }
    };

    fetchCoordinates();
  }, [project]);

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

  if (!project) {
    return <div>Tài sản không tồn tại hoặc dữ liệu bị lỗi.</div>;
  }

  return (
    <div className="container-detail container my-4">
      <div className="details">
        <div className="wrapper">
          {/* Sử dụng component Slider cho mảng hình ảnh */}
          <Slider images={project.images} />
          <div className="info">
            <div className="d-flex justify-content-between">
              <div className="post">
                <h1 className="h4">{project.title}</h1>
                <div className="d-flex align-items-center">
                  <img src={pin} alt="" className="me-2 customer-pin" />
                  <span>{project.address}</span>
                </div>
              </div>
            </div>
            <div className="custom">{project.description}</div>
          </div>
        </div>
      </div>

      <div className="features mt-4">
        <div className="user d-flex align-items-center">
          <img
            src={project.idUser?.avatar || "/default-user.png"}
            alt="Người dùng"
            className="rounded-circle me-2 customer-img"
            style={{ width: "65px", height: "65px" }}
          />
          <span>{project.idUser?.username}</span>
        </div>

        <div className="wrapper">
          <p className="h5">Chi tiết</p>

          <div className="d-flex mt-2">
            {project.building && (
              <span className="custom-spacing" style={{ marginRight: "10%" }}>
                <strong>
                  <i className="fa-regular fa-building"></i>
                </strong>{" "}
                {project.building}
              </span>
            )}
            {project.apartment && (
              <span className="custom-spacing" style={{ marginRight: "10%" }}>
                <strong>
                  <i className="fa-solid fa-house"></i>
                </strong>{" "}
                {project.apartment}
              </span>
            )}
            <span>
              <strong>{project.area} ha</strong>
            </span>
          </div>

          <p className="h5">Tọa lạc</p>
          <div className="map_container mb-3">
            {position && (
              <MyMap
                position={{ lat: position[0], lng: position[1] }}
                popupText={project.address}
              />
            )}
          </div>

          <div className="d-flex controls">
            <button className="customer-button">
              <img
                src={chat}
                alt=""
                className="me-1"
                style={{ width: "10px", height: "10px" }}
              />
              <a href="mailto:RealEstateManagement@gmail.com" >
                    Liên hệ lại tôi
                  </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
