import { isvalidPassword } from "@/utils/validatePassword";
import { z } from "zod";

export const updateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().refine(isvalidPassword, () => ({
        message: 'Senha deve ter no mínimo 6 caracteres, ao menos 1 letra maiúscula, ao menos 1 número,  ao menos 1 caractere especial.'
    })),
})