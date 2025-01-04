// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./List.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
// import { useLocation } from "react-router-dom";

// const PropertyForm = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [newProperty, setNewProperty] = useState({
//     title: "",
//     address: "",
//     price: "",
//     image: "",
//     publicId: "",
//     property_type: "",
//     beds: "",
//     bath: "",
//     area: "",
//     status: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10); // Số lượng bản ghi trên mỗi trang
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false); // Khởi tạo showForm là false
//   const location = useLocation(); // Nhận đường dẫn hiện tại

//   // Fetch properties from API
//   const fetchProperties = async (page = 1, limit = 10) => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/property", {
//         params: { page, limit }, // Pass page and limit as parameters
//         withCredentials: true,
//       });
//       console.log(response.data.data); // In ra dữ liệu để kiểm tra
//       setProperties(response.data.data || []);
//       setTotal(response.data.meta.total); // Lưu tổng số bất động sản
//       setCurrentPage(page); // Cập nhật trang hiện tại
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError(error.response?.data?.message || "Failed to fetch properties.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(currentPage, limit);
//   }, [currentPage, limit]); // Include 'limit' here

//   const handleEdit = (property) => {
//     setEditingProperty(property);
//     setNewProperty({
//       title: property.title || "",
//       address: property.address || "",
//       price: property.price || "",
//       image: property.image || "",
//       publicId: property.publicId || "",
//       property_type: property.property_type || "",
//       beds: property.beds || "",
//       bath: property.bath || "",
//       area: property.area || "",
//       status: property.status || "",
//     });
//     setShowForm(true); // Hiển thị form khi chỉnh sửa
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/property/${id}`, {
//         withCredentials: true,
//       });
//       setProperties(properties.filter((property) => property._id !== id));
//     } catch (error) {
//       console.error("Error deleting property:", error);
//       setError(error.response?.data?.message || "Failed to delete property.");
//     }
//   };

//   const handleAdd = async () => {
//     if (
//       !newProperty.title ||
//       !newProperty.price ||
//       !newProperty.image ||
//       !newProperty.address ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/property/",
//         newProperty,
//         {
//           withCredentials: true,
//         }
//       );
//       // setProperties([...properties, response.data.data]);
//       // Cập nhật danh sách bất động sản mà không cần gọi lại API
//       setProperties((prevProperties) => [
//         ...prevProperties,
//         response.data.data,
//       ]);
//       setTotal((prevTotal) => prevTotal + 1); // Cập nhật tổng số bản ghi
//       setNewProperty({
//         title: "",
//         price: "",
//         address: "",
//         image: "",
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false); // Ẩn form sau khi thêm
//     } catch (error) {
//       console.error("Error adding property:", error);
//       setError(error.response?.data?.message || "Failed to add property.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingProperty ||
//       !newProperty.title ||
//       !newProperty.address ||
//       !newProperty.price ||
//       !newProperty.image ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/property/${editingProperty._id}`,
//         newProperty,
//         {
//           withCredentials: true,
//         }
//       );
//       setProperties(
//         properties.map((property) =>
//           property._id === editingProperty._id ? response.data.data : property
//         )
//       );
//       setEditingProperty(null);
//       setNewProperty({
//         title: "",
//         address: "",
//         price: "",
//         image: "",
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false); // Ẩn form sau khi cập nhật
//     } catch (error) {
//       console.error("Error updating property:", error);
//       setError(error.response?.data?.message || "Failed to update property.");
//     }
//   };

//   const handleUploadSuccess = (url, publicId) => {
//     setNewProperty({ ...newProperty, image: url, publicId });
//   };

//   const filteredProperties = properties.filter((property) => {
//     const matchesSearchTerm = property.title //tìm kiếm theo tiêu đề bất động sản
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       (location.pathname === "/buy" && property.status === "Đang bán") ||
//       (location.pathname === "/rent" && property.status === "Cho thuê") ||
//       !["/buy", "/rent"].includes(location.pathname);

//     return matchesSearchTerm && matchesStatus; //trả về điều kiện lọc theo tiêu đề và trạng thái
//   });
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h2>Danh sách bất động sản</h2>
//           <button
//             className="btn-create"
//             onClick={() => {
//               setShowForm(true);
//               setEditingProperty(null);
//             }}
//           >
//             <i className="fas fa-plus"></i>
//           </button>
//         </div>
//         {error && <div className="error-message text-danger">{error}</div>}
//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Tìm kiếm bất động sản..."
//             value={searchTerm}
//             onChange={(e) => {
//               console.log("Updating searchTerm:", e.target.value); // Debug
//               setSearchTerm(e.target.value);
//             }}
//             style={{ height: "40px" }}
//           />
//           <button className="btn-search">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//       </div>

//       {/* Hiển thị form khi showForm là true */}
//       {showForm && (
//         <div className="mb-3">
//           <h4>{editingProperty ? "Update Property" : "Add Property"}</h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newProperty.title || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               value={newProperty.address || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, address: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newProperty.price || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, price: e.target.value })
//               }
//             />
//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv", // Thay bằng thông tin Cloudinary của bạn
//                 uploadPreset: "estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "properties",
//               }}
//               setAvatar={(url) => handleUploadSuccess(url, "")}
//             />
//             {newProperty.image && (
//               <div>
//                 <img
//                   src={newProperty.image}
//                   alt="Property"
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     marginTop: "10px",
//                   }}
//                 />
//               </div>
//             )}

