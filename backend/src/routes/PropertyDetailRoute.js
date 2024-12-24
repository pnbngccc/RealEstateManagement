import express from "express";
import PropertyDetailController from "../controller/PropertyDetailController.js"; // Đảm bảo nhập khẩu đúng
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", PropertyDetailController.getListPropertiesDetail);
router.get("/:id", PropertyDetailController.getListPropertyDetail);
router.post("/", verifyToken, PropertyDetailController.addPropertiesDetail);
router.put(
  "/:id",
  verifyToken,
  PropertyDetailController.updatePropertiesDetail
);
router.delete(
  "/:id",
  verifyToken,
  PropertyDetailController.deletePropertiesDetail
);

export default router;
