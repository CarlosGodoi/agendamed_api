import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository'
import { InMemorySpecialtiesRepository } from '@/repositories/in-memory/in-memory-specialties-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { RegisterDoctorUseCase } from '../registerDoctor'
import { RegisterSpecialtyUseCase } from '@/use-cases/specialty/register'
import { AppError } from '@/utils/errors/AppError'

let doctorsRepository: InMemoryDoctorsRepository
let specialtiesRepository: InMemorySpecialtiesRepository

let sut: RegisterDoctorUseCase
let sut2: RegisterSpecialtyUseCase

describe('Register Doctor Use Case', () => {
    beforeEach(() => {
        doctorsRepository = new InMemoryDoctorsRepository()
        specialtiesRepository = new InMemorySpecialtiesRepository()

        sut = new RegisterDoctorUseCase(doctorsRepository, specialtiesRepository)
        sut2 = new RegisterSpecialtyUseCase(specialtiesRepository)
    })

    it('Should be able to register a doctor', async () => {
        const { specialty } = await sut2.execute({
            name: 'Cardiologia'
        })

        const { doctor } = await sut.execute({
            name: 'Doctor test',
            cpf: '009.998.334-02',
            crm: 'CRM 46372-RS',
            specialtyId: specialty.id
        })

        expect(doctor.id).toEqual(expect.any(String))
    })

    it('Should not be able register a doctor without the specialty ID', async () => {
        try {
            await sut.execute({
                name: 'Doctor test1',
                cpf: '678.893.003-22',
                crm: 'CRM 7843-SP',
                specialtyId: 'non-exists'
            })
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it('It should not be possible to register a doctor with the same CPF', async () => {
        // Primeiro criamos a especialidade
        const { specialty } = await sut2.execute({
            name: 'Fonoaudiologia'
        })

        // Criamos o primeiro médico usando o ID da especialidade que acabamos de criar
        const { doctor } = await sut.execute({
            name: 'Doctor test 1',
            cpf: '887.452.291-02',
            crm: 'CRM/AL 13422',
            specialtyId: specialty.id  // Aqui usamos o ID correto da especialidade
        })

        // Tentamos criar outro médico com o mesmo CPF
        await expect(() =>
            sut.execute({
                name: 'Doctor test 2',
                cpf: doctor.cpf,
                crm: 'CRM/AL 13499',
                specialtyId: specialty.id
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})