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