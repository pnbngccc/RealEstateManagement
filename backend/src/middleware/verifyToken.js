// import jwt from "jsonwebtoken";
// export const verifyToken = (req, res, next) => {
//   // console.log("Request Headers:", req.headers); // Log toàn bộ headers
//   // console.log("Authorization Header:", req.headers.authorization); // Log riêng header Authorization

//   const token = req.cookies.token;

//   if (!token) {
//     console.log("Token missing, Not Authenticated!");
//     return res.status(401).json({ message: "Not Authenticated!" });
//   }

//   jwt.verify(token, process.env.SECRET_JWT, async (err, payload) => {
//     if (err) {
//       console.error("JWT Verification Error:", err.message);
//       return res.status(403).json({ message: "Token is not valid!" });
//     }
//     console.log("Decoded Payload:", payload);

//     req.userId = payload.id; // Đảm bảo dùng `userId` thay vì `UserId`
//     req.user = payload; // Toàn bộ thông tin của user từ JWT
//     // Kiểm tra quyền admin
//     req.isAdmin = payload.role === "admin"; // Gán `isAdmin` từ payload
//     console.log("Middleware: req.user =", req.user);
//     console.log(`Decoded Payload: ${JSON.stringify(payload)}`);
//     console.log(`Middleware: req.user = ${JSON.stringify(req.user)}`);

//     next();
//   });
// };
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.headers["authorization"]?.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    console.log("Token missing, Not Authenticated!");
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  // Xác thực token
  jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Token is not valid!" });
    }
    console.log("JWT Secret:", process.env.SECRET_JWT);
    console.log("Decoded Payload:", payload);

    req.userId = payload.id; // Gán userId từ payload
    req.user = payload; // Toàn bộ thông tin của user từ JWT
    req.isAdmin = payload.role === "admin"; // Kiểm tra quyền admin

    console.log("Middleware: req.user =", req.user);
    console.log(`Decoded Payload: ${JSON.stringify(payload)}`);
    console.log(`Middleware: req.user = ${JSON.stringify(req.user)}`);

    next(); // Tiếp tục đến middleware hoặc route handler tiếp theo
  });
};
