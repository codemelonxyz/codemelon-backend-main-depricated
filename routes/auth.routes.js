import authValidator from "../validators/auth.validators.js";
import authController from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", authValidator.validateSignup, authController.signup);
router.post("/login", authValidator.validateLogin, authController.login);
router.get("/verify", authController.verifyEmail);

export default router;