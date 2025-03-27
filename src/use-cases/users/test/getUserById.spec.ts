import { UsersRepository } from "@/repositories/users-repository";
import { RegisterUseCase } from "../register";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserByIdUseCase } from "../getUserById";
import { AppError } from "@/utils/errors/AppError";

let usersRepository: UsersRepository;
let registerUseCase: RegisterUseCase;
let getUserByIdUseCase: GetUserByIdUseCase;

describe("GetUserById Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        registerUseCase = new RegisterUseCase(usersRepository);
        getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    });

    it("should be able to list a user by id", async () => {
        const role = "ADMIN";

        const { user } = await registerUseCase.execute({
            name: "user-1",
            email: "user1@test.com",
            cpf: "001.990.332-88",
            role: role,
            password: "User@123",
        });

        const userById = await getUserByIdUseCase.execute(user.id);

        expect(userById).toBeTruthy();
        expect(userById?.id).toEqual(user.id);
    });

    it("should not be able to get user with wrong id", async () => {
        await expect(() =>
            getUserByIdUseCase.execute("non-existent-id")
        ).rejects.toBeInstanceOf(AppError);
    });
});