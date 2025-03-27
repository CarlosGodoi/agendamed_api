// src/http/controllers/update-appointment-status.ts
import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { makeUpdateAppointmentStatusUseCase } from "@/use-cases/factories/make-update-status-appointment-use-case";
import { AppError } from "@/utils/errors/AppError";

const updateAppointmentStatusSchema = z.object({
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'])
});

export async function updateAppointmentStatusController(req: Request, res: Response, next: NextFunction) {
    const { appointmentId } = req.params;
    const { status } = updateAppointmentStatusSchema.parse(req.body);

    try {
        const updateStatusUseCase = makeUpdateAppointmentStatusUseCase();
        const { appointment } = await updateStatusUseCase.execute({ appointmentId, status });

        return res.json({ appointment });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error.' });
    }
}