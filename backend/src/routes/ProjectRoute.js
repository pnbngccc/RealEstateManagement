import express from "express";
import ProjectController from "../controller/ProjectController.js"; // Đảm bảo nhập khẩu đúng
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", ProjectController.getListProjects);
router.get("/:id", ProjectController.getListProject);
router.post("/", verifyToken, ProjectController.addProject);
router.put("/:id", verifyToken, ProjectController.updateProject);
router.delete("/:id", verifyToken, ProjectController.deleteProject);

export default router;
