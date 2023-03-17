import mongoose from "mongoose";

const evaluationRatingsSchema = mongoose.Schema({
    ratings: {
        type: String,
        required: [true, "Enter Ratings"],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters']
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    unique_id: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const EvaluationRatingseModel = mongoose.model('Evaluationratings', evaluationRatingsSchema, 'Evaluation Ratings Collection')