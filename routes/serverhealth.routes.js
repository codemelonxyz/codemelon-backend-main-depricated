import serverHealthController from "../controllers/serverhealth.controller.js";
import { Router } from "express";
import adminAuth from "../middlewares/admin.auth.js";

const router = Router();

router.get('/databasehealth', serverHealthController.checkDatabaseConnection);


// admin tools
router.get('/serverhealth', adminAuth ,serverHealthController.getServerHealth);

export default router;