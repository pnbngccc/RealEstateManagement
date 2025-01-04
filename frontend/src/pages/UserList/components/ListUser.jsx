import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./List.css";
import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
import { UserContext } from "../../../untils/Context.jsx";

const UserList = () => {
  const { currentUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    fullname: "",
    role: "",
    phone: "",
    avatar: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" }); // State cho thông báo
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  const fetchUsers = async (page = 1, limit = 10) => {
    const token = currentUser?.token;
    if (!token) {
      setNotification({
        message: "Token không hợp lệ hoặc không tồn tại.",
        type: "error",
      });
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/users", {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data || []);
      setTotal(response.data.meta.total);
      setCurrentPage(page);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to fetch users.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, limit);
  }, [currentPage, limit]);

  const handleEdit = (currentUser) => {
    setEditingUser(currentUser);
    setNewUser({
      username: currentUser.username || "",
      role: currentUser.role || "",
      avatar: currentUser.avatar || "",
      phone: currentUser.phone || "",
      fullname: currentUser.fullname || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = currentUser?.token;
    if (!token) {
      setNotification({
        message: "Token không hợp lệ hoặc không tồn tại.",
        type: "error",
      });
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      setNotification({ message: "Xóa thành công!", type: "success" });
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Xóa không thành công.",
        type: "error",
      });
    }
  };

  const handleUpdate = async () => {
    if (
      !editingUser ||
      !newUser.fullname ||
      !newUser.username ||
      !newUser.role ||
      !newUser.avatar ||
      !newUser.phone
    ) {
      setNotification({
        message: "Tất cả các trường đều cần thiết!",
        type: "error",
      });
      return;
    }

    const token = currentUser?.token;
    if (!token) {
      setNotification({
        message: "Token không hợp lệ hoặc không tồn tại.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${editingUser._id}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? response.data : user
        )
      );
      setEditingUser(null);
      setNewUser({
        fullname: "",
        username: "",
        role: "",
        avatar: "",
        phone: "",
      });
      setShowForm(false);
      setNotification({ message: "Cập nhật thành công!", type: "success" });
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Cập nhật không thành công.",
        type: "error",
      });
    }
  };

  const handleUploadSuccess = (url) => {
    setNewUser({ ...newUser, avatar: url });
  };

  const filteredUsers = users.filter(
    (user) =>
      user &&
      user.role !== "admin" &&
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" }); // Đóng thông báo
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách người dùng</h2>

        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Tìm kiếm người dùng..."
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
          <h4>{editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}</h4>
          <div className="input-group">
            <input
              type="text"
              placeholder="Họ và tên"
              value={newUser.fullname || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, fullname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={newUser.username || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={newUser.phone || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Vai trò"
              value={newUser.role || ""}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "djlc7ihxv",
                uploadPreset: "estate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "avatars",
              }}
              setAvatar={handleUploadSuccess}
            />
            {newUser.avatar && (
              <div className="avatar-preview">
                <img
                  src={newUser.avatar}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
            <button onClick={editingUser ? handleUpdate : null}>
              {editingUser ? "Cập nhật" : "Thêm"}
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
              <th>Avatar</th>
              <th>Họ và tên</th>
              <th>Tên đăng nhập</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{user.fullname}</td>
                  <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có người dùng nào
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

export default UserList;
