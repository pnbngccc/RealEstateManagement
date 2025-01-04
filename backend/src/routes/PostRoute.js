import express from "express";
import PostController from "../controller/PostController.js"; // Đảm bảo nhập khẩu đúng
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", PostController.getListPosts);
router.get("/:id", PostController.getListPost);
router.post("/", verifyToken, PostController.addPost);
router.put("/:id", verifyToken, PostController.updatePost);
router.delete("/:id", verifyToken, PostController.deletePost);

export default router;
