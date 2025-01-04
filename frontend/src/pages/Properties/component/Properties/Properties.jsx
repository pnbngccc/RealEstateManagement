// import { useState, useEffect } from "react";
// import axios from "axios";
// import "@assets/fonts/icomoon/style.css";
// import "@assets/fonts/flaticon/font/flaticon.css";
// import "@assets/css/tiny-slider.css";
// import "aos/dist/aos.css";
// import "@assets/css/style.css";
// import "./Properties.css";
// import { useLocation } from "react-router-dom";

// const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

// function PropertyList() {
//   const [properties, setProperties] = useState([]); // Dữ liệu tài sản
//   const [propertyDetails, setPropertyDetails] = useState([]); // Dữ liệu chi tiết tài sản
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const [priceFilter, setPriceFilter] = useState("all"); // Bộ lọc giá
//   const [loading, setLoading] = useState(true); // Trạng thái loading
//   const [error, setError] = useState(""); // Lỗi nếu xảy ra
//   const location = useLocation(); // Nhận đường dẫn hiện tại

//   useEffect(() => {
//     fetchProperties();
//     fetchPropertyDetails();
//   }, []);

//   // Gọi API lấy danh sách tài sản
//   const fetchProperties = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(`http://localhost:5000/api/property`);
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setProperties(
//           response.data.data.map((property) => ({
//             ...property,
//             status:
//               property.status ||
//               (Math.random() > 0.5 ? "Đang Bán" : "Cho Thuê"),
//           }))
//         );
//       } else {
//         setError("Không thể tải dữ liệu tài sản.");
//       }
//     } catch (err) {
//       console.error("Lỗi khi lấy dữ liệu tài sản:", err);
//       setError("Lỗi kết nối đến máy chủ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Gọi API lấy chi tiết tài sản
//   const fetchPropertyDetails = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/property-detail`
//       );
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setPropertyDetails(response.data.data);
//       } else {
//         setError("Không thể tải chi tiết tài sản.");
//       }
//     } catch (err) {
//       console.error("Lỗi khi lấy chi tiết tài sản:", err);
//       setError("Lỗi kết nối đến máy chủ.");
//     }
//   };

//   // Tính tổng số trang
//   const totalPages = Math.ceil(properties.length / itemsPerPage);

//   // Lấy các mục hiện tại dựa trên trang và bộ lọc
//   const getCurrentProperties = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const filteredProperties = properties.filter((property) => {
//       // Lọc theo trạng thái
//       const matchesStatus =
//         (location.pathname === "/buy-properties" &&
//           property.status === "Đang bán") ||
//         (location.pathname === "/rent-properties" &&
//           property.status === "Cho thuê") ||
//         !["/buy-properties", "/rent-properties"].includes(location.pathname);

//       // Lọc theo giá
//       const price =
//         typeof property.price === "string"
//           ? parseFloat(property.price.replace(/[^0-9]/g, "")) // Chuyển đổi giá thành float
//           : property.price;

//       const matchesPrice =
//         priceFilter === "all" ||
//         (priceFilter === "under5" && price < 5000000000) ||
//         (priceFilter === "5to10" &&
//           price >= 5000000000 &&
//           price < 10000000000) ||
//         (priceFilter === "10to15" &&
//           price >= 10000000000 &&
//           price < 15000000000) ||
//         (priceFilter === "15to20" &&
//           price >= 15000000000 &&
//           price < 20000000000);

//       return matchesStatus && matchesPrice; // Trả về điều kiện lọc theo trạng thái và giá
//     });

//     return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
//   };

//   // Chuyển trang
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Thay đổi bộ lọc giá
//   const handlePriceFilterChange = (event) => {
//     setPriceFilter(event.target.value);
//     setCurrentPage(1); // Đặt lại về trang đầu tiên khi thay đổi bộ lọc
//   };

//   const currentProperties = getCurrentProperties();

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "200px" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-danger text-center">{error}</div>;
//   }

//   return (
//     <div className="section section-properties">
//       <div className="container">
//         <div className="row">
//           {/* Danh sách tài sản bên trái */}
//           <div className="col-lg-9">
//             <div className="row">
//               {currentProperties.map((property) => {
//                 const detail = propertyDetails.find(
//                   (detail) =>
//                     detail.idProperty && detail.idProperty._id === property._id
//                 );

//                 return (
//                   <div
//                     className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
//                     key={property._id}
//                   >
//                     <div className="property-item mb-30">
//                       <a href={`/properties/${property._id}`} className="img">
//                         <img
//                           src={property.image || ""}
//                           alt="Property"
//                           className="img-fluid"
//                         />
//                       </a>
//                       <div className="property-content">
//                         <div className="price mb-2">
//                           <span>{property.price?.toLocaleString()} vnđ</span>
//                         </div>
//                         <div>
//                           <span className="d-block mb-2 text-black-50" style={{textAlign:"justify", fontSize:"12px"}}>
//                             {property.address}
//                           </span>

//                           <span className="city d-block mb-3">
//                             {property.title}
//                           </span>
//                           <div className="specs d-flex mb-4">
//                             <span className="d-block d-flex align-items-center me-3">
//                               <span className="caption">
//                                 {detail ? detail.area : "N/A"} m²
//                               </span>
//                             </span>
//                           </div>
//                           {/* Hiển thị trạng thái */}
//                           <div className="d-flex mt-2">
//                             {property.status === "Đang bán" ? (
//                               <a className="a btn-success me-2">Đang Bán</a>
//                             ) : (
//                               <a className="a btn-warning">Cho Thuê</a>
//                             )}
//                           </div>
//                           <a
//                             href={`/properties/${property._id}`}
//                             className="btn btn-primary py-2 px-3"
//                           >
//                             Xem chi tiết
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Hiển thị phân trang chỉ khi có tài sản hiện tại */}
//             {currentProperties.length > 0 && (
//               <div className="row align-items-center py-5">
//                 <div className="col-lg-12 text-center">
//                   <div className="custom-pagination">
//                     {[...Array(totalPages)].map((_, index) => (
//                       <a
//                         href="#"
//                         key={index + 1}
//                         className={currentPage === index + 1 ? "active" : ""}
//                         onClick={() => handlePageChange(index + 1)}
//                       >
//                         {index + 1}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Phần lọc bên phải */}
//           <div className="filter-section col-lg-3">
//             <h4>Lọc theo khoảng giá</h4>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="all"
//                 checked={priceFilter === "all"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>Tất cả</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="under5"
//                 checked={priceFilter === "under5"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>Dưới 5 tỷ</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="5to10"
//                 checked={priceFilter === "5to10"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>5 đến 10 tỷ</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="10to15"
//                 checked={priceFilter === "10to15"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>10 đến 15 tỷ</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="15to20"
//                 checked={priceFilter === "15to20"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>15 đến 20 tỷ</label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyList;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "@assets/fonts/icomoon/style.css";
// import "@assets/fonts/flaticon/font/flaticon.css";
// import "@assets/css/tiny-slider.css";
// import "aos/dist/aos.css";
// import "@assets/css/style.css";
// import "./Properties.css";
// import { useLocation } from "react-router-dom";

