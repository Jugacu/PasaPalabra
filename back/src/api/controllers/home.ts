import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    res.json({
        message: 'Pasa Palabra API'
    });
};
