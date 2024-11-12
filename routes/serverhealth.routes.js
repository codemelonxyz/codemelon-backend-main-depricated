import serverHealthController from "../controllers/serverhealth.controller.js";
import { Router } from "express";

const router = Router();

router.get('/databasehealth', serverHealthController.checkDatabaseConnection);


// admin tools
router.get('/serverhealth', serverHealthController.getServerHealth);

export default router;