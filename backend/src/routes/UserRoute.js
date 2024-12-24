import express, { Router } from "express";
const router = express.Router();
import UserController from "../controller/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/", UserController.getListUser);
router.get("/:id", verifyToken, UserController.getUser);
router.put("/:id", verifyToken, UserController.updateUser);
router.delete("/:id", verifyToken, UserController.deleteUser);

export default router;
