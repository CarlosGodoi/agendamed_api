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

async function specialtySeed() {
  const specialties = [
    { name: "Ortopedia e traumatologia" },
    { name: "Cardiologia" },
    { name: "Gastroenterologia" },
    { name: "Geriatria" },
    { name: "Infectologia" },
    { name: "Neurologia" },
    { name: "Nutrologia" },
    { name: "Oftalmologia" },
    { name: "Pneumologia" },
    { name: "Otorrinolaringologia" },
    { name: "Nefrologia" },
    { name: "Reumatologia" },
    { name: "Urologia" },
    { name: "Dermatologia" },
    { name: "Endocrinologia" },
    { name: "Hematologia" },
    { name: "Oncologia" },
    { name: "Pediatria" },
    { name: "Psiquiatria" },
  ];

  // Criar especialidades primeiro
  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty.name },
      update: {},
      create: { name: specialty.name },
    });
  }
}

async function doctorSeed() {
  // Primeiro, garantir que as especialidades existam
  await specialtySeed();

  const doctors = [
    {
      name: "José Alfredo",
      cpf: "76400922300",
      crm: "CRM/SP 13245",
      specialty: "Pediatria",
    },
    {
      name: "Maria Clara",
      cpf: "67400922301",
      crm: "CRM/RS 47866",
      specialty: "Ortopedia e traumatologia",
    },
    {
      name: "João Paulo",
      cpf: "68400922302",
      crm: "CRM/RJ 43329",
      specialty: "Cardiologia",
    },
    {
      name: "Ricardo Silva",
      cpf: "78600591233",
      crm: "CRM/MT 55911",
      specialty: "Cardiologia",
    },
    {
      name: "Miriam Santos",
      cpf: "01238872300",
      crm: "CRM/ES 01253",
      specialty: "Pneumologia",
    },
    {
      name: "Cristina Amorin",
      cpf: "11397756321",
      crm: "CRM/SP 87331",
      specialty: "Gastroenterologia",
    },
    {
      name: "Rodrigo Alvarenga",
      cpf: "00588201533",
      crm: "CRM/TO 19207",
      specialty: "Psiquiatria",
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
      update: {
        name: doctor.name,
        crm: doctor.crm,
        specialty: {
          connect: { id: specialty.id },
        },
      },
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

  console.log("Doctors seeded successfully");
}

async function appointmentSeed() {
  // Garantir que especialidades e médicos existam
  await specialtySeed();
  await doctorSeed();

  const appointments = [
    {
      appointmentDateTime: new Date("2025-03-01T08:00:00Z"),
      observation:
        "Cancelamentos serão realizados somente com 24hs de antecedência.",
      doctorName: "Maria Clara",
      specialtyName: "Ortopedia e traumatologia",
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
      specialtyName: "Pediatria",
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
      doctorName: "José Alfredo",
      specialtyName: "Pediatria",
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
      doctorName: "Cristina Amorin",
      specialtyName: "Gastroenterologia",
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
      specialtyName: "Cardiologia",
      patient: {
        name: "Alcildes Norberto",
        cpf: "312.663.002-89",
        email: "alcides.norberto@gmail.com",
        phone: "(51) 99563-0922",
      },
    },
  ];

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

async function main() {
  try {
    await userSeed();
    await specialtySeed();
    await doctorSeed();
    await appointmentSeed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
