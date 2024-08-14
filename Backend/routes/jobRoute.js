import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJob, getAllJobs, getJobById, postJob, updateAdminJob } from "../controllers/jobController.js";

const router = Router();

router.route("/post").post(isAuthenticated, postJob); 
router.route("/update").post(isAuthenticated, updateAdminJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/admin/get").get(isAuthenticated, getAdminJob);

export default router;
