import mongoose from 'mongoose';

export type QuestionaryDocument = mongoose.Document & {
    timer: number;
    questions: {
        question: string,
        result: string
    } []
};

const QuestionarySchema = new mongoose.Schema({
    timer: {
        type: Number,
        required: true,
    },
    questions: [
        {
            type: Object,
        }
    ]
}, {timestamps: true});

export const Questionary = mongoose.model<QuestionaryDocument>('Questionary', QuestionarySchema);
