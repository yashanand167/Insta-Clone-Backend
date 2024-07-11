import { registerUser, userLogin } from "../controllers/auth.controller";
import { getUsers } from "../controllers/users.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", authenticateJWT, userLogin);
router.post("/searchUser",getUsers)

export default router;