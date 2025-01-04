import express from "express";
import PropertyController from "../controller/PropertyController.js"; // Đảm bảo nhập khẩu đúng
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", PropertyController.getListProperties);
router.get("/report", PropertyController.getPropertyReport);
router.get("/:id", PropertyController.getListProperty);
router.post("/", verifyToken, PropertyController.addProperties);
router.put("/:id", verifyToken, PropertyController.updateProperties);
router.delete("/:id", verifyToken, PropertyController.deleteProperties);


export default router;
