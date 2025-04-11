import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { RegisterAppointmentUseCase } from "../registerAppointment";
import { InMemoryAppointmentsRepository } from "@/repositories/in-memory/in-memory-appointments-repository";
import { DoctorsRepository } from "@/repositories/doctors-repository";
import { PatientsRepository } from "@/repositories/patients-repository";
import { InMemoryDoctorsRepository } from "@/repositories/in-memory/in-memory-doctors-repository";
import { InMemoryPatientsRepository } from "@/repositories/in-memory/in-memory-patients-repository";
import { RegisterDoctorUseCase } from "@/use-cases/doctors/registerDoctor";
import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";
import { RegisterSpecialtyUseCase } from "@/use-cases/specialty/register";
import { RegisterPatientUseCase } from "@/use-cases/patient/registerPatient";

let appointmentsRepository: AppointmentsRepository;
let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let specialtiesRepository: SpecialtiesRepository;

let sut: RegisterAppointmentUseCase;
let sut2: RegisterDoctorUseCase;
let sut3: RegisterSpecialtyUseCase;

describe("Register Appointment Use Case", () => {
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
    sut2 = new RegisterDoctorUseCase(doctorsRepository, specialtiesRepository);
    sut3 = new RegisterSpecialtyUseCase(specialtiesRepository);
  });

  it("Should be able to register appointment", async () => {
    const { specialty } = await sut3.execute({
      name: "Cardiologia",
    });

    const { doctor } = await sut2.execute({
      name: "doctor_test",
      crm: "CRM 46372-RS",
      cpf: "009.998.334-02",
      specialtyId: specialty.id,
    });

    const { appointment } = await sut.execute({
      doctorName: doctor.name,
      specialtyId: specialty.id,
      appointmentDateTime: new Date(),
      patient: {
        name: "patient_test",
        cpf: "909.546.232-11",
        email: "patient_test@test.com",
        phone: "(51) 97654-2234",
      },
      observation: "observation_test",
      status: "SCHEDULED",
    });

    expect(appointment.id).toEqual(expect.any(String));
  });
});
