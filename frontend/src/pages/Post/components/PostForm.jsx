import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UploadImages from "../../../components/UpdateImages/UpdateImages";
import { UserContext } from "../../../untils/Context";

const PostForm = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingPost, setEditingPost] = useState(null);
  const [images, setImages] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    property_type: "",
    status: "",
    price: "",
    area: "",
    beds: "",
    bath: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/property", {
        params: {
          page: 1, // Lấy trang 1
          limit: 10, // Giới hạn 10 bài viết
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched posts:", response.data); // Ghi log dữ liệu nhận được
      setPosts(response.data.data || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      setErrorMessage("Lỗi khi lấy danh sách bài viết. Vui lòng thử lại.");
      console.error("Lỗi khi lấy danh sách bài viết:", error);
    }
  };

  const validatePost = () => {
    console.log(newPost);
    return (
      newPost.title &&
      newPost.address &&
      newPost.price &&
      newPost.description &&
      newPost.property_type &&
      newPost.beds &&
      newPost.area &&
      newPost.bath &&
      newPost.status
    );
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!validatePost()) {
      alert("Tất cả các trường đều là bắt buộc!");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const formattedImages = images;

      await axios.post(
        "http://localhost:5000/api/property/",
        { ...newPost, images: formattedImages },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetForm();
      await fetchPosts(); // Đảm bảo gọi await để đợi dữ liệu mới
      setShowForm(false);
    } catch (error) {
      setErrorMessage(
        "Lỗi khi thêm bài viết. Vui lòng kiểm tra lại thông tin."
      );
      console.error("Lỗi khi thêm bài viết:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title || "",
      description: post.description || "",
      address: post.address || "",
      price: post.price || "",
      property_type: post.property_type || "",
      area: post.area || "",
      beds: post.beds || "",
      bath: post.bath || "",
      status: post.status || "",
    });
    setImages(post.images || []);
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validatePost()) {
      alert("Tất cả các trường đều là bắt buộc!");
      return;
    }

    // Kiểm tra nếu không có hình ảnh nào được upload
    if (images.length === 0) {
      alert("Vui lòng cập nhật hình ảnh trước khi lưu!");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const formattedImages = images;
      console.log(formattedImages);

      await axios.put(
        `http://localhost:5000/api/property/${editingPost._id}`,
        { ...newPost, images: formattedImages },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetForm();
      fetchPosts();
    } catch (error) {
      setErrorMessage(
        "Lỗi khi cập nhật bài viết. Vui lòng kiểm tra lại thông tin."
      );
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  const resetForm = () => {
    setNewPost({
      title: "",
      price: "",
      description: "",
      property_type: "",
      status: "",
      area: "",
      beds: "",
      bath: "",
      address: "",
    });
    setImages([]);
    setEditingPost(null);
    setShowForm(false);
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      setErrorMessage("Lỗi khi xóa bài viết. Vui lòng thử lại.");
      console.error("Lỗi khi xóa bài viết:", error);
    }
  };

  const filteredPosts = posts.filter((property) => {
    const matchesSearchTerm = property.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      (location.pathname === "/buy" && property.status === "Đang bán") ||
      (location.pathname === "/rent" && property.status === "Cho thuê") ||
      !["/buy", "/rent"].includes(location.pathname);

    // Sử dụng currentUser để lọc
    const matchesAuthor =
      property.idUser && property.idUser._id === currentUser._id; // Kiểm tra idUser trùng với currentUser._id

    return matchesSearchTerm && matchesStatus && matchesAuthor; // Thêm điều kiện vào
  });
  const handleDeleteImage = (index) => {
    setNewPost((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index); // Lọc bỏ ảnh tại chỉ số được chọn
      return { ...prev, images: updatedImages }; // Cập nhật trạng thái
    });
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Danh sách bất động sản</h2>
          <button className="btn-create" onClick={() => setShowForm(true)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {errorMessage && (
          <div className="error-message text-danger">{errorMessage}</div>
        )}
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Tìm kiếm bất động sản..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: "40px" }}
          />
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {showForm && (
        <form
          className="mb-3"
          onSubmit={editingPost ? handleUpdate : handleAddPost}
        >
          <h4>{editingPost ? "Cập nhật bất động sản" : "Thêm bất động sản"}</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Tiêu đề"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Giá"
            value={newPost.price}
            onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
          />
          <textarea
            type="text"
            className="form-control mb-2"
            placeholder="Nội dung"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            rows="4"
            style={{ resize: "vertical", width: "100%" }}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Địa chỉ"
            value={newPost.address}
            onChange={(e) =>
              setNewPost({ ...newPost, address: e.target.value })
            }
          />
          <select
            value={newPost.property_type}
            onChange={(e) =>
              setNewPost({ ...newPost, property_type: e.target.value })
            }
            className="form-control mb-2"
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
            className="form-control mb-2"
            placeholder="Diện tích"
            value={newPost.area}
            onChange={(e) => setNewPost({ ...newPost, area: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Phòng ngủ"
            value={newPost.beds}
            onChange={(e) => setNewPost({ ...newPost, beds: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Phòng tắm"
            value={newPost.bath}
            onChange={(e) => setNewPost({ ...newPost, bath: e.target.value })}
          />
          <select
            className="form-control mb-2"
            value={newPost.status}
            onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
          >
            <option value="">Chọn trạng thái</option>
            <option value="Đang bán">Đang bán</option>
            <option value="Cho thuê">Cho thuê</option>
          </select>

          <UploadImages
            uwConfig={{
              cloudName: "djlc7ihxv",
              uploadPreset: "estate",
              multiple: true,
              folder: "post",
            }}
            setState={setImages}
          />
          {images.map((image, index) => (
            <img src={image} alt={`Upload ${index}`} key={index} width="100" />
          ))}
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

          <button type="submit">{editingPost ? "Cập nhật" : "Thêm"}</button>
        </form>
      )}

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Địa chỉ</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Phòng ngủ</th>
            <th>Phòng tắm</th>
            <th>Diện tích</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
            <th>ID Người Dùng</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>
                  {post.images && post.images.length > 0 ? (
                    <img src={post.images[0]} alt={post.title} width="100" />
                  ) : (
                    <p>No image</p>
                  )}
                </td>
                <td>{post.title}</td>
                <td
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.description}
                </td>
                <td>{post.address}</td>
                <td>{post.price}</td>
                <td>{post.property_type}</td>
                <td>{post.beds}</td>
                <td>{post.bath}</td>
                <td>{post.area}</td>
                <td>{post.status}</td>
                <td>{post.idUser ? post.idUser._id : "Unknown"}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(post)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(post._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">
                Không có bài viết nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Trước
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              className={`page-item ${page === index + 1 ? "active" : ""}`}
              key={index}
            >
              <button className="page-link" onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Tiếp theo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PostForm;
