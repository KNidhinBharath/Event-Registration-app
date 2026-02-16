import express from "express";
import auth from "../middleware/authMiddleware.js";
import {getDashboard} from "../controllers/dashboardController.js";

const router=express.Router();

router.get("/",auth,getDashboard);

export default router;
