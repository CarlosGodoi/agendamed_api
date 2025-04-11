import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { DoctorsRepository } from "@/repositories/doctors-repository";
import { PatientsRepository } from "@/repositories/patients-repository";
import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { RegisterAppointmentUseCase } from "../registerAppointment";
import { GetAllAppointmentsUseCase } from "../getAllAppointments";
import { InMemoryAppointmentsRepository } from "@/repositories/in-memory/in-memory-appointments-repository";
import { InMemoryDoctorsRepository } from "@/repositories/in-memory/in-memory-doctors-repository";
import { InMemoryPatientsRepository } from "@/repositories/in-memory/in-memory-patients-repository";
import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";
import { GetAppointmentsReportsUseCase } from "../getAppointmentsReports";
import { AppointmentStatus } from "@prisma/client";

let appointmentsRepository: AppointmentsRepository;
let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let specialtiesRepository: SpecialtiesRepository;
let sut: RegisterAppointmentUseCase;
let getAllAppointmentsUseCase: GetAllAppointmentsUseCase;
let getAppointmentsReportsUseCase: GetAppointmentsReportsUseCase;

describe("GetAppointmentsReports Use Case", () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    doctorsRepository = new InMemoryDoctorsRepository();
    patientsRepository = new InMemoryPatientsRepository();
    specialtiesRepository = new InMemorySpecialtiesRepository();
    sut = new RegisterAppointmentUseCase(
      appointmentsRepository,
      doctorsRepository,
      patientsRepository,
      specialtiesRepository
    );
    getAllAppointmentsUseCase = new GetAllAppointmentsUseCase(
      appointmentsRepository
    );
    getAppointmentsReportsUseCase = new GetAppointmentsReportsUseCase(
      appointmentsRepository
    );
  });

  it("should be able to list appointments reports", async () => {
    const { id: specialtyId } = await specialtiesRepository.create({
      name: "specialty001",
    });

    const doctor = await doctorsRepository.create({
      name: "doctor_test",
      cpf: "123.456.789-00",
      crm: "CRM/RS 123456",
      specialty: { connect: { id: specialtyId } },
    });

    const appointment1 = await sut.execute({
      doctorName: doctor.name,
      specialtyId: specialtyId,
      appointmentDateTime: new Date(),
      patient: {
        name: "patient_test",
        cpf: "909.546.232-11",
        email: "patient.test@mail.com",
        phone: "(51) 99999-9999",
      },
    });

    const appointment2 = await sut.execute({
      doctorName: doctor.name,
      specialtyId: specialtyId,
      appointmentDateTime: new Date(),
      patient: {
        name: "patient_test2",
        cpf: "909.546.543-22",
        email: "patient.test2@mail.com",
        phone: "(51) 98876-4343",
      },
    });

    const appointment3 = await sut.execute({
      doctorName: doctor.name,
      specialtyId: specialtyId,
      appointmentDateTime: new Date(),
      patient: {
        name: "patient_test3",
        cpf: "999.121.653-32",
        email: "patient.test3@mail.com",
        phone: "(51) 99988-3211",
      },
    });

    // Atualize o status do terceiro agendamento para CANCELLED
    await appointmentsRepository.update(appointment3.appointment.id, {
      status: AppointmentStatus.CANCELLED,
    });

    // Agora execute o relatório
    const reports = await getAppointmentsReportsUseCase.execute({
      year: new Date().getFullYear(),
    });

    // Verificar se o array monthlyData existe e tem comprimento 1
    expect(reports.monthlyData?.length).toBe(1);

    // Verificar os valores específicos dos relatórios
    expect(reports.monthlyData?.[0].totalAppointments).toBe(3);
    expect(reports.monthlyData?.[0].scheduledAppointments).toBe(2);
    expect(reports.monthlyData?.[0].cancelledAppointments).toBe(1);
    expect(reports.monthlyData?.[0].attendedAppointments).toBe(0);

    // Verificar os totais gerais
    expect(reports.totalAppointmentsAttended).toBe(0);
    expect(reports.totalAppointmentsCanceled).toBe(1);

    // Verificar o mês atual
    const currentMonth = new Date().getMonth();
    expect(reports.monthlyData?.[0].month).toBe(currentMonth);
  });
});
