import { useState, useEffect } from "react";
import axios from "axios";
import CloudinaryUploadWidget from "../../../components/UpdateImages/UpdateImages";
import { useLocation } from "react-router-dom";

const PostForm = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingPost, setEditingPost] = useState(null);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    property_type: "",
    status: "",
    area: "",
    beds: "",
    bath: "",
    address: "",
    images: [],
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
      const response = await axios.get("http://localhost:5000/api/post", {
        params: { page, search },
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      setErrorMessage("Error fetching posts.");
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/post/",
        { ...newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetForm(); // Đặt lại form sau khi thêm bài đăng thành công
      fetchPosts();
      setShowForm(false);
    } catch (error) {
      setErrorMessage("Error adding post.");
      console.error("Error adding post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title || "",
      description: post.description || "",
      address: post.address || "",
      property_type: post.property_type || "",
      area: post.area || "",
      beds: post.beds || "",
      bath: post.bath || "",
      status: post.status || "",
      images: Array.isArray(post.images) ? post.images : [], // Đảm bảo là mảng
    });
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !editingPost ||
      !newPost.title ||
      !newPost.address ||
      !newPost.property_type ||
      !newPost.beds ||
      !newPost.area ||
      !newPost.bath ||
      !newPost.status
    ) {
      alert("Tất cả các trường đều cần thiết!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/post/${editingPost._id}`, // Assuming post ID is included in editingPost
        { ...newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      resetForm();
      fetchPosts();
    } catch (error) {
      setErrorMessage("Error updating post.");
      console.error("Error updating post:", error);
    }
  };

  const resetForm = () => {
    setNewPost({
      title: "",
      description: "",
      property_type: "",
      status: "",
      area: "",
      beds: "",
      bath: "",
      address: "",
      images: [],
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      setErrorMessage("Error deleting post.");
      console.error("Error deleting post:", error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearchTerm = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      (location.pathname === "/buy" && post.status === "Đang bán") ||
      (location.pathname === "/rent" && post.status === "Cho thuê") ||
      !["/buy", "/rent"].includes(location.pathname);

    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-between align-items-center ">
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
        <div className="mb-3">
          <h4>{editingPost ? "Cập nhật bất động sản" : "Thêm bất động sản"}</h4>
          <div className="input-group">
            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "djlc7ihxv",
                uploadPreset: "estate",
                multiple: true,
              }}
              setImages={(uploadedImages) => {
                const uploadedUrls = uploadedImages.map(
                  (img) => img.secure_url
                ); // Lấy URL của hình ảnh đã tải lên
                setNewPost((prevPost) => {
                  const updatedPost = {
                    ...prevPost,
                    images: [...prevPost.images, ...uploadedUrls],
                  };
                  console.log("Updated newPost with images:", updatedPost); // Kiểm tra trạng thái cập nhật
                  return updatedPost;
                });
              }}
            />
            <div>
              {Array.isArray(newPost.images) && newPost.images.length > 0 ? (
                newPost.images.map((image, index) => (
                  <div
                    key={index}
                    style={{ display: "inline-block", margin: "10px" }}
                  >
                    <img src={image} alt={`Uploaded ${index}`} width="100" />
                  </div>
                ))
              ) : (
                <p>Chưa có hình ảnh.</p>
              )}
            </div>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Tiêu đề"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nội dung"
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Địa chỉ"
              value={newPost.address}
              onChange={(e) =>
                setNewPost({ ...newPost, address: e.target.value })
              }
              required
            />
            <select
              value={newPost.property_type}
              onChange={(e) =>
                setNewPost({ ...newPost, property_type: e.target.value })
              }
              className="form-control mb-2"
              required
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
              required
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Phòng ngủ"
              value={newPost.beds}
              onChange={(e) => setNewPost({ ...newPost, beds: e.target.value })}
              required
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Phòng tắm"
              value={newPost.bath}
              onChange={(e) => setNewPost({ ...newPost, bath: e.target.value })}
              required
            />
            <select
              className="form-control mb-2"
              value={newPost.status}
              onChange={(e) =>
                setNewPost({ ...newPost, status: e.target.value })
              }
              required
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đang bán">Đang bán</option>
              <option value="Cho thuê">Cho thuê</option>
            </select>
          </div>
          <button onClick={editingPost ? handleUpdate : handleAddPost}>
            {editingPost ? "Cập nhật" : "Thêm"}
          </button>
        </div>
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
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>
                  {post.images && post.images.length > 0 ? (
                    <img
                      src={`https://res.cloudinary.com/djlc7ihxv/image/upload/${post.images[0]}`}
                      alt={post.title}
                      width="100"
                    />
                  ) : (
                    <p>No image</p>
                  )}
                </td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.address}</td>
                <td>{post.price}</td>
                <td>{post.property_type}</td>
                <td>{post.beds}</td>
                <td>{post.bath}</td>
                <td>{post.area}</td>
                <td>{post.status}</td>
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
              <td colSpan="8" className="text-center">
                No posts available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
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
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PostForm;
