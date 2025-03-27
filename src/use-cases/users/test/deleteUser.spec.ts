import { UsersRepository } from "@/repositories/users-repository";
import { RegisterUseCase } from "../register";
import { DeleteUserUseCase } from "../deleteUser";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository: UsersRepository
let sut: RegisterUseCase

let deleteUserUseCase: DeleteUserUseCase

describe('Delete User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)

        deleteUserUseCase = new DeleteUserUseCase(usersRepository)
    })

    it('should be able to delete user', async () => {
        const role = 'ADMIN'

        const { user } = await sut.execute({
            name: 'User test',
            email: 'user.test@test.com',
            cpf: '009.998.334-77',
            role,
            password: 'UserTest@123'
        })

        expect(() => deleteUserUseCase.execute(user.id))
    })
})