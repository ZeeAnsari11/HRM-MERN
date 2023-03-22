import mongoose from "mongoose";
import { handleCatch } from "../utils/common.js";

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    validate: /^[a-zA-Z0-9]+$/,
    required: [true, "Please Enter the Name of the Grade"],
    maxlength: [100, "Organization Name Can't Exceed 100 Characters"],
    trim: true,
    lowercase: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, "Please Enter the OrganizationId"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

gradeSchema.pre('save', function(next) {
  
  const grade = this;

  const Grade = mongoose.model('Grade');

  // check if a Grade with the same name already exists in this organization
  Grade.findOne({ name: grade.name, organization: grade.organization })
    .then((foundGrade) => {
      if (foundGrade) {

        throw "Grade with this name already exists in this organization"
      }
      else next()
    })
    .catch((error) => {
      handleCatch(error, res, 404, next)
    });
});

export const GradeModel = mongoose.model('Grade', gradeSchema, 'Grade Collection');

