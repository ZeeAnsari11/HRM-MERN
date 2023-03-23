import mongoose from "mongoose";

const probationEvaluationSchema = mongoose.Schema({

    commonQuestions: [
        {
            name: {
                type: String,
                required: [true, 'Please enter name of the question'],
                trim: true,
                maxLength: [100, 'Cannot exceeds from 100 characters'],
            },
            overAllEvaluation: {
                type: Number,
                default: 0,
                min: 0,
                max: 10
            },
            performance: {
                type: Number,
                default: 0,
                min: 0,
                max: 10
            }
        }
    ],
    dynamicQuestions: [
        {
            name: {
                type: String,
                required: [true, 'Please enter name of the question'],
                trim: true,
                maxLength: [100, 'Cannot exceeds from 100 characters'],
            },
            overAllEval: {
                type: Number,
                default: 0,
                min: 0,
                max: 10
            },
            performance: {
                type: Number,
                default: 0,
                min: 0,
                max: 10
            },
        }
    ],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the Organization Id"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please Enter the User Id"]
    },
    released: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const ProbationEvaluationModel = mongoose.model('ProbationEvaluation', probationEvaluationSchema, 'Probation Evaluation Collection');