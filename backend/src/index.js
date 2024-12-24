// import express from "express";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/database.js";
// import {
//   userRoute,
//   authRoute,
//   propertyRoute,
//   testRoute,
//   newsRoute,
//   projectRoute,
//   propertyDetailRoute,
//   favoriteRoute,
// } from "./routes/index.js";
// import dotenv from "dotenv";
// import path from "path"; // Thêm dòng này
// import bodyParser from "body-parser";

// dotenv.config({ path: path.join(process.cwd(), "src", ".env") });
// import cors from "cors";
// const app = express();
// // app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// //middleware get into from client
// app.use(express.json());
// app.use(cookieParser());
// // //connect
// connectDB();
// //middleware router
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/users", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/property", propertyRoute);
// app.use("/api/property-detail", propertyDetailRoute);
// app.use("/api/project", projectRoute);
// app.use("/api/news", newsRoute);
// app.use("/api/favorite", favoriteRoute);
// app.use("/api/test-route", testRoute);
// // Khởi động server
// app.listen(process.env.PORT, () => {
//   console.log(`Máy chủ đang chạy trên cổng ${process.env.PORT}`);
// });
import express from "express";
import connectDB from "./config/database.js";
import {
  userRoute,
  authRoute,
  propertyRoute,
  propertyDetailRoute,
  projectRoute,
  newsRoute,
  favoriteRoute,
  testRoute,
} from "./routes/index.js";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({ path: path.join(process.cwd(), "src", ".env") });

const app = express();

// CORS setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware cho các route
app.use("/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/property", propertyRoute);
app.use("/api/property-detail", propertyDetailRoute);
app.use("/api/project", projectRoute);
app.use("/api/news", newsRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/test-route", testRoute);

// Khởi động server
app.listen(process.env.PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${process.env.PORT}`);
});
