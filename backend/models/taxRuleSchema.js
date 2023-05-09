import mongoose from "mongoose";

const taxRuleSchema = mongoose.Schema({
    ruleNo: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    fromAmount: {
        type: Number,
        required: true,
    },
    toAmount: {
        type: Number,
        required: true,
    },
    fixRate: {
        type: Number
    },
    percentage: {
        type: Number,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const TaxRuleModel = mongoose.model('TaxRule', taxRuleSchema, 'Tax Rule Collection')