import { PatientsRepository } from "@/repositories/patients-repository";
import { RegisterPatientUseCase } from "../registerPatient";
import { GetAllPatientsUseCase } from "../getAllPatients";
import { beforeEach, expect, describe, it } from "vitest";
import { InMemoryPatientsRepository } from "@/repositories/in-memory/in-memory-patients-repository";

let patientsRepository: PatientsRepository;
let sut: RegisterPatientUseCase;
let getAllPatientsUseCase: GetAllPatientsUseCase;

describe("GetAllPatients Use Case", () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository();
        sut = new RegisterPatientUseCase(patientsRepository);
        getAllPatientsUseCase = new GetAllPatientsUseCase(patientsRepository);
    });

    it("should be able to list patients", async () => {

        const { patient } = await sut.execute({
            name: "patient-1",
            email: "patient1@test.com",
            phone: '(51) 99088-7866',
            cpf: "001.990.332-88",
        });
        expect(patient.id).toEqual(expect.any(String))

        await sut.execute({
            name: "patient-2",
            email: "patient2@test.com",
            phone: '(51) 98675-8362',
            cpf: "002.330.222-00",
        });

        await sut.execute({
            name: "patient-3",
            email: "patient3@test.com",
            phone: '(51) 91672-3421',
            cpf: "023.389.674-00",
        });

        const allUsers = await getAllPatientsUseCase.execute({
            take: 2,
            skip: 1,
            patients: [],
            total: 0
        });

        expect(allUsers.total).toBe(3);
        expect(allUsers.patients.length).toBe(2);
    });
})