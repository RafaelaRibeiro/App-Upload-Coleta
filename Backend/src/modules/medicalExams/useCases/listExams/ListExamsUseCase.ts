import { prisma } from "shared/infra/prisma/prisma";

export class ListExamsUseCase {
  async execute() {
    const exams = await prisma.sMK.findMany({
      where: { SMK_STATUS: "A", SMK_TIPO: "S" },
      select: {
        SMK_TIPO: true,
        SMK_COD: true,
        SMK_NOME: true,
        SMK_DESCRICAO: true,
        SMK_IND_DESCR_VALID: true,
        SMK_INST: true,
        smk_inst_operador: true,
      },
      orderBy: {
        SMK_NOME: "asc",
      },
    });

    exams.forEach((exam) => {
      if (typeof exam.SMK_NOME === "string") {
        exam.SMK_NOME = exam.SMK_NOME.trimEnd();
      }
    });
    return exams;
  }
}
