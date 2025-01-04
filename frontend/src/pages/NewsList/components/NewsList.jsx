// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./News.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

// const NewForm = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingNews, setEditingNews] = useState(null);
//   const [newNews, setNewNews] = useState({
//     title: "",
//     description: "",
//     image: "",
//     publicId: "",
//     published_date: "",
//     status: "",
//   });
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false); // Khởi tạo showForm là false
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10); // Số lượng bản ghi trên mỗi trang
//   // Fetch properties from API
//   const fetchNews = async (page = 1, limit = 10) => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/news", {
//         params: { page, limit },
//         withCredentials: true,
//       });
//       setNews(response.data.data || []);
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
//     fetchNews(currentPage, limit);
//   }, [currentPage, limit]); // Include 'limit' here

//   const handleEdit = (News) => {
//     setEditingNews(News);
//     setNewNews({
//       title: News.title || "",
//       description: News.description || "",
//       image: News.image || "",
//       publicId: News.publicId || "",
//       published_date: News.published_date || "",
//       status: News.status || "",
//     });
//     setShowForm(true); // Hiển thị form khi chỉnh sửa
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/news/${id}`, {
//         withCredentials: true,
//       });
//       setNews(news.filter((News) => News._id !== id));
//     } catch (error) {
//       console.error("Error deleting property:", error);
//       setError(error.response?.data?.message || "Failed to delete property.");
//     }
//   };

//   const handleAdd = async () => {
//     if (
//       !newNews.title ||
//       !newNews.description ||
//       !newNews.image ||
//       !newNews.published_date
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     // Thiết lập status thành "Đã đăng"
//     const updatedNews = { ...newNews, status: "Đã đăng" };
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/news/",
//         updatedNews,
//         {
//           withCredentials: true,
//         }
//       );
//       setNews([...news, response.data.data]);
//       setNewNews({
//         title: "",
//         description: "",
//         image: "",
//         publicId: "",
//         published_date: "",
//         status: "Đã đăng", // Thiết lập status thành "đã đăng"
//       });
//       setShowForm(false); // Ẩn form sau khi thêm
//     } catch (error) {
//       console.error("Error adding property:", error);
//       setError(error.response?.data?.message || "Failed to add property.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingNews ||
//       !newNews.title ||
//       !newNews.description ||
//       !newNews.image ||
//       !newNews.published_date ||
//       !newNews.status
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/news/${editingNews._id}`,
//         newNews,
//         {
//           withCredentials: true,
//         }
//       );
//       setNews(
//         news.map((News) =>
//           News._id === editingNews._id ? response.data.data : News
//         )
//       );
//       setEditingNews(null);
//       setNewNews({
//         title: "",
//         description: "",
//         image: "",
//         publicId: "",
//         published_date: "",
//         status: "Đã đăng", // Thiết lập status thành "đã đăng"
//       });
//       setShowForm(false); // Ẩn form sau khi cập nhật
//     } catch (error) {
//       console.error("Error updating news:", error);
//       setError(error.response?.data?.message || "Failed to update news.");
//     }
//   };

//   const handleUploadSuccess = (url, publicId) => {
//     setNewNews({ ...newNews, image: url, publicId });
//   };

//   const filteredProperties = news.filter((property) => {
//     const matchesSearchTerm = property.title //tìm kiếm theo tiêu đề bất động sản
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return matchesSearchTerm;
//   });
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex justify-content-between align-items-center ">
//           <h2>Danh sách tin tức</h2>
//           <button
//             className="btn-create"
//             onClick={() => {
//               setShowForm(true);
//               setEditingNews(null);
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
//             placeholder="Tìm kiếm tin tức..."
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
//           <h4>{editingNews ? "Update Property" : "Add Property"}</h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newNews.title || ""}
//               onChange={(e) =>
//                 setNewNews({ ...newNews, title: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Description"
//               value={newNews.description || ""}
//               onChange={(e) =>
//                 setNewNews({ ...newNews, description: e.target.value })
//               }
//               rows="4" // Số dòng hiển thị
//               style={{ resize: "vertical", width: "100%" }} // Cho phép thay đổi kích thước
//             />
//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv", // Thay bằng thông tin Cloudinary của bạn
//                 uploadPreset: "estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "news",
//               }}
//               setAvatar={(url) => handleUploadSuccess(url, "")}
//             />
//             {newNews.image && (
//               <div>
//                 <img
//                   src={newNews.image}
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
//             <input
//               type="date"
//               placeholder="Published_date"
//               value={newNews.published_date || ""}
//               onChange={(e) =>
//                 setNewNews({
//                   ...newNews,
//                   published_date: e.target.value,
//                 })
//               }
//             />

//             <button onClick={editingNews ? handleUpdate : handleAdd}>
//               {editingNews ? "Update" : "Add"}
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
//               <th>Nội dung</th>
//               <th>Ngày</th>
//               <th>Trạng thái</th>
//               <th>ID User</th>
//               <th style={{ width: "230px" }}>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProperties.length > 0 ? (
//               filteredProperties.map((News) => (
//                 <tr key={News._id}>
//                   <td>{News._id}</td>
//                   <td>
//                     <img
//                       src={News.image}
//                       alt={News.title}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>{News.title}</td>
//                   <td
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {News.description}
//                   </td>
//                   <td>{News.published_date}</td>
//                   <td>{News.status}</td>
//                   <td>{News.idAuthor ? News.idAuthor._id : "Unknown"}</td>

