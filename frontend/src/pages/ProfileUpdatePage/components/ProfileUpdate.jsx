// import { useContext, useState } from "react";
// import { UserContext } from "../../../untils/Context.jsx";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import noavt from "@assets/images/noavt.jpg";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

// const ProfilePage = () => {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const [error, setError] = useState("");
//   const [avatar, setAvatar] = useState(currentUser.avatar);
//   const navigate = useNavigate();

//   // Kiểm tra nếu currentUser có giá trị
//   console.log("Current User:", currentUser); // Debug log

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const { username, password, role } = Object.fromEntries(formData);

//     // Kiểm tra xem currentUser có id không
//     if (!currentUser || !currentUser._id) {
//       console.error(
//         "User ID is undefined. Cannot update profile.",
//         currentUser
//       );
//       setError("User ID is undefined. Cannot update profile.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/users/${currentUser._id}`, // ID người dùng
//         { username, password, role },
//         {
//           withCredentials: true, // Cho phép gửi cookie JWT
//         }
//       );

//       // Cập nhật thông tin người dùng
//       setCurrentUser(response.data);
//       navigate("/profile");
//     } catch (error) {
//       console.error("Update error:", error);
//       setError(error.response?.data?.message || "Failed to update profile.");
//     }
//   };

//   if (!currentUser) {
//     return <div>Loading...</div>; // Hoặc chuyển hướng đến trang đăng nhập
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Cập Nhật Hồ Sơ</h2>
//       {error && <div className="error-message">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             name="username"
//             defaultValue={currentUser.username}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             placeholder="Nhập password"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="role" className="form-label">
//             Role
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="role"
//             name="role"
//             defaultValue={currentUser.role}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <img src={avatar || noavt} alt="Avatar" />
//           <CloudinaryUploadWidget
//             uwConfig={{
//               cloudName: "djlc7ihxv",
//               uploadPresent: "estate",
//               multiple: false,
//               maxImageFileSize: 2000000,
//               folder: "avatars",
//             }}
//             setAvatar={setAvatar}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Cập Nhật
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../../untils/Context.jsx";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import noavt from "@assets/images/noavt.jpg";
// import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

// const ProfilePage = () => {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const [error, setError] = useState("");
//   const [avatar, setAvatar] = useState(currentUser.avatar);
//   const [publicId, setPublicId] = useState(""); // Thêm dòng này vào ProfilePage
//   const navigate = useNavigate();

//   // Kiểm tra nếu currentUser có giá trị
//   console.log("Current User:", currentUser); // Debug log
//   useEffect(() => {
//     if (currentUser) {
//       setAvatar(currentUser.avatar); // Cập nhật avatar từ currentUser
//     }
//   }, [currentUser]);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const { username, password, role } = Object.fromEntries(formData);

//     // Kiểm tra xem currentUser có id không
//     if (!currentUser || !currentUser._id) {
//       console.error(
//         "User ID is undefined. Cannot update profile.",
//         currentUser
//       );
//       setError("User ID is undefined. Cannot update profile.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/users/${currentUser._id}`, // ID người dùng
//         { username, password, role, avatar },
//         {
//           withCredentials: true, // Cho phép gửi cookie JWT
//         }
//       );
//       console.log("Updated User Data:", response.data); // Kiểm tra dữ liệu cập nhật
//       console.log("User Data:", currentUser);
//       // Cập nhật thông tin người dùng
//       setCurrentUser(response.data);
//       setAvatar(response.data.avatar); // Cập nhật avatar từ dữ liệu phản hồi

//       navigate("/profile");
//     } catch (error) {
//       console.error("Update error:", error);
//       setError(error.response?.data?.message || "Failed to update profile.");
//     }
//   };

//   if (!currentUser) {
//     return <div>Loading...</div>; // Hoặc chuyển hướng đến trang đăng nhập
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Cập Nhật Hồ Sơ</h2>
//       {error && <div className="error-message">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             name="username"
//             defaultValue={currentUser.username}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             placeholder="Nhập password"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="role" className="form-label">
//             Role
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="role"
//             name="role"
//             defaultValue={currentUser.role}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Cập Nhật
//         </button>
//       </form>
//       <div className="mb-3">
//         <img src={avatar || noavt} alt="Avatar" />
//         <CloudinaryUploadWidget
//           uwConfig={{
//             cloudName: "djlc7ihxv",
//             uploadPreset: "estate",
//             multiple: false,
//             maxImageFileSize: 2000000,
//             folder: "avatars",
//           }}
//           setAvatar={setAvatar}
//           setPublicId={setPublicId}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../untils/Context.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noavt from "@assets/images/noavt.jpg";
import CloudinaryUploadWidget from "../../../components/UploadImg/UploadImg.jsx";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser?.avatar || noavt);
  const [publicId, setPublicId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar || noavt);
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password, role } = Object.fromEntries(formData);

    if (!currentUser || !currentUser._id) {
      console.error(
        "User ID is undefined. Cannot update profile.",
        currentUser
      );
      setError("User ID is undefined. Cannot update profile.");
      return;
    }

    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${currentUser._id}`,
        { username, password, role, avatar },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        }
      );
      console.log("Updated User Data:", response.data);
      setCurrentUser(response.data);
      setAvatar(response.data.avatar);
      navigate("/profile");
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>; // Hoặc chuyển hướng đến trang đăng nhập
  }

  return (
    <div className="container mt-5">
      <h2>Cập Nhật Hồ Sơ</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            defaultValue={currentUser.username}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Nhập password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            defaultValue={currentUser.role}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cập Nhật
        </button>
      </form>
      <div className="mb-3">
        <img src={avatar} alt="Avatar" />
        <CloudinaryUploadWidget
          uwConfig={{
            cloudName: "djlc7ihxv",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setAvatar={setAvatar}
          setPublicId={setPublicId}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
