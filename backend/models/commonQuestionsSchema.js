import mongoose from "mongoose";

const commonQuestionsSchema = new mongoose.Schema({
    commonQuestion: [{
            name: {
                type: String,
                required: [true, 'Please enter name of the question'],
                trim: true,
                maxLength: [100, 'Cannot exceeds from 100 characters'],
            },
            overAllEvaluation: {
                type: Number,
                default: 0
            },
            performance: {
                type: Number,
                default: 0
            },
        }],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    }
})
export const CommonQuestionsModel = mongoose.model('CommonQuestions', commonQuestionsSchema, 'Common Questions Collection')