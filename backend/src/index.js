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
  postRoute,
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
app.use("/api/post", postRoute);

// Khởi động server
app.listen(process.env.PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${process.env.PORT}`);
});