// const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

// function PropertyList() {
//   const [properties, setProperties] = useState([]); // Dữ liệu tài sản
//   const [propertyDetails, setPropertyDetails] = useState([]); // Dữ liệu chi tiết tài sản
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const [priceFilter, setPriceFilter] = useState("all"); // Bộ lọc giá
//   const [loading, setLoading] = useState(true); // Trạng thái loading
//   const [error, setError] = useState(""); // Lỗi nếu xảy ra
//   const location = useLocation(); // Nhận đường dẫn hiện tại

//   useEffect(() => {
//     fetchProperties();
//     fetchPropertyDetails();
//   }, []);

//   // Gọi API lấy danh sách tài sản
//   const fetchProperties = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(`http://localhost:5000/api/property`, {
//         withCredentials: false, // Không sử dụng cookie
//       });
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setProperties(
//           response.data.data.map((property) => ({
//             ...property,
//             status:
//               property.status ||
//               (Math.random() > 0.5 ? "Đang Bán" : "Cho Thuê"),
//           }))
//         );
//       } else {
//         setError("Không thể tải dữ liệu tài sản.");
//       }
//     } catch (err) {
//       console.error("Lỗi khi lấy dữ liệu tài sản:", err);
//       setError("Lỗi kết nối đến máy chủ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Gọi API lấy chi tiết tài sản
//   const fetchPropertyDetails = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/property-detail`,
//         {
//           withCredentials: false, // Không sử dụng cookie
//         }
//       );
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setPropertyDetails(response.data.data);
//       } else {
//         setError("Không thể tải chi tiết tài sản.");
//       }
//     } catch (err) {
//       console.error("Lỗi khi lấy chi tiết tài sản:", err);
//       setError("Lỗi kết nối đến máy chủ.");
//     }
//   };

//   // Tính tổng số trang
//   const totalPages = Math.ceil(properties.length / itemsPerPage);

//   // Lấy các mục hiện tại dựa trên trang và bộ lọc
//   const getCurrentProperties = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const filteredProperties = properties.filter((property) => {
//       // Lọc theo trạng thái
//       const matchesStatus =
//         (location.pathname === "/buy-properties" &&
//           property.status === "Đang bán") ||
//         (location.pathname === "/rent-properties" &&
//           property.status === "Cho thuê") ||
//         !["/buy-properties", "/rent-properties"].includes(location.pathname);

//       // Lọc theo giá
//       const price =
//         typeof property.price === "string"
//           ? parseFloat(property.price.replace(/[^0-9]/g, "")) // Chuyển đổi giá thành float
//           : property.price;

//       const matchesPrice =
//         priceFilter === "all" ||
//         (priceFilter === "under5" && price < 5000000000) ||
//         (priceFilter === "5to10" &&
//           price >= 5000000000 &&
//           price < 10000000000) ||
//         (priceFilter === "10to15" &&
//           price >= 10000000000 &&
//           price < 15000000000) ||
//         (priceFilter === "15to20" &&
//           price >= 15000000000 &&
//           price < 20000000000);

//       return matchesStatus && matchesPrice; // Trả về điều kiện lọc theo trạng thái và giá
//     });

//     return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
//   };

//   // Chuyển trang
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Thay đổi bộ lọc giá
//   const handlePriceFilterChange = (event) => {
//     setPriceFilter(event.target.value);
//     setCurrentPage(1); // Đặt lại về trang đầu tiên khi thay đổi bộ lọc
//   };

//   const currentProperties = getCurrentProperties();

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "200px" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-danger text-center">{error}</div>;
//   }

//   return (
//     <div className="section section-properties">
//       <div className="container">
//         <div className="row">
//           {/* Danh sách tài sản bên trái */}
//           <div className="col-lg-9">
//             <div className="row">
//               {currentProperties.map((property) => {
//                 const detail = propertyDetails.find(
//                   (detail) =>
//                     detail.idProperty && detail.idProperty._id === property._id
//                 );

//                 return (
//                   <div
//                     className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
//                     key={property._id}
//                   >
//                     <div className="property-item mb-30">
//                       <a href={`/properties/${property._id}`} className="img">
//                         <img
//                           src={property.image || ""}
//                           alt="Property"
//                           className="img-fluid"
//                         />
//                       </a>
//                       <div className="property-content">
//                         <div className="price mb-2">
//                           <span>{property.price?.toLocaleString()} vnđ</span>
//                         </div>
//                         <div>
//                           <span
//                             className="d-block mb-2 text-black-50"
//                             style={{ textAlign: "justify", fontSize: "12px" }}
//                           >
//                             {property.address}
//                           </span>

//                           <span className="city d-block mb-3">
//                             {property.title}
//                           </span>
//                           <div className="specs d-flex mb-4">
//                             <span className="d-block d-flex align-items-center me-3">
//                               <span className="caption">
//                                 {detail ? detail.area : "N/A"} m²
//                               </span>
//                             </span>
//                           </div>
//                           {/* Hiển thị trạng thái */}
//                           <div className="d-flex mt-2">
//                             {property.status === "Đang bán" ? (
//                               <a className="a btn-success me-2">Đang Bán</a>
//                             ) : (
//                               <a className="a btn-warning">Cho Thuê</a>
//                             )}
//                           </div>
//                           <a
//                             href={`/properties/${property._id}`}
//                             className="btn btn-primary py-2 px-3"
//                           >
//                             Xem chi tiết
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Hiển thị phân trang chỉ khi có tài sản hiện tại */}
//             {currentProperties.length > 0 && (
//               <div className="row align-items-center py-5">
//                 <div className="col-lg-12 text-center">
//                   <div className="custom-pagination">
//                     {[...Array(totalPages)].map((_, index) => (
//                       <a
//                         href="#"
//                         key={index + 1}
//                         className={currentPage === index + 1 ? "active" : ""}
//                         onClick={() => handlePageChange(index + 1)}
//                       >
//                         {index + 1}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Phần lọc bên phải */}
//           <div className="filter-section col-lg-3">
//             <h4>Lọc theo khoảng giá</h4>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="all"
//                 checked={priceFilter === "all"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>Tất cả</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="under5"
//                 checked={priceFilter === "under5"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>Dưới 5 tỷ</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="5to10"
//                 checked={priceFilter === "5to10"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>5 đến 10 tỷ</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="10to15"
//                 checked={priceFilter === "10to15"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>10 đến 15 tỷ</label>
//             </div>
//             <div className="filter-option">
//               <input
//                 type="radio"
//                 value="15to20"
//                 checked={priceFilter === "15to20"}
//                 onChange={handlePriceFilterChange}
//               />
//               <label>15 đến 20 tỷ</label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyList;

