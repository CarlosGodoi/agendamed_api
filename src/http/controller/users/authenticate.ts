import { Request, Response, NextFunction } from "express";
import { authBodySchema } from "./schemas/authSchema";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { TokenService } from "@/services/tokenServices";

export async function authenticate(req: Request, res: Response, _: NextFunction) {
    const { email, password } = authBodySchema.parse(req.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const auth = await authenticateUseCase.execute({ email, password });

        const accessToken = TokenService.generateAccessToken({
            userId: auth.user.id,
            email: auth.user.email,
            role: auth.user.role,
        });

        const refreshToken = TokenService.generateRefreshToken({
            userId: auth.user.id,
        });

        return res.status(200).json({
            user: auth.user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(401).json({ error: "Authentication failed" });
    }
}
