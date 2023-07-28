import { Request, Response } from "express";
import { FirstAccessUseCase } from "./FirstAccessUseCase";

export class FirstAccessController {
  async handle(request: Request, response: Response) {
    const { login, password, confirmPassword } = request.body;
    const firstAccessUseCase = new FirstAccessUseCase();
    const result = await firstAccessUseCase.execute({
      login,
      password,
      confirmPassword,
    });

    return response.json(result);
  }
}
