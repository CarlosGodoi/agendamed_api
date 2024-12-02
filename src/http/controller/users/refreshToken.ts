import { TokenService } from "@/services/tokenServices";
import { Request, Response } from "express";


export async function refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token required" });
    }

    try {
        const decoded = TokenService.verifyRefreshToken(refreshToken);

        const accessToken = TokenService.generateAccessToken({
            userId: decoded.userId,
        });

        return res.json({ accessToken });
    } catch (error) {
        return res.status(401).json({ error: "Invalid refresh token" });
    }
}
