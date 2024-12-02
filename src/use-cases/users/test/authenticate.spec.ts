import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "../auth";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcrypt";
import { AppError } from "@/utils/errors/AppError";

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'User Test',
            email: 'user.test@test.com',
            cpf: '099.877.456-00',
            role: 'ADMIN',
            password: await hash('Test@123', 6)
        })

        const { user } = await sut.execute({
            email: 'user.test@test.com',
            password: 'Test@123'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(
            sut.execute({
                email: 'user.test@test.com',
                password: 'Test@123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'User Test',
            email: 'user.test@test.com',
            cpf: '099.877.456-00',
            role: 'ADMIN',
            password: await hash('Test@123', 6)
        })

        await expect(() => {
            sut.execute({
                email: 'user.test@test.com',
                password: '123123'
            })
        })
    })

})