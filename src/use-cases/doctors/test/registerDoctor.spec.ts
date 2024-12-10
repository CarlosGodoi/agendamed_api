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
})