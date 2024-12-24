// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import chat from "@assets/images/chat.png";
// import save from "@assets/images/save.png";
// import pin from "@assets/images/pin.png";
// import "./Page.css";
// import axios from "axios";
// import MyMap from "../../../components/Map/Map";
// import Slider from "../../../components/Slider/Slider";
// import PropertyDescriptions from "./Data";

// function PropertyDetail() {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [propertyDetails, setPropertyDetails] = useState([]);
//   const [position, setPosition] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favoriteId, setFavoriteId] = useState(null); // Thêm dòng này
//   useEffect(() => {
//     const fetchPropertyInfo = async () => {
//       try {
//         const propertyResponse = await axios.get(
//           `http://localhost:5000/api/property/${id}`
//         );

//         if (propertyResponse.data.success) {
//           setProperty(propertyResponse.data.data);
//         } else {
//           throw new Error("Không tìm thấy tài sản.");
//         }

//         const detailsResponse = await axios.get(
//           `http://localhost:5000/api/property-detail`
//         );

//         if (detailsResponse.data.success) {
//           setPropertyDetails(detailsResponse.data.data);
//         } else {
//           throw new Error("Không thể tải chi tiết tài sản.");
//         }
//       } catch (err) {
//         console.error("Lỗi khi lấy dữ liệu:", err);
//         setError(err.message || "Lỗi khi lấy dữ liệu tài sản.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyInfo();
//   }, [id]);

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       if (property && property.address) {
//         try {
//           const response = await axios.get(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//               property.address
//             )}`
//           );

//           if (response.data.length > 0) {
//             const { lat, lon } = response.data[0];
//             setPosition([parseFloat(lat), parseFloat(lon)]);
//           } else {
//             console.error(
//               "Không tìm thấy tọa độ cho địa chỉ:",
//               property.address
//             );
//           }
//         } catch (err) {
//           console.error("Lỗi khi lấy tọa độ:", err);
//         }
//       }
//     };

//     fetchCoordinates();
//   }, [property]);
//   console.log("favoriteId:", favoriteId);
//   const toggleFavorite = async () => {
//     if (!property) return;

//     try {
//       if (isFavorite) {
//         // Kiểm tra nếu favoriteId không hợp lệ
//         if (!favoriteId) {
//           alert("Không tìm thấy ID yêu thích để xóa.");
//           return;
//         }

//         // Nếu đang yêu thích, thực hiện yêu cầu xóa
//         const response = await axios.delete(
//           `http://localhost:5000/api/favorite/${favoriteId}`,
//           {
//             withCredentials: true,
//           }
//         );

//         if (response.data.success) {
//           alert("Đã xóa khỏi danh sách yêu thích!");
//           setIsFavorite(false);
//           setFavoriteId(null); // Đặt lại ID yêu thích sau khi xóa
//         } else {
//           alert("Lỗi khi xóa tài sản khỏi danh sách yêu thích.");
//         }
//       } else {
//         // Nếu không yêu thích, thực hiện yêu cầu thêm
//         const response = await axios.post(
//           `http://localhost:5000/api/favorite`,
//           {
//             idProperty: property._id,
//           },
//           {
//             withCredentials: true,
//           }
//         );

//         if (response.data.success) {
//           alert("Đã thêm vào danh sách yêu thích!");
//           setIsFavorite(true);
//           setFavoriteId(response.data.favoriteId); // Lưu ID của yêu thích
//         } else {
//           alert("Lỗi khi lưu tài sản vào danh sách yêu thích.");
//         }
//       }
//     } catch (error) {
//       console.error("Lỗi khi lưu yêu thích:", error);
//       alert("Đã xảy ra lỗi!");
//     }
//   };

//   const checkFavoriteStatus = async () => {
//     if (!property) return;

//     try {
//       const response = await axios.get(`http://localhost:5000/api/favorite`, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         const favorite = response.data.data.find(
//           (item) => item.idProperty._id === property._id
//         );
//         if (favorite) {
//           setIsFavorite(true);
//           setFavoriteId(favorite._id); // Lưu ID của yêu thích
//         }
//       }
//     } catch (error) {
//       console.error("Lỗi khi kiểm tra trạng thái yêu thích:", error);
//     }
//   };

//   useEffect(() => {
//     checkFavoriteStatus(); // Kiểm tra trạng thái yêu thích khi tài sản được tải
//   }, [property]);

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "200px" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Đang tải...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!property) {
//     return <div>Tài sản không tồn tại hoặc dữ liệu bị lỗi.</div>;
//   }

//   const detail = propertyDetails.find(
//     (detail) => detail.idProperty && detail.idProperty._id === property._id
//   );

//   return (
//     <div className="container-detail container my-4">
//       <div className="details">
//         <div className="wrapper">
//           <Slider id={property._id} />
//           <div className="info">
//             <div className="d-flex justify-content-between">
//               <div className="post">
//                 <h1 className="h4">{property.title}</h1>
//                 <div className="d-flex align-items-center">
//                   <img src={pin} alt="" className="me-2 customer-pin" />
//                   <span>{property.address}</span>
//                 </div>
//                 <div className="text-danger fw-bold">
//                   {property.price.toLocaleString()} vnđ
//                 </div>
//               </div>
//             </div>
//             <div className="mt-3">
//               {PropertyDescriptions[property._id] || <p>Mô tả không có.</p>}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="features mt-4">
//         <div className="user d-flex align-items-center">
//           <img
//             src={property.idUser?.avatar || "/default-user.png"}
//             alt="Người dùng"
//             className="rounded-circle me-2 customer-img"
//             style={{ width: "65px", height: "65px" }}
//           />
//           <span>{property.idUser?.username}</span>
//         </div>
//         <div className="user-buttons d-flex mt-2">
//           <button className="customer-button">{property.idUser?.phone}</button>
//           <button className="customer-button">Yêu cầu liên hệ lại</button>
//         </div>
//         <div className="wrapper">
//           <p className="h5">Kích thước</p>
//           <div className="d-flex align-items-center mb-3">
//             <span>{detail ? detail.area : "N/A"} m²</span>
//           </div>
//           <div className="d-flex align-items-center mb-3">
//             <span>{property.beds || "N/A"} Phòng ngủ</span>
//           </div>
//           <div className="d-flex align-items-center mb-3">
//             <span>{property.bath || "N/A"} Phòng tắm</span>
//           </div>

//           <p className="h5">Tọa lạc</p>
//           <div className="map_container mb-3">
//             {position && (
//               <MyMap
//                 position={{ lat: position[0], lng: position[1] }}
//                 popupText={property.address}
//               />
//             )}
//           </div>

//           <div className="d-flex controls">
//             <button className="customer-button">
//               <img
//                 src={chat}
//                 alt=""
//                 className="me-1"
//                 style={{ width: "10px", height: "10px" }}
//               />
//               Gửi tin nhắn
//             </button>
//             <button className="customer-button" onClick={toggleFavorite}>
//               <img
//                 src={save}
//                 alt=""
//                 className="me-1"
//                 style={{ width: "10px", height: "10px" }}
//               />
//               {isFavorite ? "Bỏ yêu thích" : "Lưu"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetail;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chat from "@assets/images/chat.png";
import save from "@assets/images/save.png";
import pin from "@assets/images/pin.png";
import "./Page.css";
import axios from "axios";
import MyMap from "../../../components/Map/Map";
import Slider from "../../../components/Slider/Slider";
import PropertyDescriptions from "./Data";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [position, setPosition] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const fetchPropertyInfo = async () => {
      try {
        const propertyResponse = await axios.get(
          `http://localhost:5000/api/property/${id}`
        );

        if (propertyResponse.data.success) {
          setProperty(propertyResponse.data.data);
        } else {
          throw new Error("Không tìm thấy tài sản.");
        }

        const detailsResponse = await axios.get(
          `http://localhost:5000/api/property-detail`
        );

        if (detailsResponse.data.success) {
          setPropertyDetails(detailsResponse.data.data);
        } else {
          throw new Error("Không thể tải chi tiết tài sản.");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError(err.message || "Lỗi khi lấy dữ liệu tài sản.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyInfo();
  }, [id]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (property && property.address) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              property.address
            )}`
          );

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error(
              "Không tìm thấy tọa độ cho địa chỉ:",
              property.address
            );
          }
        } catch (err) {
          console.error("Lỗi khi lấy tọa độ:", err);
        }
      }
    };

    fetchCoordinates();
  }, [property]);

  const toggleFavorite = async () => {
    if (!property) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token không hợp lệ! Vui lòng đăng nhập lại.");
      return;
    }
    try {
      if (isFavorite) {
        if (!favoriteId) {
          alert("Không tìm thấy ID yêu thích để xóa.");
          return;
        }

        const response = await axios.delete(
          `http://localhost:5000/api/favorite/${favoriteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token qua header
            },
          }
        );

        if (response.data.success) {
          alert("Đã xóa khỏi danh sách yêu thích!");
          setIsFavorite(false);
          setFavoriteId(null);
        } else {
          alert("Lỗi khi xóa tài sản khỏi danh sách yêu thích.");
        }
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/favorite`,
          {
            idProperty: property._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token qua header
            },
          }
        );

        if (response.data.success) {
          alert("Đã thêm vào danh sách yêu thích!");
          setIsFavorite(true);
          setFavoriteId(response.data.favoriteId);
        } else {
          alert("Lỗi khi lưu tài sản vào danh sách yêu thích.");
        }
      }
    } catch (error) {
      console.error(
        "Lỗi khi lưu yêu thích:",
        error.response ? error.response.data : error
      );
      alert("Đã xảy ra lỗi!");
    }
  };

  const checkFavoriteStatus = async () => {
    const token = localStorage.getItem("userToken"); // Lấy token từ localStorage

    if (!property) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token qua header
        },
      });

      if (response.data.success) {
        const favorite = response.data.data.find(
          (item) => item.idProperty._id === property._id
        );
        if (favorite) {
          setIsFavorite(true);
          setFavoriteId(favorite._id);
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái yêu thích:", error);
    }
  };

  useEffect(() => {
    checkFavoriteStatus(); // Kiểm tra trạng thái yêu thích khi tài sản được tải
  }, [property]);

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

  if (!property) {
    return <div>Tài sản không tồn tại hoặc dữ liệu bị lỗi.</div>;
  }

  const detail = propertyDetails.find(
    (detail) => detail.idProperty && detail.idProperty._id === property._id
  );

  return (
    <div className="container-detail container my-4">
      <div className="details">
        <div className="wrapper">
          <Slider id={property._id} />
          <div className="info">
            <div className="d-flex justify-content-between">
              <div className="post">
                <h1 className="h4">{property.title}</h1>
                <div className="d-flex align-items-center">
                  <img src={pin} alt="" className="me-2 customer-pin" />
                  <span>{property.address}</span>
                </div>
                <div className="text-danger fw-bold">
                  {property.price.toLocaleString()} vnđ
                </div>
              </div>
            </div>
            <div className="mt-3">
              {PropertyDescriptions[property._id] || <p>Mô tả không có.</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="features mt-4">
        <div className="user d-flex align-items-center">
          <img
            src={property.idUser?.avatar || "/default-user.png"}
            alt="Người dùng"
            className="rounded-circle me-2 customer-img"
            style={{ width: "65px", height: "65px" }}
          />
          <span>{property.idUser?.username}</span>
        </div>
        <div className="user-buttons d-flex mt-2">
          <button className="customer-button">{property.idUser?.phone}</button>
          <button className="customer-button">Yêu cầu liên hệ lại</button>
        </div>
        <div className="wrapper">
          <p className="h5">Kích thước</p>
          <div className="d-flex align-items-center mb-3">
            <span>{detail ? detail.area : "N/A"} m²</span>
          </div>
          <div className="d-flex align-items-center mb-3">
            <span>{property.beds || "N/A"} Phòng ngủ</span>
          </div>
          <div className="d-flex align-items-center mb-3">
            <span>{property.bath || "N/A"} Phòng tắm</span>
          </div>

          <p className="h5">Tọa lạc</p>
          <div className="map_container mb-3">
            {position && (
              <MyMap
                position={{ lat: position[0], lng: position[1] }}
                popupText={property.address}
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
              Gửi tin nhắn
            </button>
            <button className="customer-button" onClick={toggleFavorite}>
              <img
                src={save}
                alt=""
                className="me-1"
                style={{ width: "10px", height: "10px" }}
              />
              {isFavorite ? "Bỏ yêu thích" : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
