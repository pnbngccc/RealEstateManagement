import express, { Router } from "express";
const router = express.Router();
import {
  shouldBeLoggedIn,
  shouldBeAdminIn,
} from "../controller/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
router.get("/should-be-admin", shouldBeAdminIn);

export default router;
