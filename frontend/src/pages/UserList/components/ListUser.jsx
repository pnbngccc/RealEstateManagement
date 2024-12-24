// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "./List.css";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
// import { UserContext } from "../../../untils/Context.jsx";

// const UserList = () => {
//   const { currentUser } = useContext(UserContext); // Sử dụng currentUser
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     role: "",
//     phone: "",
//     avatar: "",
//   });
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [limit] = useState(10); // Số lượng bản ghi trên mỗi trang

//   // Fetch users from API
//   const fetchUsers = async (page = 1, limit = 10) => {
//     try {
//       const response = await axios.get("http://localhost:5000/users", {
//         params: { page, limit }, // Pass page and limit as parameters
//         withCredentials: true,
//       });
//       console.log("Response data:", response.data);

//       // Giả sử cấu trúc của dữ liệu là response.data
//       if (response.data && Array.isArray(response.data)) {
//         setUsers(response.data); // Cập nhật state với danh sách người dùng
//       } else {
//         console.log("No user data found");
//         setUsers(response.data.data || []);

//         // setUsers([]); // Đặt lại thành mảng rỗng nếu không tìm thấy dữ liệu
//         setTotal(response.data.meta.total); // Lưu tổng số bất động sản
//         setCurrentPage(page); // Cập nhật trang hiện tại
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError(error.response?.data?.message || "Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchUsers(currentPage, limit);
//   }, [currentPage, limit]); // Include 'limit' here

//   const handleEdit = (currentUser) => {
//     setEditingUser(currentUser);
//     setNewUser({
//       username: currentUser.username || "",
//       role: currentUser.role || "",
//       avatar: currentUser.avatar || "",
//       phone: currentUser.phone || "",
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/${id}`, {
//         withCredentials: true,
//       });
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       setError(error.response?.data?.message || "Failed to delete user.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (
//       !editingUser ||
//       !newUser.username ||
//       !newUser.role ||
//       !newUser.avatar ||
//       !newUser.phone
//     ) {
//       alert("Tất cả các trường đều cần thiết!");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/users/${editingUser._id}`,
//         newUser,
//         {
//           withCredentials: true,
//         }
//       );

//       // Sử dụng dữ liệu mới nhất từ response để cập nhật state
//       setUsers(
//         users.map(
//           (user) => (user._id === editingUser._id ? response.data : user) // Cập nhật đúng người dùng
//         )
//       );

//       // Reset các trường
//       setEditingUser(null);
//       setNewUser({
//         username: "",
//         role: "",
//         avatar: "",
//         phone: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       setError(error.response?.data?.message || "Failed to update user.");
//     }
//   };

//   const handleUploadSuccess = (url) => {
//     setNewUser({ ...newUser, avatar: url });
//   };

//   // Filter users by search term
//   const filteredUsers = users.filter(
//     (user) =>
//       user &&
//       user.role !== "admin" && // Loại bỏ người dùng có vai trò admin
//       user.username &&
//       user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Danh sách người dùng</h2>
//         {error && <div className="error-message text-danger">{error}</div>}
//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Tìm kiếm người dùng..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ height: "40px" }}
//           />
//           <button className="btn-search">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//       </div>
//       {showForm && (
//         <div className="mb-3">
//           <h4>{editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}</h4>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Username"
//               value={newUser.username || ""}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, username: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="phone"
//               value={newUser.phone || ""}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, phone: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Role"
//               value={newUser.role || ""}
//               onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//             />
//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "djlc7ihxv",
//                 uploadPreset: "estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "avatars",
//               }}
//               setAvatar={handleUploadSuccess}
//             />
//             {newUser.avatar && (
//               <div className="avatar-preview">
//                 <img
//                   src={newUser.avatar}
//                   alt="Avatar"
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     marginTop: "10px",
//                   }}
//                 />
//               </div>
//             )}
//             <button onClick={editingUser ? handleUpdate : null}>
//               {editingUser ? "Cập nhật" : "Thêm"}
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
//               <th>Username</th>
//               <th>Số điện thoại</th>
//               <th>Vai trò</th>
//               <th>Avatar</th>
//               <th>Chức năng</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr key={user._id}>
//                   <td>{user._id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.phone}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <img
//                       src={user.avatar}
//                       alt={user.username}
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(user)}
//                     >
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   Không có người dùng nào
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

// export default UserList;
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./List.css";
import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";
import { UserContext } from "../../../untils/Context.jsx";

const UserList = () => {
  const { currentUser } = useContext(UserContext); // Sử dụng currentUser
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    role: "",
    phone: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10); // Số lượng bản ghi trên mỗi trang

  // Fetch users from API
  const fetchUsers = async (page = 1, limit = 10) => {
    const token = currentUser?.token; // Giả sử token được lưu trong currentUser
    if (!token) {
      setError("Token không hợp lệ hoặc không tồn tại.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/users", {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`, // Thay thế yourToken bằng token thực tế
        },
      });
      console.log("Response data:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data); // Cập nhật state với danh sách người dùng
      } else {
        console.log("No user data found");
        setUsers(response.data.data || []);
        setTotal(response.data.meta.total); // Lưu tổng số người dùng
        setCurrentPage(page); // Cập nhật trang hiện tại
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.response?.data?.message || "Failed to fetch users.");
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
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = currentUser?.token; // Lấy token
    if (!token) {
      setError("Token không hợp lệ hoặc không tồn tại.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token khi xóa
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const handleUpdate = async () => {
    if (
      !editingUser ||
      !newUser.username ||
      !newUser.role ||
      !newUser.avatar ||
      !newUser.phone
    ) {
      alert("Tất cả các trường đều cần thiết!");
      return;
    }

    const token = currentUser?.token; // Lấy token
    if (!token) {
      setError("Token không hợp lệ hoặc không tồn tại.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${editingUser._id}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token khi cập nhật
          },
        }
      );

      setUsers(
        users.map(
          (user) => (user._id === editingUser._id ? response.data : user) // Cập nhật đúng người dùng
        )
      );

      setEditingUser(null);
      setNewUser({
        username: "",
        role: "",
        avatar: "",
        phone: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.response?.data?.message || "Failed to update user.");
    }
  };

  const handleUploadSuccess = (url) => {
    setNewUser({ ...newUser, avatar: url });
  };

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user &&
      user.role !== "admin" && // Loại bỏ người dùng có vai trò admin
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách người dùng</h2>
        {error && <div className="error-message text-danger">{error}</div>}
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

      {showForm && (
        <div className="mb-3">
          <h4>{editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}</h4>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Role"
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
              <th>Username</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Avatar</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
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
