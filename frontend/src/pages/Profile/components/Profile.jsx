import { useContext, useEffect } from "react";

import "@assets/fonts/icomoon/style.css";
import "@assets/fonts/flaticon/font/flaticon.css";
import "@assets/css/tiny-slider.css";
import "aos/dist/aos.css";
import "@assets/css/style.css";
import "./List.css";
import { UserContext } from "../../../untils/Context";
import { useNavigate } from "react-router-dom";
import noavt from "@assets/images/noavt.jpg";

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    currentUser && (
      <div className="container mt-5">
        <div className="d-flex align-items-center mb-4">
          <h1 style={{ marginRight: "30rem" }}>Hồ sơ người dùng</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/profile/update")}
          >
            Update Profile
          </button>
        </div>

        <div className="mb-3">
          <span>
            Avatar{" "}
            <img
              src={currentUser.avatar || noavt}
              alt="User Avatar"
              className="img-fluid rounded-circle"
              style={{ width: "50px", height: "50px" }}
            />
          </span>
        </div>
        <p>
          <span>
            Họ và tên: <b>{currentUser.fullname || "Người dùng"}</b>
          </span>
        </p>
        <p>
          <span>
            Tên đăng nhập: <b>{currentUser.username || "Người dùng"}</b>
          </span>
        </p>
        <p>
          <span>
            Số điện thoại: <b>{currentUser?.phone || "Người dùng"}</b>
          </span>
        </p>
      </div>
    )
  );
}

export default Profile;
