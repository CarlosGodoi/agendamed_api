import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { DoctorsRepository } from "@/repositories/doctors-repository";
import { PatientsRepository } from "@/repositories/patients-repository";
import { AppError } from "@/utils/errors/AppError";
import { Appointment } from "@prisma/client";

interface IAppointmentsUseCaseRequest {
    id?: string;
    appointmentDateTime: Date;
    observation?: string;
    patient: {
        name: string;
        cpf: string;
        email: string;
        phone: string;
    };
    doctorName: string;
}

interface IAppointmentsUseCaseResponse {
    appointment: Appointment;
}

export class RegisterAppointmentUseCase {
    constructor(
        private appointmentsRepository: AppointmentsRepository,
        private doctorsRepository: DoctorsRepository,
        private patientsRepository: PatientsRepository
    ) { }

    async execute({
        id,
        appointmentDateTime,
        observation,
        patient,
        doctorName,
    }: IAppointmentsUseCaseRequest): Promise<IAppointmentsUseCaseResponse> {
        try {
            const doctorExists = await this.doctorsRepository.findByName(doctorName);
            if (!doctorExists) {
                throw new AppError("error", "Médico não encontrado.");
            }

            // Verifica se já existe agendamento para o mesmo médico no mesmo horário
            const existingAppointment = await this.appointmentsRepository.findConflictingAppointment(
                doctorExists.id,
                appointmentDateTime
            );

            // Se encontrou uma consulta existente no mesmo horário
            if (existingAppointment) {
                // Se não foi fornecido um ID, é uma nova consulta e deve ser bloqueada
                if (!id) {
                    throw new AppError(
                        "conflict",
                        "Já existe uma consulta agendada para este médico neste horário."
                    );
                }

                // Se foi fornecido um ID, verifica se a consulta encontrada é diferente da atual
                if (existingAppointment.id !== id) {
                    throw new AppError(
                        "conflict",
                        "Já existe uma consulta agendada para este médico neste horário."
                    );
                }
            }

            let patientRecord = await this.patientsRepository.findByCpf(patient.cpf);

            if (!patientRecord) {
                patientRecord = await this.patientsRepository.create({
                    name: patient.name,
                    cpf: patient.cpf,
                    email: patient.email,
                    phone: patient.phone,
                });
            }

            const appointment = await this.appointmentsRepository.create({
                appointmentDateTime,
                doctor: {
                    connect: {
                        id: doctorExists.id,
                    },
                },
                patient: {
                    connect: {
                        id: patientRecord.id,
                    },
                },
                observation,
            });

            return { appointment };
        } catch (error) {
            console.error("Erro no RegisterAppointmentUseCase:", error);
            throw error;
        }
    }
}