import { useState, useEffect } from "react";
import axios from "axios";
import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./Properties.css";
import { useLocation } from "react-router-dom";

const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang

function PropertyList() {
  const [properties, setProperties] = useState([]); // Dữ liệu tài sản
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [priceFilter, setPriceFilter] = useState("all"); // Bộ lọc giá
  const [areaFilter, setAreaFilter] = useState("all"); // Bộ lọc diện tích
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Lỗi nếu xảy ra
  const location = useLocation(); // Nhận đường dẫn hiện tại

  useEffect(() => {
    fetchProperties();
  }, []);

  // Gọi API lấy danh sách tài sản
  const fetchProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/property`, {
        withCredentials: false, // Không sử dụng cookie
      });
      if (response.data.success && Array.isArray(response.data.data)) {
        setProperties(
          response.data.data.map((property) => ({
            ...property,
            status:
              property.status ||
              (Math.random() > 0.5 ? "Đang Bán" : "Cho Thuê"),
          }))
        );
      } else {
        setError("Không thể tải dữ liệu tài sản.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu tài sản:", err);
      setError("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Lấy các mục hiện tại dựa trên trang và bộ lọc
  const getCurrentProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const filteredProperties = properties.filter((property) => {
      // Lọc theo trạng thái
      const matchesStatus =
        (location.pathname === "/buy-properties" &&
          property.status === "Đang bán") ||
        (location.pathname === "/rent-properties" &&
          property.status === "Cho thuê") ||
        !["/buy-properties", "/rent-properties"].includes(location.pathname);

      // Lọc theo giá
      const price =
        typeof property.price === "string"
          ? parseFloat(property.price.replace(/[^0-9]/g, "")) // Chuyển đổi giá thành float
          : property.price;

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under5" && price < 5000000000) ||
        (priceFilter === "5to10" &&
          price >= 5000000000 &&
          price < 10000000000) ||
        (priceFilter === "10to15" &&
          price >= 10000000000 &&
          price < 15000000000) ||
        (priceFilter === "15to20" &&
          price >= 15000000000 &&
          price < 20000000000);

      // Lọc theo diện tích
      const area = property.area || 0; // Nếu không có diện tích, mặc định là 0
      const matchesArea =
        areaFilter === "all" ||
        (areaFilter === "under50" && area < 50) ||
        (areaFilter === "50to100" && area >= 50 && area < 100) ||
        (areaFilter === "100to150" && area >= 100 && area < 150) ||
        (areaFilter === "over150" && area >= 150);
      return matchesStatus && matchesPrice && matchesArea; // Trả về điều kiện lọc theo trạng thái và giá
    });

    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Thay đổi bộ lọc giá
  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
    setCurrentPage(1); // Đặt lại về trang đầu tiên khi thay đổi bộ lọc
  };

  // Thay đổi bộ lọc diện tích
  const handleAreaFilterChange = (event) => {
    setAreaFilter(event.target.value);
    setCurrentPage(1); // Đặt lại về trang đầu tiên khi thay đổi bộ lọc
  };
  const currentProperties = getCurrentProperties();

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

  return (
    <div className="section section-properties">
      <div className="container">
        <div className="row">
          {/* Danh sách tài sản bên trái */}
          <div className="col-lg-9">
            <div className="row">
              {currentProperties.map((property) => (
                <div
                  className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
                  key={property._id}
                >
                  <div className="property-item mb-30">
                    <a href={`/properties/${property._id}`} className="img">
                      <img
                        src={
                          property.images && property.images.length > 0
                            ? property.images[0]
                            : "default-image.jpg"
                        } // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
                        alt="Project"
                        className="img-fluid"
                      />
                    </a>
                    <div className="property-content">
                      <div className="price mb-2">
                        <span>{property.price?.toLocaleString()} vnđ</span>
                      </div>
                      <div>
                        <span
                          className="d-block mb-2 text-black-50"
                          style={{ textAlign: "justify", fontSize: "12px" }}
                        >
                          {property.address}
                        </span>

                        <span className="city d-block mb-3">
                          {property.title}
                        </span>
                        <div className="specs d-flex mb-4">
                          <span className="d-block d-flex align-items-center me-3">
                            <span className="caption">
                              {property.area ? property.area : "N/A"} m²
                            </span>
                          </span>
                        </div>
                        {/* Hiển thị trạng thái */}
                        <div className="d-flex mt-2">
                          {property.status === "Đang bán" ? (
                            <a className="a btn-success me-2">Đang Bán</a>
                          ) : (
                            <a className="a btn-warning">Cho Thuê</a>
                          )}
                        </div>
                        <a
                          href={`/properties/${property._id}`}
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

            {/* Hiển thị phân trang chỉ khi có tài sản hiện tại */}
            {currentProperties.length > 0 && (
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
            )}
          </div>

          {/* Phần lọc bên phải */}
          <div className="col-lg-3">
            <div className="filter-section ">
              <h4>Lọc theo khoảng giá</h4>
              <div className="filter-option">
                <input
                  type="radio"
                  value="all"
                  checked={priceFilter === "all"}
                  onChange={handlePriceFilterChange}
                />
                <label>Tất cả</label>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  value="under5"
                  checked={priceFilter === "under5"}
                  onChange={handlePriceFilterChange}
                />
                <label>Dưới 5 tỷ</label>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  value="5to10"
                  checked={priceFilter === "5to10"}
                  onChange={handlePriceFilterChange}
                />
                <label>5 đến 10 tỷ</label>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  value="10to15"
                  checked={priceFilter === "10to15"}
                  onChange={handlePriceFilterChange}
                />
                <label>10 đến 15 tỷ</label>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  value="15to20"
                  checked={priceFilter === "15to20"}
                  onChange={handlePriceFilterChange}
                />
                <label>15 đến 20 tỷ</label>
              </div>

              <div className="filter-custom">
                <h4 className="mt-4 ">Lọc theo diện tích</h4>
                <div className="filter-option">
                  <input
                    type="radio"
                    value="all"
                    checked={areaFilter === "all"}
                    onChange={handleAreaFilterChange}
                  />
                  <label>Tất cả</label>
                </div>
                <div className="filter-option">
                  <input
                    type="radio"
                    value="under50"
                    checked={areaFilter === "under50"}
                    onChange={handleAreaFilterChange}
                  />
                  <label>Dưới 50 m²</label>
                </div>
                <div className="filter-option">
                  <input
                    type="radio"
                    value="50to100"
                    checked={areaFilter === "50to100"}
                    onChange={handleAreaFilterChange}
                  />
                  <label>50 đến 100 m²</label>
                </div>
                <div className="filter-option">
                  <input
                    type="radio"
                    value="100to150"
                    checked={areaFilter === "100to150"}
                    onChange={handleAreaFilterChange}
                  />
                  <label>100 đến 150 m²</label>
                </div>
                <div className="filter-option">
                  <input
                    type="radio"
                    value="over150"
                    checked={areaFilter === "over150"}
                    onChange={handleAreaFilterChange}
                  />
                  <label>Trên 150 m²</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyList;
