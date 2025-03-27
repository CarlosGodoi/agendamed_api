import { isvalidPassword } from '@/utils/validatePassword'
import { z } from 'zod'

export const registerBodySchema = z.object({
    name: z.string().trim().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email(),
    cpf: z.string().length(14).transform(val => val.replace(/[^0-9]/g, '')),
    password: z.string().refine(isvalidPassword, () => ({
        message: 'Senha deve ter no mínimo 6 caracteres, ao menos 1 letra maiúscula, ao menos 1 número,  ao menos 1 caractere especial.'
    })),
    role: z.enum(['ADMIN', 'OPERATOR', 'DOCTOR']),
})