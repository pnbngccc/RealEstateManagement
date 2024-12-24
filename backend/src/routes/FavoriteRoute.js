import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import FavoriteController from "../controller/FavoriteController.js";

const router = express.Router();
router.get("/", FavoriteController.getFavoriteList);
router.get("/:id", FavoriteController.getFavorite);
router.post("/", verifyToken, FavoriteController.addFavorite);
router.put("/:id", verifyToken, FavoriteController.updateFavorite);
router.delete("/:id", verifyToken, FavoriteController.deleteFavorite);

export default router;
