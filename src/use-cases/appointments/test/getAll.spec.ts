import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { PatientsRepository } from "@/repositories/patients-repository";
import { beforeEach, expect, describe, it } from "vitest";
import { RegisterAppointmentUseCase } from "../registerAppointment";
import { GetAllAppointmentsUseCase } from "../getAllAppointments";
import { InMemoryAppointmentsRepository } from "@/repositories/in-memory/in-memory-appointments-repository";
import { DoctorsRepository } from "@/repositories/doctors-repository";
import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { InMemoryDoctorsRepository } from "@/repositories/in-memory/in-memory-doctors-repository";
import { InMemoryPatientsRepository } from "@/repositories/in-memory/in-memory-patients-repository";
import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";

let appointmentsRepository: AppointmentsRepository;
let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let specialtiesRepository: SpecialtiesRepository;
let sut: RegisterAppointmentUseCase;
let getAllAppointmentsUseCase: GetAllAppointmentsUseCase;

describe("GetAllPatients Use Case", () => {
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
  });

  it("should be able to list patients", async () => {
    const { id: specialtyId } = await specialtiesRepository.create({
      name: "specialty001",
    });

    const doctor = await doctorsRepository.create({
      name: "doctor_test",
      cpf: "123.456.789-00",
      crm: "CRM/RS 123456",
      specialty: { connect: { id: specialtyId } },
    });

    console.log("SpecialtyId =>", specialtyId);

    await sut.execute({
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

    await sut.execute({
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

    await sut.execute({
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

    const appointments = await getAllAppointmentsUseCase.execute({
      take: 2,
      skip: 1,
      appointments: [],
      total: 0,
    });

    expect(appointments.total).toBe(3);
    expect(appointments.appointments.length).toBe(2);
  });
});