//                   <td style={{ width: "230px" }}>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(News)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(News._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center">
//                   Tin tức không tìm thấy
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

// export default NewForm;

import { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";
import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

const NewForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [newNews, setNewNews] = useState({
    title: "",
    description: "",
    images: [], // Thay đổi từ image sang images
    publicIds: [], // Mảng publicId
    published_date: "",
    status: "",
  });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Fetch news from API
  const fetchNews = async (page = 1, limit = 10) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/news", {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(response.data.data || []);
      setTotal(response.data.meta.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.response?.data?.message || "Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage, limit);
  }, [currentPage, limit]);

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setNewNews({
      title: newsItem.title || "",
      description: newsItem.description || "",
      images: newsItem.images || [], // Lưu trữ mảng ảnh
      publicIds: newsItem.publicIds || [], // Lưu trữ mảng publicId
      published_date: newsItem.published_date || "",
      status: newsItem.status || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(news.filter((newsItem) => newsItem._id !== id));
      setNotification({ message: "Xóa thành công!", type: "success" });
    } catch (error) {
      console.error("Error deleting news:", error);
      setError(error.response?.data?.message || "Failed to delete news.");
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  const handleAdd = async () => {
    if (
      !newNews.title ||
      !newNews.description ||
      !newNews.images.length ||
      !newNews.published_date
    ) {
      alert("Vui lòng nhập hết tất cả các trường!");
      return;
    }
    const updatedNews = { ...newNews, status: "Đã đăng" };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/news/",
        updatedNews,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNews([...news, response.data.data]);
      setNewNews({
        title: "",
        description: "",
        images: [],
        publicIds: [],
        published_date: "",
        status: "Đã đăng",
      });
      setShowForm(false);
      setNotification({ message: "Thêm thành công!", type: "success" });
    } catch (error) {
      console.error("Error adding news:", error);
      setError(error.response?.data?.message || "Failed to add news.");
    }
  };

  const handleUpdate = async () => {
    if (
      !editingNews ||
      !newNews.title ||
      !newNews.description ||
      !newNews.images.length ||
      !newNews.published_date ||
      !newNews.status
    ) {
      alert("Tất cả các trường đều bắt buộc!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/news/${editingNews._id}`,
        newNews,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNews(
        news.map((newsItem) =>
          newsItem._id === editingNews._id ? response.data.data : newsItem
        )
      );
      setEditingNews(null);
      setNewNews({
        title: "",
        description: "",
        images: [],
        publicIds: [],
        published_date: "",
        status: "Đã đăng",
      });
      setShowForm(false);
      setNotification({ message: "Cập nhật thành công!", type: "success" });
    } catch (error) {
      console.error("Error updating news:", error);
      setError(error.response?.data?.message || "Failed to update news.");
    }
  };

  const handleUploadSuccess = (url, publicId) => {
    setNewNews((prev) => ({
      ...prev,
      images: [...prev.images, url],
      publicIds: [...prev.publicIds, publicId],
    }));
  };

  const filteredProperties = news.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteImage = (index) => {
    setNewNews((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index); // Lọc bỏ ảnh tại chỉ số được chọn
      return { ...prev, images: updatedImages }; // Cập nhật trạng thái
    });
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-between align-items-center ">
          <h2>Danh sách tin tức</h2>
          <button
            className="btn-create"
            onClick={() => {
              setShowForm(true);
              setEditingNews(null);
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
            placeholder="Tìm kiếm tin tức..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <h4>{editingNews ? "Cập nhật tin tức" : "Thêm tin tức"}</h4>
          <div className="input-group">
            <input
              type="text"
              placeholder="Tiêu đề"
              value={newNews.title}
              onChange={(e) =>
                setNewNews({ ...newNews, title: e.target.value })
              }
            />
            <textarea
              placeholder="Nội dung"
              value={newNews.description}
              onChange={(e) =>
                setNewNews({ ...newNews, description: e.target.value })
              }
              rows="4"
              style={{ resize: "vertical", width: "100%" }}
            />
            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "djlc7ihxv",
                uploadPreset: "estate",
                multiple: true, // Cho phép tải lên nhiều ảnh
                maxImageFileSize: 2000000,
                folder: "news",
              }}
              setAvatar={handleUploadSuccess}
            />
            {newNews.images.length > 0 && (
              <div>
                {newNews.images.map((image, index) => (
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
            <input
              type="date"
              placeholder="Ngày xuất bản"
              value={newNews.published_date}
              onChange={(e) =>
                setNewNews({ ...newNews, published_date: e.target.value })
              }
            />
            <button onClick={editingNews ? handleUpdate : handleAdd}>
              {editingNews ? "Cập nhật" : "Thêm"}
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
              <th>Nội dung</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>ID User</th>
              <th style={{ width: "230px" }}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((newsItem) => (
                <tr key={newsItem._id}>
                  <td>{newsItem._id}</td>
                  <td>
                    {newsItem.images.length > 0 ? (
                      <img
                        src={newsItem.images[0]} // Hiển thị hình ảnh đầu tiên
                        alt={newsItem.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      "Không có hình"
                    )}
                  </td>
                  <td>{newsItem.title}</td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {newsItem.description}
                  </td>
                  <td>{newsItem.published_date}</td>
                  <td>{newsItem.status}</td>
                  <td>
                    {newsItem.idAuthor ? newsItem.idAuthor._id : "Unknown"}
                  </td>
                  <td style={{ width: "230px" }}>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(newsItem)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(newsItem._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Tin tức không tìm thấy
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

export default NewForm;
