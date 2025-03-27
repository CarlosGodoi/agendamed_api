import { env } from "@/config";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function verifyJwt(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization as string

    console.log('authHeader =>', authHeader);


    if (!authHeader) {
        const error = new AppError('error', 'Unauthorized', 401)

        return next(error)
    }

    const [token] = authHeader.split(' ')

    try {
        const jwtSecret = env.JWT_SECRET
        const payload = verify(token, jwtSecret) as {
            sub: string
        }

        console.log('Payload =>', payload);

        const userExists = await prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        if (!userExists) {
            const error = new AppError('error', 'User not exists.', 401)

            return next(error)
        }

        req.user = {
            id: userExists.id,
            role: userExists.role
        }

        next()

    } catch (error) {
        const appError = new AppError('error', 'Invalid token.', 401)
        next(appError)
    }
}