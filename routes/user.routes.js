import { isLoggedIn } from "../middleware/auth.middleware.js";

import express from "express";
import { login, 
    registerUser, 
    verifyUser, 
    getMe } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/me", isLoggedIn, getMe);
router.get("/logout", isLoggedIn, logoutUser);

export default router;
