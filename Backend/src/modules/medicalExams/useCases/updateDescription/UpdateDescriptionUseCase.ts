import { prisma } from "shared/infra/prisma/prisma";

export class UpdateDescriptionUseCase {
  async execute(smkCod: string, description: string, validated: string) {
    const { SMK_COD } =
      (await prisma.sMK.findUnique({
        where: { SMK_TIPO_SMK_COD: { SMK_TIPO: "S", SMK_COD: smkCod } },
      })) ?? {};

    if (!SMK_COD) {
      throw new Error("Procedimento não encontrado");
    }

    try {
      const exam = await prisma.sMK.update({
        where: { SMK_TIPO_SMK_COD: { SMK_COD, SMK_TIPO: "S" } },
        data: { SMK_DESCRICAO: description, SMK_IND_DESCR_VALID: validated },
      });

      return exam;
    } catch (error) {
      console.error("Error updating exam: ", error);
      throw new Error("Erro ao atualizar o exame");
    }
  }
}
