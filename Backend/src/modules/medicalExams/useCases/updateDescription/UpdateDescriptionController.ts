import { Request, Response } from "express";
import { UpdateDescriptionUseCase } from "./UpdateDescriptionUseCase";

export class UpdateDescriptionController {
  async handle(request: Request, response: Response) {
    const { smkCod } = request.params;
    const { description, validated } = request.body;

    const updateDescriptionUseCase = new UpdateDescriptionUseCase();
    try {
      const result = await updateDescriptionUseCase.execute(
        smkCod,
        description,
        validated
      );
      return response.json(result);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "An error occurred while updating the description." });
    }
  }
}
