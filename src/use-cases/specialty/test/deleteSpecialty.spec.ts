import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterSpecialtyUseCase } from "../register";
import { DeleteSpecialtyUseCase } from "../deleteSpecialty";
import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";

let specialtiesRepository: SpecialtiesRepository
let sut: RegisterSpecialtyUseCase

let deleteSpecilatyUseCase: DeleteSpecialtyUseCase

describe('Delete Specialty Use Case', () => {
    beforeEach(() => {
        specialtiesRepository = new InMemorySpecialtiesRepository()
        sut = new RegisterSpecialtyUseCase(specialtiesRepository)

        deleteSpecilatyUseCase = new DeleteSpecialtyUseCase(specialtiesRepository)
    })

    it('should be able to delete specialty', async () => {

        const { specialty } = await sut.execute({
            name: 'Ortopedia',
        })

        expect(() => deleteSpecilatyUseCase.execute(specialty.id))
    })
})