import { transformDate } from '@/utils/transformDate';
import { z } from 'zod';

export const registerAppointmentBodySchema = z.object({
    appointmentDateTime: z.string().transform(transformDate),
    observation: z.string(),
    patient: z.object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
        cpf: z.string().length(14).transform(val => val.replace(/[^0-9]/g, '')),
        email: z.string().email(),
        phone: z.string(),
    }),
    doctorName: z.string().min(1, { message: 'Nome do médico é obrigatório' }).trim(),
});
