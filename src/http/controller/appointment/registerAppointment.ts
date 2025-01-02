import { makeRegisterAppointmentsUseCase } from "@/use-cases/factories/make-appointments-use-case";
import { NextFunction, Request, Response } from "express";
import { registerAppointmentBodySchema } from "./schema/registerAppointmentSchema";
import { EmailService } from "@/use-cases/emails/emailService";
import { AppError } from "@/utils/errors/AppError";

export async function registerAppointmentController(req: Request, res: Response, next: NextFunction) {
    const { appointmentDateTime, observation, doctorName, patient } = registerAppointmentBodySchema.parse(req.body);

    try {
        const registerAppointmentUseCase = makeRegisterAppointmentsUseCase();

        const { appointment } = await registerAppointmentUseCase.execute({
            appointmentDateTime,
            observation,
            doctorName,
            patient: {
                name: patient.name,
                cpf: patient.cpf,
                email: patient.email,
                phone: patient.phone,
            },
        });

        const emailService: EmailService = new EmailService();

        await emailService.sendEmail({
            to: patient.email,
            subject: 'Confirmação de Consulta',
            html: `
                <h3>Olá, ${patient.name}</h3>
                <p>Sua consulta foi agendada com sucesso!</p>
                <p><strong>Status:</strong> Agendada</p>
                <p><strong>Data:</strong> ${appointmentDateTime.toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${appointmentDateTime.toLocaleTimeString()}</p>
                <p><strong>Médico:</strong> ${doctorName}</p>
                <br>
                <p><strong>Observação:</strong> ${observation}</p>
                <br>
                <p>Atenciosamente,</p>
                <p>Equipe Agenda_Med</p>
            `,
        });

        return res.status(201).json({ appointment });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}
