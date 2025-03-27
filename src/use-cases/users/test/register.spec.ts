import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcrypt'
import { AppError } from '@/utils/errors/AppError'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('Should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'User Test',
            email: 'user.test@test.com',
            cpf: '099.877.456-00',
            role: 'ADMIN',
            password: 'Test@123'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'User Test',
            email: 'user.test@test.com',
            cpf: '099.877.456-00',
            role: 'ADMIN',
            password: 'Test@123'
        })

        const isPasswordCorrectlyHashed = await compare('Test@123', user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should not be able to register with same email twice', async () => {
        const email = 'user.test@test.com'

        await sut.execute({
            name: 'User Test',
            email,
            cpf: '099.877.456-00',
            role: 'ADMIN',
            password: 'Test@123'
        })

        await expect(() =>
            sut.execute({
                name: 'User Test',
                email,
                cpf: '099.877.456-00',
                role: 'OPERATOR',
                password: 'Test@123'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})