//             <select
//               value={newProperty.property_type || ""}
//               onChange={(e) =>
//                 setNewProperty({
//                   ...newProperty,
//                   property_type: e.target.value,
//                 })
//               }
//             >
//               <option value="">Chọn loại bất động sản</option>
//               <option value="Nhà ở">Nhà ở</option>
//               <option value="Căn hộ">Căn hộ</option>
//               <option value="Chung cư">Chung cư</option>
//               <option value="Biệt thự">Biệt thự</option>
//               <option value="Vinhomes">Vinhomes</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Beds"
//               value={newProperty.beds || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, beds: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Bath"
//               value={newProperty.bath || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, bath: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Area"
//               value={newProperty.area || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, area: e.target.value })
//               }
//             />
//             <select
//               value={newProperty.status || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, status: e.target.value })
//               }
//             >
//               <option value="">Chọn trạng thái</option>
//               <option value="Đang bán">Đang bán</option>
//               <option value="Cho thuê">Cho thuê</option>
//             </select>
//             <button onClick={editingProperty ? handleUpdate : handleAdd}>
//               {editingProperty ? "Update" : "Add"}
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loading-spinner">Loading...</div>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>ID</th>
//               <th>Hình</th>
//               <th>Tiêu đề</th>
//               <th>Địa chỉ</th>
//               <th>Giá</th>
//               <th>Loại</th>
//               <th>Phòng ngủ</th>
//               <th>Phòng tắm</th>
//               <th>Trạng thái</th>
//               <th>ID user</th>
//               <th style={{ width: "180px" }}>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProperties.length > 0 ? (
//               filteredProperties.map((property) => (
//                 <tr key={property._id}>
//                   <td>{property._id}</td>
//                   <td>
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>{property.title}</td>
//                   <td>{property.address}</td>
//                   <td>{property.price} vnđ</td>
//                   <td>{property.property_type}</td>
//                   <td>{property.beds}</td>
//                   <td>{property.bath}</td>
//                   <td>{property.status}</td>
//                   <td>{property.idUser ? property.idUser._id : "Unknown"}</td>

