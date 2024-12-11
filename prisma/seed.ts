import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()

async function userSeed() {
    const Admin = await prisma.user.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@admin.com',
            cpf: '01999076432',
            role: 'ADMIN',
            password: await hash('Admin@123', 6),
            created_at: new Date(),
        }
    })

    const Doctor = await prisma.user.upsert({
        where: { email: 'doctor@doctor.com' },
        update: {},
        create: {
            name: 'Doctor',
            email: 'doctor@doctor.com',
            cpf: '01187096211',
            role: 'DOCTOR',
            password: await hash('Doctor@123', 6),
            created_at: new Date(),
        }
    })

    const Operator = await prisma.user.upsert({
        where: { email: 'operator@operator.com' },
        update: {},
        create: {
            name: 'Operator',
            email: 'operator@operator.com',
            cpf: '00423612700',
            role: 'OPERATOR',
            password: await hash('Operator@123', 6),
            created_at: new Date(),
        }
    })
    console.log({ 'Admin =>': Admin, 'Doctor =>': Doctor, 'Operator': Operator });

}

userSeed().then(async () => {
    await prisma.$disconnect()
}).catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})

async function doctorSeed() {
    const specialties = [
        { name: 'Pediatra' },
        { name: 'Ortopedista' },
        { name: 'Cardiologista' }
    ];

    // Criar especialidades primeiro
    for (const specialty of specialties) {
        await prisma.specialty.upsert({
            where: { name: specialty.name },
            update: {},
            create: { name: specialty.name },
        });
    }

    const doctors = [
        { name: 'José Alfredo', cpf: '76400922300', crm: 'CRM/SP 13245', specialty: 'Pediatra' },
        { name: 'Maria Clara', cpf: '67400922301', crm: 'CRM/RS 47866', specialty: 'Ortopedista' },
        { name: 'João Paulo', cpf: '68400922302', crm: 'CRM/RJ 43329', specialty: 'Cardiologista' }
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

    console.log('Doctors and specialties seeded successfully');

}

doctorSeed().then(async () => {
    await prisma.$disconnect()
}).catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
});