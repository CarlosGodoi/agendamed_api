import { z } from "zod";

export const registerDoctorBodySchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }).trim(),
    cpf: z.string().min(11, { message: "CPF deve conter 11 caracteres." }),
    crm: z.string().min(1, { message: "CRM é obrigatório." }),
    specialtyName: z.string().optional(),
    specialtyId: z.string().optional(),
}).refine(
    (data) => data.specialtyName || data.specialtyId,
    {
        message: "É necessário fornecer specialtyName ou specialtyId.",
        path: ["specialtyName", "specialtyId"],
    }
);