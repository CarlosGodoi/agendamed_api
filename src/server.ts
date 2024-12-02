import express, { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './docs/swagger.json'
import { Prisma } from '@prisma/client';
import { env } from './config';
import { app } from './config/app';
import { AppError } from './utils/errors/AppError';
import { prisma } from './lib/prisma';
import { router } from './http/routes';

const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log('err', error);

    if (error instanceof AppError) {
        const errors = [
            {
                message: error.message,
                field: error.field
            }
        ];
        res.status(error.statusCode).json(errors);
        return;
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log('db error =>', error.message);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('db error =>', error.message);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        console.log('db error =>', error.message);
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        console.log('db error =>', error.message);
    }

    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};

prisma
    .$connect()
    .then(() => {
        console.log('Database has connected');

        app.use(cors());
        app.use(express.json());

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

        app.use(router);

        app.use(errorHandler);

        app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT} 🚀\nAPI documentation => ${env.APP_HOST}/api-docs`));
    })
    .catch(err => {
        console.log('ERROR DATABASE =>', err.message);
    });