//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(property)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(property._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center">
//                   No properties found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//       {/* Điều khiển phân trang Bootstrap */}
//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center">
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {[...Array(Math.ceil(total / limit))].map((_, index) => (
//             <li
//               className={`page-item ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//               key={index}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(prev + 1, Math.ceil(total / limit))
//                 )
//               }
//               disabled={currentPage >= Math.ceil(total / limit)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PropertyForm;

//mã mới
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "./List.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
// import { UserContext } from "../../../untils/Context.jsx";
// import { useLocation } from "react-router-dom";

// const PropertyForm = () => {
//   const { currentUser } = useContext(UserContext); // Lấy currentUser từ context
//   const [searchTerm, setSearchTerm] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [newProperty, setNewProperty] = useState({
//     title: "",
//     address: "",
//     price: "",
//     image: "",
//     publicId: "",
//     property_type: "",
//     beds: "",
//     bath: "",
//     area: "",
//     status: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const location = useLocation();
//   const [deleteMessage, setDeleteMessage] = useState("");

//   // Fetch properties from API
//   const fetchProperties = async (page = 1, limit = 10) => {
//     const token = currentUser?.token; // Lấy token từ currentUser
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:5000/api/property", {
//         params: { page, limit },
//         headers: {
//           Authorization: `Bearer ${token}`, // Gửi token trong header
//         },
//       });
//       setProperties(response.data.data || []);
//       setTotal(response.data.meta.total);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError(error.response?.data?.message || "Failed to fetch properties.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(currentPage, limit);
//   }, [currentPage, limit]);

//   const handleEdit = (property) => {
//     setEditingProperty(property);
//     setNewProperty({
//       title: property.title || "",
//       address: property.address || "",
//       price: property.price || "",
//       image: property.image || "",
//       publicId: property.publicId || "",
//       property_type: property.property_type || "",
//       beds: property.beds || "",
//       bath: property.bath || "",
//       area: property.area || "",
//       status: property.status || "",
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     const token = currentUser?.token; // Lấy token từ currentUser
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5000/api/property/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Gửi token trong header
//         },
//       });
//       setProperties(properties.filter((property) => property._id !== id));
//       setDeleteMessage("Xóa thành công!"); // Thêm thông báo xóa thành công
//     } catch (error) {
//       console.error("Error deleting property:", error);
//       setError(error.response?.data?.message || "Failed to delete property.");
//     }
//   };
//   const handleCloseMessage = () => {
//     setDeleteMessage(""); // Tắt thông báo
//   };
//   const handleAdd = async () => {
//     if (
//       !newProperty.title ||
//       !newProperty.price ||
//       !newProperty.image ||
//       !newProperty.address ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     const token = currentUser?.token; // Lấy token từ currentUser
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/property/",
//         newProperty,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Gửi token trong header
//           },
//         }
//       );
//       console.log("Update Response:", response.data); // Log phản hồi

//       setProperties((prevProperties) => [
//         ...prevProperties,
//         response.data.data,
//       ]);
//       setTotal((prevTotal) => prevTotal + 1);
//       setNewProperty({
//         title: "",
//         price: "",
//         address: "",
//         image: "",
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error adding property:", error);
//       setError(error.response?.data?.message || "Failed to add property.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingProperty ||
//       !newProperty.title ||
//       !newProperty.address ||
//       !newProperty.price ||
//       !newProperty.image ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     const token = currentUser?.token; // Lấy token từ currentUser
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/property/${editingProperty._id}`,
//         newProperty,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Gửi token trong header
//           },
//         }
//       );
//       setProperties(
//         properties.map((property) =>
//           property._id === editingProperty._id ? response.data.data : property
//         )
//       );
//       setEditingProperty(null);
//       setNewProperty({
//         title: "",
//         address: "",
//         price: "",
//         image: "",
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error updating property:", error);
//       setError(error.response?.data?.message || "Failed to update property.");
//     }
//   };

//   const handleUploadSuccess = (url, publicId) => {
//     setNewProperty({ ...newProperty, image: url, publicId });
//   };

//   const filteredProperties = properties.filter((property) => {
//     const matchesSearchTerm = property.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       (location.pathname === "/buy" && property.status === "Đang bán") ||
//       (location.pathname === "/rent" && property.status === "Cho thuê") ||
//       !["/buy", "/rent"].includes(location.pathname);

//     return matchesSearchTerm && matchesStatus;
//   });

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h2>Danh sách bất động sản</h2>
//           <button
//             className="btn-create"
//             onClick={() => {
//               setShowForm(true);
//               setEditingProperty(null);
//             }}
//           >
//             <i className="fas fa-plus"></i>
//           </button>
//         </div>
//         {error && <div className="error-message text-danger">{error}</div>}
//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Tìm kiếm bất động sản..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ height: "40px" }}
//           />
//           <button className="btn-search">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//       </div>
//       {deleteMessage && (
//         <div className="alert alert-success d-flex justify-content-between align-items-center">
//           {deleteMessage}
//           <button className="btn-close" onClick={handleCloseMessage}>
//             &times;
//           </button>
//         </div>
//       )}
//       {showForm && (
//         <div className="mb-3">
//           <h4>
//             {editingProperty ? "Cập nhật bất động sản" : "Thêm bất động sản"}
//           </h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Tiêu đề"
//               value={newProperty.title || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Địa chỉ"
//               value={newProperty.address || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, address: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Giá"
//               value={newProperty.price || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, price: e.target.value })
//               }
//             />
//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv",
//                 uploadPreset: "estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "properties",
//               }}
//               setAvatar={(url) => handleUploadSuccess(url, "")}
//             />
//             {newProperty.image && (
//               <div>
//                 <img
//                   src={newProperty.image}
//                   alt="Bất động sản"
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     marginTop: "10px",
//                   }}
//                 />
//               </div>
//             )}

//             <select
//               value={newProperty.property_type || ""}
//               onChange={(e) =>
//                 setNewProperty({
//                   ...newProperty,
//                   property_type: e.target.value,
//                 })
//               }
//             >
//               <option value="">Chọn loại bất động sản</option>
//               <option value="Nhà ở">Nhà ở</option>
//               <option value="Căn hộ">Căn hộ</option>
//               <option value="Chung cư">Chung cư</option>
//               <option value="Biệt thự">Biệt thự</option>
//               <option value="Vinhomes">Vinhomes</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Số phòng ngủ"
//               value={newProperty.beds || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, beds: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Số phòng tắm"
//               value={newProperty.bath || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, bath: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Diện tích"
//               value={newProperty.area || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, area: e.target.value })
//               }
//             />
//             <select
//               value={newProperty.status || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, status: e.target.value })
//               }
//             >
//               <option value="">Chọn trạng thái</option>
//               <option value="Đang bán">Đang bán</option>
//               <option value="Cho thuê">Cho thuê</option>
//             </select>
//             <button onClick={editingProperty ? handleUpdate : handleAdd}>
//               {editingProperty ? "Cập nhật" : "Thêm"}
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loading-spinner">Loading...</div>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>ID</th>
//               <th>Hình</th>
//               <th>Tiêu đề</th>
//               <th>Địa chỉ</th>
//               <th>Giá</th>
//               <th>Loại</th>
//               <th>Phòng ngủ</th>
//               <th>Phòng tắm</th>
//               <th>Area</th>
//               <th>Trạng thái</th>
//               <th>ID user</th>
//               <th style={{ width: "180px" }}>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProperties.length > 0 ? (
//               filteredProperties.map((property) => (
//                 <tr key={property._id}>
//                   <td>{property._id}</td>
//                   <td>
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>{property.title}</td>
//                   <td>{property.address}</td>
//                   <td>{property.price} vnđ</td>
//                   <td>{property.property_type}</td>
//                   <td>{property.beds}</td>
//                   <td>{property.bath}</td>
//                   <td>
//                     {property.area !== undefined ? property.area : "N/A"} m²
//                   </td>
//                   <td>{property.status}</td>
//                   <td>{property.idUser ? property.idUser._id : "Unknown"}</td>

//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(property)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(property._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="11" className="text-center">
//                   Không tìm thấy bất động sản
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center">
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {[...Array(Math.ceil(total / limit))].map((_, index) => (
//             <li
//               className={`page-item ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//               key={index}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(prev + 1, Math.ceil(total / limit))
//                 )
//               }
//               disabled={currentPage >= Math.ceil(total / limit)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PropertyForm;
//bản mới
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "./List.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
// import { UserContext } from "../../../untils/Context.jsx";
// import { useLocation } from "react-router-dom";

// const PropertyForm = () => {
//   const { currentUser } = useContext(UserContext);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [newProperty, setNewProperty] = useState({
//     title: "",
//     address: "",
//     price: "",
//     image: "",
//     publicId: "",
//     property_type: "",
//     beds: "",
//     bath: "",
//     area: "",
//     status: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const location = useLocation();
//   const [deleteMessage, setDeleteMessage] = useState("");

//   // Fetch properties from API
//   const fetchProperties = async (page = 1, limit = 10) => {
//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:5000/api/property", {
//         params: { page, limit },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProperties(response.data.data || []);
//       setTotal(response.data.meta.total);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError(error.response?.data?.message || "Failed to fetch properties.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(currentPage, limit);
//   }, [currentPage, limit]);

//   const handleEdit = (property) => {
//     setEditingProperty(property);
//     setNewProperty({
//       title: property.title || "",
//       address: property.address || "",
//       price: property.price || "",
//       image: property.image || "",
//       publicId: property.publicId || "",
//       property_type: property.property_type || "",
//       beds: property.beds || "",
//       bath: property.bath || "",
//       area: property.area || "",
//       status: property.status || "",
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5000/api/property/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProperties(properties.filter((property) => property._id !== id));
//       setDeleteMessage("Xóa thành công!");
//     } catch (error) {
//       console.error("Error deleting property:", error);
//       setError(error.response?.data?.message || "Failed to delete property.");
//     }
//   };

//   const handleCloseMessage = () => {
//     setDeleteMessage("");
//   };

//   const handleAdd = async () => {
//     if (
//       !newProperty.title ||
//       !newProperty.price ||
//       !newProperty.image ||
//       !newProperty.address ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/property/",
//         newProperty,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProperties((prevProperties) => [
//         ...prevProperties,
//         response.data.data,
//       ]);
//       setTotal((prevTotal) => prevTotal + 1);
//       setNewProperty({
//         title: "",
//         price: "",
//         address: "",
//         image: "",
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error adding property:", error);
//       setError(error.response?.data?.message || "Failed to add property.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingProperty ||
//       !newProperty.title ||
//       !newProperty.address ||
//       !newProperty.price ||
//       !newProperty.image ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/property/${editingProperty._id}`,
//         newProperty,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProperties(
//         properties.map((property) =>
//           property._id === editingProperty._id ? response.data.data : property
//         )
//       );
//       setEditingProperty(null);
//       setNewProperty({
//         title: "",
//         address: "",
//         price: "",
//         image: "",
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error updating property:", error);
//       setError(error.response?.data?.message || "Failed to update property.");
//     }
//   };

//   const handleUploadSuccess = (url, publicId) => {
//     setNewProperty({ ...newProperty, image: url, publicId });
//   };

//   const filteredProperties = properties.filter((property) => {
//     const matchesSearchTerm = property.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       (location.pathname === "/buy" && property.status === "Đang bán") ||
//       (location.pathname === "/rent" && property.status === "Cho thuê") ||
//       !["/buy", "/rent"].includes(location.pathname);

//     return matchesSearchTerm && matchesStatus;
//   });

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h2>Danh sách bất động sản</h2>
//           <button
//             className="btn-create"
//             onClick={() => {
//               setShowForm(true);
//               setEditingProperty(null);
//             }}
//           >
//             <i className="fas fa-plus"></i>
//           </button>
//         </div>
//         {error && <div className="error-message text-danger">{error}</div>}
//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Tìm kiếm bất động sản..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ height: "40px" }}
//           />
//           <button className="btn-search">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//       </div>
//       {deleteMessage && (
//         <div className="alert alert-success d-flex justify-content-between align-items-center">
//           {deleteMessage}
//           <button className="btn-close" onClick={handleCloseMessage}>
//             &times;
//           </button>
//         </div>
//       )}
//       {showForm && (
//         <div className="mb-3">
//           <h4>
//             {editingProperty ? "Cập nhật bất động sản" : "Thêm bất động sản"}
//           </h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Tiêu đề"
//               value={newProperty.title || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Địa chỉ"
//               value={newProperty.address || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, address: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Giá"
//               value={newProperty.price || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, price: e.target.value })
//               }
//             />
//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv",
//                 uploadPreset: "estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "properties",
//               }}
//               setAvatar={(url) => handleUploadSuccess(url, "")}
//             />
//             {newProperty.image && (
//               <div>
//                 <img
//                   src={newProperty.image}
//                   alt="Bất động sản"
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     marginTop: "10px",
//                   }}
//                 />
//               </div>
//             )}

//             <select
//               value={newProperty.property_type || ""}
//               onChange={(e) =>
//                 setNewProperty({
//                   ...newProperty,
//                   property_type: e.target.value,
//                 })
//               }
//             >
//               <option value="">Chọn loại bất động sản</option>
//               <option value="Nhà ở">Nhà ở</option>
//               <option value="Căn hộ">Căn hộ</option>
//               <option value="Chung cư">Chung cư</option>
//               <option value="Biệt thự">Biệt thự</option>
//               <option value="Vinhomes">Vinhomes</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Số phòng ngủ"
//               value={newProperty.beds || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, beds: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Số phòng tắm"
//               value={newProperty.bath || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, bath: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Diện tích"
//               value={newProperty.area || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, area: e.target.value })
//               }
//             />
//             <select
//               value={newProperty.status || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, status: e.target.value })
//               }
//             >
//               <option value="">Chọn trạng thái</option>
//               <option value="Đang bán">Đang bán</option>
//               <option value="Cho thuê">Cho thuê</option>
//             </select>
//             <button onClick={editingProperty ? handleUpdate : handleAdd}>
//               {editingProperty ? "Cập nhật" : "Thêm"}
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loading-spinner">Loading...</div>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>ID</th>
//               <th>Hình</th>
//               <th>Tiêu đề</th>
//               <th>Địa chỉ</th>
//               <th>Giá</th>
//               <th>Loại</th>
//               <th>Phòng ngủ</th>
//               <th>Phòng tắm</th>
//               <th>Diện tích</th>
//               <th>Trạng thái</th>
//               <th>ID user</th>
//               <th style={{ width: "180px" }}>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProperties.length > 0 ? (
//               filteredProperties.map((property) => (
//                 <tr key={property._id}>
//                   <td>{property._id}</td>
//                   <td>
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>{property.title}</td>
//                   <td>{property.address}</td>
//                   <td>{property.price} vnđ</td>
//                   <td>{property.property_type}</td>
//                   <td>{property.beds}</td>
//                   <td>{property.bath}</td>
//                   <td>
//                     {property.area !== undefined ? property.area : "N/A"} m²
//                   </td>
//                   <td>{property.status}</td>
//                   <td>{property.idUser ? property.idUser._id : "Unknown"}</td>

//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(property)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(property._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="11" className="text-center">
//                   Không tìm thấy bất động sản
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center">
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {[...Array(Math.ceil(total / limit))].map((_, index) => (
//             <li
//               className={`page-item ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//               key={index}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(prev + 1, Math.ceil(total / limit))
//                 )
//               }
//               disabled={currentPage >= Math.ceil(total / limit)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PropertyForm;
//bản mới
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "./List.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
// import { UserContext } from "../../../untils/Context.jsx";

// const PropertyForm = () => {
//   const { currentUser } = useContext(UserContext);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [newProperty, setNewProperty] = useState({
//     title: "",
//     address: "",
//     price: "",
//     images: [],
//     publicId: "",
//     property_type: "",
//     beds: "",
//     bath: "",
//     area: "",
//     status: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const location = useLocation();
//   const [notification, setNotification] = useState({ message: "", type: "" });

//   const fetchProperties = async (page = 1, limit = 10) => {
//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:5000/api/property", {
//         params: { page, limit },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProperties(response.data.data || []);
//       setTotal(response.data.meta.total);
//       setCurrentPage(page);
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to fetch properties.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(currentPage, limit);
//   }, [currentPage, limit]);

//   const handleEdit = (property) => {
//     setEditingProperty(property);
//     setNewProperty({ ...property });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5000/api/property/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProperties(properties.filter((property) => property._id !== id));
//       setNotification({ message: "Xóa thành công!", type: "success" });
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to delete property.");
//     }
//   };

//   const handleCloseNotification = () => {
//     setNotification({ message: "", type: "" });
//   };

//   const handleAdd = async () => {
//     if (
//       !newProperty.title ||
//       !newProperty.price ||
//       newProperty.images.length === 0 ||
//       !newProperty.address ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/property/",
//         newProperty,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setProperties((prevProperties) => [
//         ...prevProperties,
//         response.data.data,
//       ]);
//       setTotal((prevTotal) => prevTotal + 1);
//       setNewProperty({
//         title: "",
//         price: "",
//         address: "",
//         images: [],
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false);
//       setNotification({ message: "Thêm thành công!", type: "success" });
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to add property.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingProperty ||
//       !newProperty.title ||
//       !newProperty.address ||
//       !newProperty.price ||
//       newProperty.images.length === 0 ||
//       !newProperty.property_type ||
//       !newProperty.beds ||
//       !newProperty.area ||
//       !newProperty.bath ||
//       !newProperty.status
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     const token = currentUser?.token;
//     if (!token) {
//       setError("Token không hợp lệ hoặc không tồn tại.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/property/${editingProperty._id}`,
//         newProperty,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProperties(
//         properties.map((property) =>
//           property._id === editingProperty._id ? response.data.data : property
//         )
//       );
//       setEditingProperty(null);
//       setNewProperty({
//         title: "",
//         address: "",
//         price: "",
//         images: [],
//         publicId: "",
//         property_type: "",
//         beds: "",
//         area: "",
//         bath: "",
//         status: "",
//       });
//       setShowForm(false);
//       setNotification({ message: "Cập nhật thành công!", type: "success" });
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to update property.");
//     }
//   };

//   const handleUploadSuccess = (url, publicId) => {
//     setNewProperty((prev) => ({ ...prev, images: [...prev.images, url] }));
//   };

//   const filteredProperties = properties.filter((property) => {
//     const matchesSearchTerm = property.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       (location.pathname === "/buy" && property.status === "Đang bán") ||
//       (location.pathname === "/rent" && property.status === "Cho thuê") ||
//       !["/buy", "/rent"].includes(location.pathname);
//     return matchesSearchTerm && matchesStatus;
//   });

//   const handleDeleteImage = (index) => {
//     setNewProperty((prev) => {
//       const updatedImages = prev.images.filter((_, i) => i !== index);
//       return { ...prev, images: updatedImages };
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h2>Danh sách bất động sản</h2>
//           <button
//             className="btn-create"
//             onClick={() => {
//               setShowForm(true);
//               setEditingProperty(null);
//             }}
//           >
//             <i className="fas fa-plus"></i>
//           </button>
//         </div>

//         {error && <div className="error-message text-danger">{error}</div>}

//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Tìm kiếm bất động sản..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ height: "40px" }}
//           />
//           <button className="btn-search">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//       </div>

//       {notification.message && (
//         <div
//           className={`alert alert-${
//             notification.type === "error" ? "danger" : "success"
//           } d-flex justify-content-between align-items-center`}
//         >
//           {notification.message}
//           <button className="btn-close" onClick={handleCloseNotification}>
//             &times;
//           </button>
//         </div>
//       )}

//       {showForm && (
//         <div className="mb-3">
//           <h4>
//             {editingProperty ? "Cập nhật bất động sản" : "Thêm bất động sản"}
//           </h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Tiêu đề"
//               value={newProperty.title}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, title: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Địa chỉ"
//               value={newProperty.address}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, address: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Giá"
//               value={newProperty.price}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, price: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Mô tả"
//               value={newProperty.description}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, description: e.target.value })
//               }
//               style={{ resize: "vertical", width: "100%" }}
//               rows="4"
//             />

//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv",
//                 uploadPreset: "estate",
//                 multiple: true,
//                 maxImageFileSize: 2000000,
//                 folder: "properties",
//               }}
//               setAvatar={handleUploadSuccess}
//             />
//             {newProperty.images.length > 0 && (
//               <div>
//                 {newProperty.images.map((image, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       position: "relative",
//                       display: "inline-block",
//                       margin: "10px",
//                     }}
//                   >
//                     <img
//                       src={image}
//                       alt="Bất động sản"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <button
//                       onClick={() => handleDeleteImage(index)}
//                       style={{
//                         position: "absolute",
//                         top: "5px",
//                         right: "5px",
//                         background: "transparent",
//                         border: "1px solid black",
//                         backgroundColor: "#ccc",
//                         color: "white",
//                         fontSize: "16px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       &times;
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <select
//               value={newProperty.property_type || ""}
//               onChange={(e) =>
//                 setNewProperty({
//                   ...newProperty,
//                   property_type: e.target.value,
//                 })
//               }
//             >
//               <option value="">Chọn loại bất động sản</option>
//               <option value="Nhà ở">Nhà ở</option>
//               <option value="Căn hộ">Căn hộ</option>
//               <option value="Chung cư">Chung cư</option>
//               <option value="Biệt thự">Biệt thự</option>
//               <option value="Vinhomes">Vinhomes</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Số phòng ngủ"
//               value={newProperty.beds}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, beds: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Số phòng tắm"
//               value={newProperty.bath}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, bath: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Diện tích"
//               value={newProperty.area}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, area: e.target.value })
//               }
//             />
//             <select
//               value={newProperty.status || ""}
//               onChange={(e) =>
//                 setNewProperty({ ...newProperty, status: e.target.value })
//               }
//             >
//               <option value="">Chọn trạng thái</option>
//               <option value="Đang bán">Đang bán</option>
//               <option value="Cho thuê">Cho thuê</option>
//             </select>
//             <button onClick={editingProperty ? handleUpdate : handleAdd}>
//               {editingProperty ? "Cập nhật" : "Thêm"}
//             </button>
//           </div>
//         </div>
//       )}

//       {loading ? (
//         <div className="loading-spinner">Loading...</div>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>ID</th>
//               <th>Hình</th>
//               <th>Tiêu đề</th>
//               <th>Địa chỉ</th>
//               <th>Giá</th>
//               <th>Mô tả</th>
//               <th>Loại</th>
//               <th>Phòng ngủ</th>
//               <th>Phòng tắm</th>
//               <th>Diện tích</th>
//               <th>Trạng thái</th>
//               <th>ID user</th>
//               <th style={{ width: "180px" }}>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProperties.length > 0 ? (
//               filteredProperties.map((property) => (
//                 <tr key={property._id}>
//                   <td>{property._id}</td>
//                   <td>
//                     <img
//                       src={property.images[0]}
//                       alt={property.title}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>{property.title}</td>
//                   <td>{property.address}</td>
//                   <td>{property.price} vnđ</td>
//                   <td
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {property.description}
//                   </td>
//                   <td>{property.property_type}</td>
//                   <td>{property.beds}</td>
//                   <td>{property.bath}</td>
//                   <td>
//                     {property.area !== undefined ? property.area : "N/A"} m²
//                   </td>
//                   <td>{property.status}</td>
//                   <td>{property.idUser ? property.idUser._id : "Unknown"}</td>
//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(property)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(property._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="13" className="text-center">
//                   Không tìm thấy bất động sản
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center">
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {[...Array(Math.ceil(total / limit))].map((_, index) => (
//             <li
//               className={`page-item ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//               key={index}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(prev + 1, Math.ceil(total / limit))
//                 )
//               }
//               disabled={currentPage >= Math.ceil(total / limit)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

//export default PropertyForm;
import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";
import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
import { useLocation } from "react-router-dom";

const PropertyForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperties, setEditingProperties] = useState(null);
  const [newProperties, setNewProperties] = useState({
    title: "",
    images: [], // Chuyển từ image sang images
    description: "",
    area: "",
    address: "",
    status: "",
    price: "",
    property_type: "",
    beds: "",
    bath: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const location = useLocation();
  const fetchProperties = async (page = 1, limit = 10) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/property", {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties(response.data.data || []);
      setTotal(response.data.meta.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(error.response?.data?.message || "Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage, limit);
  }, [currentPage, limit]);

  const handleEdit = (properties) => {
    setEditingProperties(properties);
    setNewProperties({
      title: properties.title || "",
      description: properties.description || "",
      property_type: properties.property_type || "",
      price: properties.price || "",
      images: properties.images || [], // Cập nhật mảng images
      address: properties.address || "",
      area: properties.area || "",
      beds: properties.beds || "",
      bath: properties.bath || "",
      status: properties.status || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/property/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties(properties.filter((properties) => properties._id !== id));
      setNotification({ message: "Xóa thành công!", type: "success" });
    } catch (error) {
      console.error("Error deleting project:", error);
      setError(error.response?.data?.message || "Failed to delete project.");
    }
  };

  const handleAdd = async () => {
    if (
      !newProperties.title ||
      !newProperties.description ||
      !newProperties.property_type ||
      !newProperties.price ||
      !newProperties.images.length ||
      !newProperties.address ||
      !newProperties.beds ||
      !newProperties.bath ||
      !newProperties.area ||
      !newProperties.status
    ) {
      alert("All fields are required!");
      return;
    }

    const propertyData = {
      ...newProperties,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/property/",
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties((prevProperties) => [
        ...prevProperties,
        response.data.data,
      ]);
      setTotal((prevTotal) => prevTotal + 1);
      setNewProperties({
        title: "",
        images: [], // reset
        description: "",
        area: "",
        address: "",
        status: "",
        price: "",
        property_type: "",
        beds: "",
        bath: "",
      });
      setShowForm(false);
      setNotification({ message: "Thêm thành công!", type: "success" });
    } catch (error) {
      console.error("Error adding Properties:", error);
      setError(error.response?.data?.message || "Failed to add Properties.");
    }
  };

  const handleUpdate = async () => {
    if (
      !editingProperties ||
      !newProperties.title ||
      !newProperties.description ||
      !newProperties.property_type ||
      !newProperties.price ||
      !newProperties.images.length ||
      !newProperties.address ||
      !newProperties.beds ||
      !newProperties.bath ||
      !newProperties.area ||
      !newProperties.status
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/property/${editingProperties._id}`,
        newProperties,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProperties(
        properties.map((properties) =>
          properties._id === editingProperties._id
            ? response.data.data
            : properties
        )
      );
      setEditingProperties(null);
      setNewProperties({
        title: "",
        images: [], // reset
        description: "",
        area: "",
        address: "",
        status: "",
        price: "",
        property_type: "",
        beds: "",
        bath: "",
      });
      setShowForm(false);
      setNotification({ message: "Cập nhật thành công!", type: "success" });
    } catch (error) {
      console.error("Error updating properties:", error);
      setError(error.response?.data?.message || "Failed to update properties.");
    }
  };

  const handleUploadSuccess = (url, publicId) => {
    setNewProperties((prev) => ({
      ...prev,
      images: [...prev.images, url], // Thêm ảnh vào mảng
    }));
  };

  const filteredProperties = properties.filter((properties) => {
    const matchesSearchTerm = properties.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      (location.pathname === "/buy" && properties.status === "Đang bán") ||
      (location.pathname === "/rent" && properties.status === "Cho thuê") ||
      !["/buy", "/rent"].includes(location.pathname);

    return matchesSearchTerm && matchesStatus;
  });
  const handleDeleteImage = (index) => {
    setNewProperties((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index); // Lọc bỏ ảnh tại chỉ số được chọn
      return { ...prev, images: updatedImages }; // Cập nhật trạng thái
    });
  };
  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-between align-items-center ">
          <h2>Danh sách bất động sản</h2>
          <button
            className="btn-create"
            onClick={() => {
              setShowForm(true);
              setEditingProperties(null);
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {error && <div className="error-message text-danger">{error}</div>}
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Tìm kiếm bất động sản..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{ height: "40px" }}
          />
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {notification.message && (
        <div
          className={`alert alert-${
            notification.type === "error" ? "danger" : "success"
          } d-flex justify-content-between align-items-center`}
        >
          {notification.message}
          <button className="btn-close" onClick={handleCloseNotification}>
            &times;
          </button>
        </div>
      )}
      {showForm && (
        <div className="mb-3">
          <h4>
            {editingProperties ? "Cập nhật bất động sản" : "Thêm bất động sản"}
          </h4>
          <div className="input-group">
            <input
              type="text"
              placeholder="Tiêu đề"
              value={newProperties.title || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={newProperties.address || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, address: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Giá"
              value={newProperties.price || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, price: e.target.value })
              }
            />
            <textarea
              placeholder="Mô tả"
              value={newProperties.description || ""}
              onChange={(e) =>
                setNewProperties({
                  ...newProperties,
                  description: e.target.value,
                })
              }
              rows="4"
              style={{ resize: "vertical", width: "100%" }}
            />

            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "djlc7ihxv",
                uploadPreset: "estate",
                multiple: true, // Cho phép tải nhiều ảnh
                maxImageFileSize: 2000000,
                folder: "projects",
              }}
              setAvatar={handleUploadSuccess}
            />
            {newProperties.images.length > 0 && (
              <div>
                {newProperties.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={image}
                      alt="Bất động sản"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      onClick={() => handleDeleteImage(index)} // Gọi hàm xóa ảnh
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "transparent",
                        border: "1px solid black",
                        backgroundColor: "#ccc",
                        color: "white",
                        fontWeight: "1000px",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      &times; {/* Dấu X */}
                    </button>
                  </div>
                ))}
              </div>
            )}
            <select
              value={newProperties.property_type || ""}
              onChange={(e) =>
                setNewProperties({
                  ...newProperties,
                  property_type: e.target.value,
                })
              }
            >
              <option value="">Chọn loại bất động sản</option>
              <option value="Nhà ở">Nhà ở</option>
              <option value="Căn hộ">Căn hộ</option>
              <option value="Chung cư">Chung cư</option>
              <option value="Biệt thự">Biệt thự</option>
              <option value="Vinhomes">Vinhomes</option>
            </select>
            <input
              type="number"
              placeholder="Diện tích"
              value={newProperties.area || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, area: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Phòng ngủ"
              value={newProperties.beds || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, beds: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Phòng tắm"
              value={newProperties.bath || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, bath: e.target.value })
              }
            />

            <select
              value={newProperties.status || ""}
              onChange={(e) =>
                setNewProperties({ ...newProperties, status: e.target.value })
              }
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đang bán">Đang bán</option>
              <option value="Cho thuê">Cho thuê</option>
            </select>
            <button onClick={editingProperties ? handleUpdate : handleAdd}>
              {editingProperties ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Hình</th>
              <th>Tiêu đề</th>
              <th>Địa chỉ</th>
              <th>Giá</th>
              <th>Loại bất động sản</th>
              <th>Mô tả</th>
              <th>Diện tích</th>
              <th>Phòng ngủ</th>
              <th>Phòng tắm</th>
              <th>Trạng thái</th>
              <th>ID user</th>
              <th style={{ width: "180px" }}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((properties) => (
                <tr key={properties._id}>
                  <td>{properties._id}</td>
                  <td>
                    {properties.images.length > 0 && (
                      <img
                        src={properties.images[0]} // Chỉ hiển thị ảnh đầu tiên
                        alt={`${properties.title} ảnh 1`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          margin: "5px",
                        }}
                      />
                    )}
                  </td>
                  <td>{properties.title}</td>
                  <td>{properties.address}</td>
                  <td>{properties.price}</td>
                  <td>{properties.property_type}</td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {properties.description}
                  </td>
                  <td>{properties.area} ha</td>
                  <td>{properties.beds}</td>
                  <td>{properties.bath}</td>
                  <td>{properties.status}</td>
                  <td>
                    {properties.idUser ? properties.idUser._id : "Unknown"}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(properties)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(properties._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  Không tìm thấy dự án
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(Math.ceil(total / limit))].map((_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(total / limit))
                )
              }
              disabled={currentPage >= Math.ceil(total / limit)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PropertyForm;
