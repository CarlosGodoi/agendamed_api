import { SpecialtiesRepository } from '@/repositories/specialty-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterSpecialtyUseCase } from '../register'
import { GetAllSpecialtiesUseCase } from '../getAllSpecialties'
import { InMemorySpecialtiesRepository } from '@/repositories/in-memory/in-memory-specialties-repository'

let specialtiesRepository: SpecialtiesRepository
let sut: RegisterSpecialtyUseCase
let getAllSpecialtiesUseCase: GetAllSpecialtiesUseCase

describe('Get All Speciaties Use Case', () => {
    beforeEach(() => {
        specialtiesRepository = new InMemorySpecialtiesRepository()
        sut = new RegisterSpecialtyUseCase(specialtiesRepository)
        getAllSpecialtiesUseCase = new GetAllSpecialtiesUseCase(specialtiesRepository)
    })

    it('should be able to list specialties with pagination', async () => {

        await sut.execute({ name: 'Cardiologia' })
        await sut.execute({ name: 'Ortopedia' })
        await sut.execute({ name: 'Pediatria' })

        const allUsers = await getAllSpecialtiesUseCase.execute({
            take: 2,
            skip: 1,
            specialties: [],
            total: 3
        });


        expect(allUsers.total).toBe(3);
        expect(allUsers.specialties.length).toBe(2);
    })
})