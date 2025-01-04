// import UserModel from "../models/UserModel.js";
// import bcrypt from "bcrypt";
// // import { secureHeapUsed } from "crypto";
// import jwt from "jsonwebtoken";
// import { userInfo } from "os";
// const register = async (req, res) => {
//   try {
//     const { username, password, phone, role } = req.body;

//     // Kiểm tra username đã tồn tại
//     const existingUser = await UserModel.findOne({ username });
//     if (existingUser) {
//       return res
//         .status(400)
//         .send("Username đã tồn tại. Vui lòng chọn tên khác.");
//     }

//     // Hash mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Tạo user mới
//     await UserModel.create({
//       username: username,
//       password: hashedPassword,
//       phone: phone,
//       role: role || "regular",
//     });

//     return res.status(201).send("Đăng ký thành công.");
//   } catch (error) {
//     console.error("Đăng ký lỗi:", error);
//     return res.status(500).send("Đăng ký thất bại. Vui lòng thử lại sau.");
//   }
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Tìm người dùng trong cơ sở dữ liệu
//     const user = await UserModel.findOne({ username });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Thông tin đăng nhập không hợp lệ." });
//     }

//     // Kiểm tra mật khẩu
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ message: "Thông tin đăng nhập không hợp lệ." });
//     }

//     // Tạo token JWT
//     const age = 1000 * 60 * 60 * 24 * 7; // 7 ngày
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role, // Đưa role vào payload
//         isAdmin: user.role === "admin", // Nếu user có role là admin
//       },
//       process.env.SECRET_JWT,
//       {
//         expiresIn: "7d", // Thời gian hết hạn
//       }
//     );

//     // Xóa password trước khi trả về thông tin người dùng
//     const { password: userPassword, ...userInfo } = user._doc;

//     // Gửi cookie và thông tin người dùng
//     res
//       .cookie("token", token, {
//         httpOnly: true, // Cookie chỉ có thể truy cập từ server
//         maxAge: age, // Thời gian hết hạn cookie
//       })
//       .status(200)
//       .json({
//         _id: user._id,
//         message: "Đăng nhập thành công.",
//         user: userInfo, // Thông tin người dùng không bao gồm mật khẩu
//         role: user.role, // Vai trò
//         phone: user.phone,
//         avatar: user.avatar, // Vai trò
//       });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res
//       .status(500)
//       .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
//   }
// };

// const logout = async (req, res) => {
//   res.clearCookie("token").status(200).json({ message: "Logout Successful" });
// };

// export default { register, login, logout }; // Đảm bảo xuất khẩu đúng
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { fullname, username, password, phone, role } = req.body;

    // Kiểm tra username đã tồn tại
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("Username đã tồn tại. Vui lòng chọn tên khác.");
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    await UserModel.create({
      fullname: fullname,
      username: username,
      password: hashedPassword,
      phone: phone,
      role: role || "regular",
    });

    return res.status(201).send("Đăng ký thành công.");
  } catch (error) {
    console.error("Đăng ký lỗi:", error);
    return res.status(500).send("Đăng ký thất bại. Vui lòng thử lại sau.");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không hợp lệ." });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không hợp lệ." });
    }

    // Tạo token JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        isAdmin: user.role === "admin",
      },
      process.env.SECRET_JWT,
      {
        expiresIn: "7d",
      }
    );

    // Xóa password trước khi trả về thông tin người dùng
    const { password: userPassword, ...userInfo } = user._doc;

    // Gửi token và thông tin người dùng
    res.status(200).json({
      token, // Gửi token trong phản hồi
      _id: user._id,
      message: "Đăng nhập thành công.",
      user: userInfo,
      role: user.role,
      phone: user.phone,
      fullname: user.fullname,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
  }
};

const logout = async (req, res) => {
  // Không cần xóa cookie, chỉ cần gửi thông báo
  res.status(200).json({ message: "Logout Successful" });
};

// Middleware xác thực
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    req.userId = payload.id; // Gán userId từ payload
    req.user = payload; // Thông tin người dùng từ JWT
    req.isAdmin = payload.role === "admin"; // Kiểm tra quyền admin
    next();
  });
};

export default { register, login, logout, verifyToken }; // Đảm bảo xuất khẩu đúng
