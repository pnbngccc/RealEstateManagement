import jwt from "jsonwebtoken";

// Xác thực token
export const shouldBeLoggedIn = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header Authorization
  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.userId = payload.id; // Lưu userId vào req để sử dụng ở các route khác
    res.status(200).json({
      message: "You are Authenticated",
    });
  });
};

// Xác thực token và kiểm tra quyền Admin
export const shouldBeAdminIn = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header Authorization
  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    res.status(200).json({
      message: "You are Authenticated as Admin",
    });
  });
};
