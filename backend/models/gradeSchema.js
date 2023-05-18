import mongoose from "mongoose";
import { handleCatch } from "../utils/common.js";

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    validate: /^[a-zA-Z0-9\s]+$/,
    required: [true, "Please Enter the Name of the Grade"],
    maxlength: [100, "Grade Name Can't Exceed 100 Characters"],
    trim: true,
    lowercase: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, "Please Enter the OrganizationId"]
  },
  unique_id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    index: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const GradeModel = mongoose.model('Grade', gradeSchema, 'Grade Collection');

