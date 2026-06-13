import mongoose, { Document, Schema, Types } from "mongoose"

export interface IQuizHistory extends Document {
    user: Types.ObjectId;
    note: Types.ObjectId;
    noteTitle: string;
    score: number;
    totalQuestions: number;
    createdAt: Date;
}

const quizHistorySchema = new Schema<IQuizHistory>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        note: {
            type: Schema.Types.ObjectId,
            ref: "Note",
            required: true
        },
        noteTitle: {
            type: String,
            required: true,
            trim: true
        },
        score: {
            type: Number,
            required: true
        },
        totalQuestions: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IQuizHistory>("QuizHistory", quizHistorySchema)