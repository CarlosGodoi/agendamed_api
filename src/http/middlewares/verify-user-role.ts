import { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function validateAuthUser(app: Application) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            res.status(401).send({ message: "Unauthorized: No token provided." });
            return;
        }

        const jwtSecret = app.get("jwtSecret");

        if (!jwtSecret) {
            res.status(500).send({ message: "Internal server error: JWT not defined." });
            return;
        }

        try {
            const decodedToken = jwt.verify(token, jwtSecret) as {
                role: "ADMIN" | "OPERATOR" | "DOCTOR";
            };

            if (req.originalUrl.includes("/user/register") && decodedToken.role !== "ADMIN") {
                console.log("Permission denied: Insufficient role");
                res.status(403).send({ message: "Permission denied: Insufficient role" });
                return;
            }

            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).send({ message: "Invalid token." });
        }
    };
}
