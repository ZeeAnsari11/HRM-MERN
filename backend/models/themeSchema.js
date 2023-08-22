import mongoose from "mongoose";

const themeSchema = mongoose.Schema({
    primary: {
        type: 'string',
        validate: /^#[a-fA-F0-9]{4,6}$/,
        // validate: {
        //     validator: function (value) {
        //         return /^#[a-fA-F0-9]{4,6}$/.test(value);
        //     },
        //     message: props => `Invalid code format: ${props.value}`
        // },
    },
    secondary: {
        type: 'string',
        validate: /^#[a-fA-F0-9]{4,6}$/,
    },
    dark_primary: {
        type: 'string',
        validate: /^#[a-fA-F0-9]{4,6}$/,
    },
    dark_secondary: {
        type: 'string',
        validate: /^#[a-fA-F0-9]{4,6}$/,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
        unique : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ThemeModel = mongoose.model('themeSchema', themeSchema, 'Theme Collection')