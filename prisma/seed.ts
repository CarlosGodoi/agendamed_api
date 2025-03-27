import { app } from "@/config/app";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function userSeed() {
  const Admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@admin.com",
      cpf: "01999076432",
      role: "ADMIN",
      password: await hash("Admin@123", 6),
      created_at: new Date(),
    },
  });

  const Doctor = await prisma.user.upsert({
    where: { email: "doctor@doctor.com" },
    update: {},
    create: {
      name: "Doctor",
      email: "doctor@doctor.com",
      cpf: "01187096211",
      role: "DOCTOR",
      password: await hash("Doctor@123", 6),
      created_at: new Date(),
    },
  });

  const Operator = await prisma.user.upsert({
    where: { email: "operator@operator.com" },
    update: {},
    create: {
      name: "Operator",
      email: "operator@operator.com",
      cpf: "00423612700",
      role: "OPERATOR",
      password: await hash("Operator@123", 6),
      created_at: new Date(),
    },
  });
  console.log({ "Admin =>": Admin, "Doctor =>": Doctor, Operator: Operator });
}

userSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

async function doctorSeed() {
  const specialties = [
    { name: "Pediatra" },
    { name: "Ortopedista" },
    { name: "Cardiologista" },
  ];

  // Criar especialidades primeiro
  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty.name },
      update: { name: specialty.name },
      create: { name: specialty.name },
    });
  }

  const doctors = [
    {
      name: "José Alfredo",
      cpf: "76400922300",
      crm: "CRM/SP 13245",
      specialty: "Pediatra",
    },
    {
      name: "Maria Clara",
      cpf: "67400922301",
      crm: "CRM/RS 47866",
      specialty: "Ortopedista",
    },
    {
      name: "João Paulo",
      cpf: "68400922302",
      crm: "CRM/RJ 43329",
      specialty: "Cardiologista",
    },
  ];

  // Criar médicos e associá-los às especialidades
  for (const doctor of doctors) {
    const specialty = await prisma.specialty.findFirst({
      where: { name: doctor.specialty },
    });

    if (!specialty) {
      throw new Error(`Specialty ${doctor.specialty} not found`);
    }

    await prisma.doctor.upsert({
      where: { cpf: doctor.cpf },
      update: {},
      create: {
        name: doctor.name,
        cpf: doctor.cpf,
        crm: doctor.crm,
        specialty: {
          connect: { id: specialty.id },
        },
        created_at: new Date(),
      },
    });
  }

  console.log("Doctors and specialties seeded successfully");
}

doctorSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

async function appointmentSeed() {
  const specialties = [
    { id: "1234abd43", name: "Pediatra" },
    { id: "9847ythe23", name: "Ortopedista" },
    { id: "7463tbs5242", name: "Cardiologista" },
  ];

  // Criando ou atualizando especialidades
  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty.name },
      update: {},
      create: { name: specialty.name },
    });
  }

  const appointments = [
    {
      appointmentDateTime: new Date("2025-03-01T08:00:00Z"),
      observation:
        "Cancelamentos serão realizados somente com 24hs de antecedência.",
      doctorName: "Maria Clara",
      specialtyName: "Pediatra",
      patient: {
        name: "Roberto Sincero",
        cpf: "009.465.123-77",
        email: "roberto.sincero@gmail.com",
        phone: "(51) 99876-3341",
      },
    },
    {
      appointmentDateTime: new Date("2025-02-20T08:00:00Z"),
      observation:
        "Cancelamentos serão realizados somente com 24hs de antecedência.",
      doctorName: "José Alfredo",
      specialtyName: "Ortopedista",
      patient: {
        name: "Aldair Tiringa",
        cpf: "142.567.832-22",
        email: "aldair.tiringa@gmail.com",
        phone: "(51) 99365-1267",
      },
    },
    {
      appointmentDateTime: new Date("2025-03-13T08:00:00Z"),
      observation:
        "Cancelamentos serão realizados somente com 24hs de antecedência.",
      doctorName: "Maria Clara",
      specialtyName: "Ortopedista",
      patient: {
        name: "Rosalva Silva",
        cpf: "009.465.123-77",
        email: "rosalva.silva@gmail.com",
        phone: "(51) 99876-3341",
      },
    },
    {
      appointmentDateTime: new Date("2025-02-18T08:00:00Z"),
      observation:
        "Cancelamentos serão realizados somente com 24hs de antecedência.",
      doctorName: "Maria Clara",
      specialtyName: "Ortopedista",
      patient: {
        name: "Ivan Mors",
        cpf: "478.332.123-23",
        email: "ivan.mors@gmail.com",
        phone: "(51) 99654-2154",
      },
    },
    {
      appointmentDateTime: new Date("2025-02-18T08:00:00Z"),
      observation:
        "Cancelamentos serão realizados somente com 24hs de antecedência.",
      doctorName: "João Paulo",
      specialtyName: "Cardiologista",
      patient: {
        name: "Alcildes Norberto",
        cpf: "312.663.002-89",
        email: "alcides.norberto@gmail.com",
        phone: "(51) 99563-0922",
      },
    },
  ];

  const doctors = [
    { id: "1a2b3c4d", name: "Maria Clara", cpf: "12345678900" },
    { id: "2b3c4d5e", name: "José Alfredo", cpf: "09876543211" },
    { id: "456yurt#5e", name: "João Paulo", cpf: "68400922302" },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.upsert({
      where: { cpf: doctor.cpf },
      update: {},
      create: {
        id: doctor.id,
        name: doctor.name,
        cpf: doctor.cpf,
        crm: "CRM/SP 12345",
        specialty: {
          connect: { name: "Pediatra" },
        },
      },
    });
  }

  for (const appointment of appointments) {
    // Buscar a especialidade correta
    const specialty = await prisma.specialty.findFirst({
      where: { name: appointment.specialtyName },
    });

    if (!specialty) {
      throw new Error(`Specialty ${appointment.specialtyName} not found`);
    }

    // Buscar o médico correto
    const doctor = await prisma.doctor.findFirst({
      where: { name: appointment.doctorName },
    });

    if (!doctor) {
      throw new Error(`Doctor ${appointment.doctorName} not found`);
    }

    // Criar ou atualizar o paciente
    const patient = await prisma.patient.upsert({
      where: { cpf: appointment.patient.cpf },
      update: {},
      create: {
        name: appointment.patient.name,
        cpf: appointment.patient.cpf,
        email: appointment.patient.email,
        phone: appointment.patient.phone,
      },
    });

    // Criar o agendamento
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentDateTime: {
          equals: new Date(appointment.appointmentDateTime).toISOString(),
        },
        doctorId: doctor.id,
      },
    });

    if (!existingAppointment) {
      await prisma.appointment.create({
        data: {
          appointmentDateTime: appointment.appointmentDateTime,
          observation: appointment.observation,
          doctor: { connect: { id: doctor.id } },
          specialty: { connect: { id: specialty.id } },
          patient: { connect: { id: patient.id } },
          created_at: new Date(),
        },
      });
    }
  }

  console.log("Appointments seeded successfully");
}

// Execute the function
appointmentSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
