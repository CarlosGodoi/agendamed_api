import { UsersRepository } from '@/repositories/users-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { RegisterUseCase } from '../register'
import { UpdateUserUserCase } from '../updateUser'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AppError } from '@/utils/errors/AppError'

let usersRepository: UsersRepository
let sut: RegisterUseCase

let updateUserUseCase: UpdateUserUserCase

describe('Update uUser Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)

        updateUserUseCase = new UpdateUserUserCase(usersRepository)
    })

    it('Should be able update user', async () => {
        const role = 'ADMIN'

        const newUser = await sut.execute({
            name: 'user-test',
            email: 'user.test@test.com',
            cpf: '009.736.321.11',
            role: role,
            password: 'Test@123'
        })

        const userId = newUser.user.id

        const updatedUser = await updateUserUseCase.execute({
            id: userId,
            email: 'user.novoEmail@test.com',
            password: 'Novo@123',
            updated_at: new Date()
        })

        expect(updatedUser).toBeDefined()
    })

    it('it should not be possible to update the datas of a user', async () => {
        const role = 'ADMIN'

        const newUser = await sut.execute({
            name: 'user-test',
            email: 'user.test@test.com',
            cpf: '009.736.321.11',
            role: role,
            password: 'Test@123'
        })

        try {
            await updateUserUseCase.execute({
                id: 'non-exists',
                email: 'user.novoEmail@test.com',
                password: 'Novo@123',
                updated_at: new Date()
            })
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})