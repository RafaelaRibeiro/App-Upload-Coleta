import { Router } from "express";
import collectRouter from "./collectPrice.routes";
import authRouter from "./authenticate.routes";
import examsRouter from "./medicalExams.routes";

const router = Router();

router.use("/collect", collectRouter);
router.use("/auth", authRouter);
router.use("/exams", examsRouter);

export { router };
