import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateAppointmentStatusUseCase } from "../updateStatusAppointment";
import { InMemoryAppointmentsRepository } from "@/repositories/in-memory/in-memory-appointments-repository";
import { DoctorsRepository } from "@/repositories/doctors-repository";
import { PatientsRepository } from "@/repositories/patients-repository";
import { RegisterAppointmentUseCase } from "../registerAppointment";
import { InMemoryDoctorsRepository } from "@/repositories/in-memory/in-memory-doctors-repository";
import { InMemoryPatientsRepository } from "@/repositories/in-memory/in-memory-patients-repository";
import { RegisterDoctorUseCase } from "@/use-cases/doctors/registerDoctor";
import { RegisterSpecialtyUseCase } from "@/use-cases/specialty/register";
import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";
import { SpecialtiesRepository } from "@/repositories/specialty-repository";

let appointmentsRepository: AppointmentsRepository;
let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let specialtiesRepository: SpecialtiesRepository;

let sut: RegisterAppointmentUseCase;
let sut2: UpdateAppointmentStatusUseCase;
let sut3: RegisterDoctorUseCase;
let sut4: RegisterSpecialtyUseCase;

describe("Update Appointment Status Use Case", () => {
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
    sut2 = new UpdateAppointmentStatusUseCase(appointmentsRepository);
    sut3 = new RegisterDoctorUseCase(doctorsRepository, specialtiesRepository);
    sut4 = new RegisterSpecialtyUseCase(specialtiesRepository);
  });

  it("Should be able to update appointment status", async () => {
    const { specialty } = await sut4.execute({
      name: "Cardiologia",
    });

    await sut3.execute({
      name: "doctor_test",
      crm: "CRM 46372-RS",
      cpf: "009.998.334-02",
      specialtyId: specialty.id,
    });

    const { appointment } = await sut.execute({
      doctorName: "doctor_test",
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

    await sut2.execute({
      appointmentId: appointment.id,
      status: "CANCELLED",
    });

    const updatedAppointment = await appointmentsRepository.findById(
      appointment.id
    );

    expect(updatedAppointment?.status).toBe("CANCELLED");
  });
});
