import { DoctorsRepository } from '@/repositories/doctors-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetAllDoctorsUseCase } from '../getAllDoctors'
import { RegisterDoctorUseCase } from '../registerDoctor'
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository'
import { SpecialtiesRepository } from '@/repositories/specialty-repository'
import { InMemorySpecialtiesRepository } from '@/repositories/in-memory/in-memory-specialties-repository'
import { RegisterSpecialtyUseCase } from '@/use-cases/specialty/register'

let doctorsRepository: DoctorsRepository
let specialtiesRepository: SpecialtiesRepository
let getAllDoctorsUseCase: GetAllDoctorsUseCase
let sut: RegisterDoctorUseCase
let sut2: RegisterSpecialtyUseCase

describe('Get All Doctors Repository', () => {
    beforeEach(() => {
        doctorsRepository = new InMemoryDoctorsRepository()
        specialtiesRepository = new InMemorySpecialtiesRepository()
        getAllDoctorsUseCase = new GetAllDoctorsUseCase(doctorsRepository)
        sut = new RegisterDoctorUseCase(doctorsRepository, specialtiesRepository)
        sut2 = new RegisterSpecialtyUseCase(specialtiesRepository)
    })

    it('should be able to list doctors with pagination', async () => {
        const { specialty } = await sut2.execute({
            name: 'Cardiologia'
        })

        await sut.execute({
            name: 'Doctor test 1',
            cpf: '009.788.004-00',
            crm: 'CRM/RS 99084',
            specialtyId: specialty.id
        })

        await sut.execute({
            name: 'Doctor test 2',
            cpf: '876.342.221-00',
            crm: 'CRM/PR 31897',
            specialtyId: specialty.id
        })

        await sut.execute({
            name: 'Doctor test 3',
            cpf: '123.543.004-03',
            crm: 'CRM/RJ 46893',
            specialtyId: specialty.id
        })

        const allDoctors = await getAllDoctorsUseCase.execute({
            take: 3,
            skip: 1,
            doctors: [],
            total: 3
        })

        expect(allDoctors.total).toBe(3);
        expect(allDoctors.doctors.length).toBe(2);
    })
})