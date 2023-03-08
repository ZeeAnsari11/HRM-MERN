import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    tag: {
        type: String,
        trim: true,
        required: [true, 'Please enter skill tag'],
        maxlength: [60, 'Tag name can not exceed length of more than 60']
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
})

export const SkillsModel = mongoose.model('Skills', skillsSchema, 'Skills Collection')