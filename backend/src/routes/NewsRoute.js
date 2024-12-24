import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import NewsController from "../controller/NewsController.js";

const router = express.Router();
router.get("/", NewsController.getListNews);
router.get("/:id", NewsController.getNews);
router.post("/", verifyToken, NewsController.addNews);
router.put("/:id", verifyToken, NewsController.updateNews);
router.delete("/:id", verifyToken, NewsController.deleteNews);

export default router;
