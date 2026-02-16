import express from "express";
import auth from "../middleware/authMiddleware.js";
import {registerEvent,cancelRegistration} from "../controllers/registrationController.js";

const router=express.Router();

router.post("/:id",auth,registerEvent);
router.put("/:id",auth,cancelRegistration);

export default router;
