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
  const [setPublicId] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar || noavt);
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { password, phone, fullname } = Object.fromEntries(formData);
    const username = formData.get("username");

    // Kiểm tra giá trị username
    if (!username) {
      setError("Tên đăng nhập không được để trống.");
      setNotification({ message: "", type: "" }); // Reset thông báo thành công
      return;
    }

    // Kiểm tra độ dài số điện thoại
    if (phone.length !== 10) {
      setError("Số điện thoại phải có 10 số.");
      setNotification({ message: "", type: "" }); // Reset thông báo thành công
      return;
    }

    if (!currentUser || !currentUser._id) {
      console.error(
        "ID người dùng không xác định. Không thể cập nhật hồ sơ.",
        currentUser
      );
      setError("ID người dùng không xác định. Không thể cập nhật hồ sơ.");
      setNotification({ message: "", type: "" }); // Reset thông báo thành công
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${currentUser._id}`,
        { username, password, avatar, phone, fullname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Dữ liệu người dùng đã cập nhật:", response.data);
      setCurrentUser(response.data);
      setAvatar(response.data.avatar);
      navigate("/profile");
      setNotification({ message: "Cập nhật thành công!", type: "success" });
      setError(""); // Reset error message khi thành công
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      setError(
        error.response?.data?.message || "Cập nhật hồ sơ không thành công."
      );
      setNotification({ message: "", type: "" }); // Reset thông báo thành công
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  if (!currentUser) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mt-5 ">
      {(notification.message || error) && (
        <div
          className={`alert alert-${
            error ? "danger" : notification.type
          } d-flex justify-content-between align-items-center`}
        >
          {error || notification.message}
          <button className="btn-close" onClick={handleCloseNotification}>
            &times;
          </button>
        </div>
      )}
      <div className="mb-3 text-center">
        <img
          src={avatar}
          alt="Avatar"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </div>
      <div className="mb-3 text-center">
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

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Nhập họ và tên"
            name="fullname"
            defaultValue={currentUser.fullname}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Nhập tên đăng nhập"
            defaultValue={currentUser.username}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập số điện thoại"
            id="phone"
            name="phone"
            defaultValue={currentUser.phone}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={{ width: "30%" }}
          >
            Cập Nhật Thông Tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
