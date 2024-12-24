import express from "express";
import AuthController from "../controller/AuthController.js"; // Đảm bảo nhập khẩu đúng
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", AuthController.register); // Sử dụng register trực tiếp
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
// router.get("/me", verifyToken, AuthController.test);

export default router;
