import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterPatientUseCase } from '../registerPatient'
import { AppError } from '@/utils/errors/AppError'
import { PatientsRepository } from '@/repositories/patients-repository'

let patientsRepository: PatientsRepository
let sut: RegisterPatientUseCase

describe('Register Patient Use Case', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new RegisterPatientUseCase(patientsRepository)
    })

    it('Should be able to register', async () => {
        const { patient } = await sut.execute({
            name: 'Patient Test',
            email: 'patient_test@test.com',
            cpf: '099.877.456-00',
            phone: '(51) 99999-99999',
        })

        expect(patient.id).toEqual(expect.any(String))
    })

    it('Should not be able to register with same email twice', async () => {
        const cpf = '099.877.456-00'

        await sut.execute({
            name: 'Patient Test',
            email: 'patient_test@test.com',
            cpf: cpf,
            phone: '(51) 99999-99999',
        })

        await expect(() =>
            sut.execute({
                name: 'Patient Test',
                email: 'patient_test@test.com',
                cpf: cpf,
                phone: '(51) 99999-99999',
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
