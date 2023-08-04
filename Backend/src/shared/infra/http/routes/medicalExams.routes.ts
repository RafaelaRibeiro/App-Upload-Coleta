import { Router } from "express";
import { ListExamsController } from "modules/medicalExams/useCases/listExams/ListExamsController";
import { UpdateDescriptionController } from "modules/medicalExams/useCases/updateDescription/UpdateDescriptionController";

const examsRouter = Router();

const listExamsController = new ListExamsController();
const updateDescriptionController = new UpdateDescriptionController();

examsRouter.get("/", listExamsController.handle);
examsRouter.put("/:smkCod", updateDescriptionController.handle);

export default examsRouter;
