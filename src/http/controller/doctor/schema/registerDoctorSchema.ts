import { z } from "zod";

export const registerDoctorBodySchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }).trim(),
    cpf: z.string().min(11, { message: "CPF deve conter 11 caracteres." }),
    crm: z
        .string()
        .regex(
            /^CRM\/[A-Z]{2}\s\d{4,6}$/,
            'CRM deve estar no formato: CRM/UF XXXXX (exemplo: CRM/SP 12345)'
        )
        .transform((crm) => crm.toUpperCase()),
    specialtyName: z.string().optional(),
    specialtyId: z.string().optional(),
}).refine(
    (data) => data.specialtyName || data.specialtyId,
    {
        message: "É necessário fornecer specialtyName ou specialtyId.",
        path: ["specialtyName", "specialtyId"],
    }
);