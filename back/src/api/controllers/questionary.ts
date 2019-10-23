import {Request, Response} from 'express';
import {Questionary} from "../models/Questions";

/**
 * GET /
 * Home page.
 */
export const random = async (req: Request, res: Response) => {
    // Count
    const count = await Questionary.count(undefined).exec();

    // Random
    const random = Math.floor(Math.random() * count);

    const questionary = await Questionary.findOne().select('questions id timer').skip(random).exec();

    if (!questionary) {
        return res.status(404).json({
           status: res.statusCode,
           response: 'No questionaries found, please populate the database.'
        });
    }

    res.status(200).json({
        status: res.statusCode,
        result: questionary
    });
};
