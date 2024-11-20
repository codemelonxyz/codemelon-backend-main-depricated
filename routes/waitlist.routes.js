import TokenValidators from "../validators/token.validators.js";
import WaitlistController from "../controllers/waitlist.controller.js";
import express from "express";

const router = express.Router();

router.get("/waitlist/watermelon", TokenValidators.validateToken, WaitlistController.getWaitlistWatermelon);
router.post("/waitlist/watermelon/join", TokenValidators.validateToken, WaitlistController.addWaitlistWatermelon);
router.post("/waitlist/watermelon/checkUser", TokenValidators.validateToken, WaitlistController.checkWaitlistWatermelon);


export default router;