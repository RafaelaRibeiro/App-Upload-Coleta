import { Request, Response } from "express";
import { ListExamsUseCase } from "./ListExamsUseCase";

export class ListExamsController {
  async handle(request: Request, response: Response) {
    try {
      const listExamsUseCase = new ListExamsUseCase();
      const result = await listExamsUseCase.execute();

      return response.json(result);
    } catch (error) {
      console.error(error);

      return response
        .status(500)
        .json({ error: "An error occurred while trying to list the exams." });
    }
  }
}
