import mongoose from "mongoose";

const probationEvaluationSchema = mongoose.Schema({
    commonQuestions: [
        {
            name: {
                type: String,
                required: [true, 'Please enter name of the question'],
                trim: true,
                maxLength: [100, 'Cannot exceeds from 100 characters']
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
    Requestee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Please Enter the Requestee"]
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
    totalPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    grade: {
        type: String,
        default: 'F'
    },
    released: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    assignedResponsibilities: [{
        responsibility: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
          }
      }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

probationEvaluationSchema.pre('save', function (next) {
    const totalPercentage = (this.commonQuestions.reduce((acc, val) => acc + val.performance, 0) +
        this.dynamicQuestions.reduce((acc, val) => acc + val.performance, 0)) / (this.commonQuestions.length + this.dynamicQuestions.length);

    this.totalPercentage = totalPercentage
    if (totalPercentage >= 90) {
        this.grade = 'A';
    } else if (totalPercentage >= 80) {
        this.grade = 'B';
    } else if (totalPercentage >= 70) {
        this.grade = 'C';
    } else if (totalPercentage >= 60) {
        this.grade = 'D';
    } else {
        this.grade = 'F';
    }

    next();
});

export const ProbationEvaluationModel = mongoose.model('ProbationEvaluation', probationEvaluationSchema, 'Probation Evaluation Collection');