import { z } from 'zod';

export const registerAppointmentBodySchema = z.object({
    appointmentDateTime: z
        .string()
        .min(1, { message: 'Data e hora são obrigatórios' })
        .transform((val) => {
            const [datePart, timePart] = val.split(' as ');
            const [day, month, year] = datePart.split('/').map(Number);
            const [hours, minutes] = timePart.split(':').map(Number);
            return new Date(year, month - 1, day, hours, minutes);
        })
        .refine((date) => !isNaN(date.getTime()), {
            message: 'Formato inválido para data e hora',
        }),
    observation: z.string(),
    patient: z.object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
        cpf: z.string().length(14).transform(val => val.replace(/[^0-9]/g, '')),
        email: z.string().email(),
        phone: z.string(),
    }),
    doctorName: z.string().min(1, { message: 'Nome do médico é obrigatório' }).trim(),
});
