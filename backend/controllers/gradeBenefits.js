import { createNew, getAll, getById, handleCatch } from '../utils/common.js';

import { GradeBenefitsModel } from '../models/gradeBenefitsSchema.js';
import { GradeModel } from '../models/gradeSchema.js';
import { OrganizationModel } from '../models/organizationSchema.js';

export const getGradeBenefitsByGradeId = (req, res, next) => {
  try {
    OrganizationModel.findById(req.body.organization)
      .then((organization) => {
        if (!organization) throw new Error("Organization not found")
        GradeModel.findById(req.params.id)
          .then((grade) => {
            if (!grade) throw new Error("Grade not found")
            GradeBenefitsModel.find({ grade: req.params.id, organization: req.body.organization })
              .then((benefits) => {
                if (benefits.length === 0) throw new Error("No Benefits found")
                if (grade.organization.toString() !== req.body.organization) throw new Error("Invalid organization")
                res.status(200).json({
                  success: true,
                  benefits
                });
              })
              .catch((error) => {
                handleCatch(error, res, 404, next)
              });
          })
          .catch((error) => {
            handleCatch(error, res, 404, next);
          });
      })
      .catch((error) => {
        handleCatch(error, res, 404, next);
      });
  } catch (error) {
    handleCatch(error, res, 404, next);
  }
};

export const updateGradeBenefits = (req, res, next) => {
  try {
    if (req.body.organization) {
      throw new Error('Cannot Update the Organization')
    }
    if (req.body.grade.length === 0) {
      throw new Error("Please select at least 1 designation.");
    }
    GradeBenefitsModel.findById(req.params.id)
      .then((gradeBenefit) => {
        if (!gradeBenefit) throw new Error("gradeBenefit not found")
        let DbGrades = req.body.grade || [];
        let notExistGrades = []
        let count = 0
        req.body.grade.forEach((gradeId) => {
          GradeModel.find({ _id: gradeId, organization: gradeBenefit.organization })
            .then((grade) => {
              count++;
              if (grade.length == 0) notExistGrades.push(gradeId);
              else {
                if (!DbGrades.includes(gradeId)) {
                  DbGrades.push(gradeId);
                }
              }
              if (req.body.grade.length == count) {
                gradeBenefit.grade = DbGrades;
                if (req.body.name) {
                  gradeBenefit.name = req.body.name
                  gradeBenefit.unique_id =   req.body.name.replace(/\s/g, "")
                }
                if (req.body.description) {
                  gradeBenefit.description = req.body.description
                }
                gradeBenefit.save()
                  .then((response) => {
                    if (!response) {
                      throw new Error(`gradeBenefit Not Updated Successfully`);
                    }
                    res.status(200).json({
                      success: true,
                      Message: `Updated Successfully`,
                      notExistGrades: `grades not found ${notExistGrades}`
                    })
                  })
                  .catch((err) => {
                    handleCatch(err, res, 500, next)
                  })
              }
            })
            .catch((err) => {
              handleCatch(err, res, 500, next)
            })
        })
      })
      .catch((err) => {
        handleCatch(err, res, 500, next)
      })
  }

  catch (error) {
    handleCatch(error, res, 400, next)
  }

}
export const getAllGradeBenefits = (req, res, next) => {
  getAll(res, next, GradeBenefitsModel, { organization: req.params.id }, "Grade Benefits");
}

export const getGradeBenefitsById = (req, res, next) => {
  getById(req.params.id, res, next, GradeBenefitsModel, "Grade Benefits");
};

export const createGradeBenefits = (req, res, next) => {
  try {
    const { name, organization, grade } = req.body
    if (req.body.createdAt) throw new Error("You can't Provide CreatedAt")
    const uniqueGrade = [...new Set(grade)];
    req.body.grade = uniqueGrade
    OrganizationModel.findById(req.body.organization)
      .then((org) => {
        if (!org) throw new Error("Invalid Organization ID")
        GradeBenefitsModel.exists({ name, organization })
          .then((benefitsExists) => {
            if (benefitsExists) {
              throw new Error("Benefits already exists in the Organization")
            }
            else {
              req.body.unique_id = name.replace(/\s/g, "")
              createNew(req, res, next, GradeBenefitsModel);
            }
          })
          .catch((error) => {
            handleCatch(error, res, 404, next)
          })
      })
      .catch((error) => {
        handleCatch(error, res, 404, next)
      })

  } catch (error) {
    handleCatch(error, res, 404, next)
  }
};

// export const updateGradeBenefits = (req, res, next) => {
//   try {
//     if (req.body.createAt || req.body.organization || req.body.unique_id) throw new Error ("You can not change the Organization Or Created At")
//     if (req.body.name) {
//       req.body.unique_id = req.body.name.replace(/\s/g, "")
//     }
//     updateById(req, res, next, GradeBenefitsModel, "Grade Benifits")
//   }
//   catch (error) {
//     handleCatch(error, res, 404, next)
//   }
// };

export const deleteGradeBenefits = (req, res, next) => {

  GradeBenefitsModel.findByIdAndDelete(req.params.id)
    .then((gradeBenefits) => {
      if (!gradeBenefits) {
        throw new Error('Grade benefits not found')
      };
      res.status(200).json({
        success: true,
        message: 'Grade benefits deleted successfully'
      });
    })
    .catch((error) => {
      handleCatch(error, res, 404, next);
    });
};

// export const addGradeToBenefits = (req, res, next) => {

//   const { benefitId } = req.params.id
//   const { gradeId } = req.body.grade
//   GradeBenefitsModel.findById(req.params.id)
//     .populate("organization")
//     .then((benefit) => {
//       GradeModel.findById(req.body.grade)
//         .populate("organization")
//         .then((grade) => {
//           if (benefit.organization._id.toString() !== grade.organization._id.toString()) {
//             throw new Error ("The grade and benefit do not belong to the same organization")
//           }
//           GradeBenefitsModel.exists({ gradeId, benefitId })
//             .then((gradeExists) => {
//               if (gradeExists) {
//                 throw new Error ("The grade already exists in the Benefits")
//               }
//               benefit.grade.push(req.body.grade);
//               benefit.save()
//             })
//             .catch((error) => {
//               handleCatch(error, res, 404, next);
//             })
//         })
//         .catch((error) => {
//           handleCatch(error, res, 404, next);
//         });
//     })
//     .catch((error) => {
//       handleCatch(error, res, 404, next);
//     });
// };



