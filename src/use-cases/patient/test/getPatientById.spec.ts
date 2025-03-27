import { PatientsRepository } from '@/repositories/patients-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterPatientUseCase } from '../registerPatient'
import { GetPatientByIdUseCase } from '../getPatientById'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { AppError } from '@/utils/errors/AppError'

let patientsRepository: PatientsRepository
let sut: RegisterPatientUseCase
let getPatientByIdUseCase: GetPatientByIdUseCase

describe('GetPatientById Use Case', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new RegisterPatientUseCase(patientsRepository)
        getPatientByIdUseCase = new GetPatientByIdUseCase(patientsRepository)
    })

    it('Sould be able to list a patient by id', async () => {
        const { patient } = await sut.execute({
            name: 'patient-1',
            email: 'patient1@test.com',
            cpf: '089.567.443-00',
            phone: '(51) 90987-9090'
        })


        const patientById = await getPatientByIdUseCase.execute(patient.id);

        expect(patientById).toBeTruthy();
        expect(patientById?.id).toEqual(patient.id);
    })

    it("should not be able to get user with wrong id", async () => {
        await expect(() =>
            getPatientByIdUseCase.execute("non-existent-id")
        ).rejects.toBeInstanceOf(AppError);
    });
})