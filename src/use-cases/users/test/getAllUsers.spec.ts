import { UsersRepository } from "@/repositories/users-repository";
import { RegisterUseCase } from "../register";
import { GetAllUsersUseCase } from "../getAllUsers";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository: UsersRepository;
let registerUseCase: RegisterUseCase;
let getAllUsersUseCase: GetAllUsersUseCase;

describe("GetAllUsers Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        registerUseCase = new RegisterUseCase(usersRepository);
        getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);
    });

    it("should be able to list users", async () => {
        const role = "ADMIN";

        // Adicionando usuário 1
        const { user } = await registerUseCase.execute({
            name: "user-1",
            email: "user1@test.com",
            cpf: "001.990.332-88",
            role: role,
            password: "User@123",
        });
        expect(user.role).toBe(role);

        // Adicionando usuário 2
        await registerUseCase.execute({
            name: "user-2",
            email: "user2@test.com",
            cpf: "002.330.222-00",
            role: "OPERATOR",
            password: "User2@123",
        });

        // Adicionando usuário 3
        await registerUseCase.execute({
            name: "user-3",
            email: "user3@test.com",
            cpf: "023.389.674-00",
            role: "OPERATOR",
            password: "User3@123",
        });

        // Obtendo lista de usuários com paginação
        const allUsers = await getAllUsersUseCase.execute({
            take: 2,
            skip: 1,
            users: [],
            total: 0
        });

        // Verificações
        expect(allUsers.total).toBe(3); // Total de usuários no repositório
        expect(allUsers.users.length).toBe(2); // Tamanho da lista retornada
    });
});
