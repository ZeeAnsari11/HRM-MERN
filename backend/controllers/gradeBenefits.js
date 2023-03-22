
import { GradeBenefitsModel } from '../models/gradeBenefitsSchema.js';
import { GradeModel } from '../models/gradeSchema.js';
import { OrganizationModel } from '../models/organizationSchema.js';
import { createNew, getAll, getById, handleCatch } from '../utils/common.js';


export const getGradeBenefitsByGradeId = (req, res, next) => {
  try {
    OrganizationModel.findById(req.body.organization)
      .then((organization) => {
        if (!organization) throw "Organization not found"
        GradeModel.findById(req.params.id)
          .then((grade) => {
            if (!grade) throw "Grade not found"
            GradeBenefitsModel.find({ grade: req.params.id, organization: req.body.organization })
              .then((benefits) => {
                if (benefits.length === 0) throw "No Benefits found"
                if (grade.organization.toString() !== req.body.organization) throw "Invalid organization"
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
  } catch (error) {
    handleCatch(error, res, 404, next);
  }
};

export const getAllGradeBenefits = (req, res, next) => {
  getAll(res, next, GradeBenefitsModel, {organization: req.params.id}, "Grade Benefits");
}

export const getGradeBenefitsById = (req, res, next) => {
  getById(req.params.id, res, next, GradeBenefitsModel, "Grade Benefits");
};

export const createGradeBenefits = (req, res, next) => {
  try {
    const { name, organization, grade } = req.body
    if (req.body.createdAt) throw "You can't Provide CreatedAt"
    const uniqueGrade = [...new Set(grade)];
    req.body.grade = uniqueGrade
    OrganizationModel.findById(req.body.organization)
      .then((org) => {
        if (!org) throw "Invalid Organization ID"
        GradeBenefitsModel.exists({ name, organization })
          .then((benefitsExists) => {
            if (benefitsExists) {
              throw "Benefits already exists in the Organization"
            }
            else createNew(req, res, next, GradeBenefitsModel);
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

export const updateGradeBenefits = (req, res, next) => {

  try {
    if (req.body.createAt || req.body.organization) throw "You can not change the Organization Or Created At"
    GradeBenefitsModel.findByIdAndUpdate(req.params.id, req.body)
      .then((gradeBenefits) => {
        if (!gradeBenefits) throw 'Grade benefits not found'
        res.status(200).json({
          success: true,
          gradeBenefits
        });
      })
      .catch((error) => {
        handleCatch(error, res, 404, next);
      });
  }
  catch (error) {
    handleCatch(error, res, 404, next);
  }

};

export const deleteGradeBenefits = (req, res, next) => {

  GradeBenefitsModel.findByIdAndDelete(req.params.id)
    .then((gradeBenefits) => {
      if (!gradeBenefits) {
        return res.status(404).json({
          success: false,
          message: 'Grade benefits not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Grade benefits deleted successfully'
      });
    })
    .catch((error) => {
      handleCatch(error, res, 404, next);
    });
};

export const addGradeToBenefits = (req, res, next) => {

  const { benefitId } = req.params.id
  const { gradeId } = req.body.grade
  GradeBenefitsModel.findById(req.params.id)
    .populate("organization")
    .then((benefit) => {
      GradeModel.findById(req.body.grade)
        .populate("organization")
        .then((grade) => {
          if (benefit.organization._id.toString() !== grade.organization._id.toString()) {
            throw "The grade and benefit do not belong to the same organization"
          }
          GradeBenefitsModel.exists({ gradeId, benefitId })
            .then((gradeExists) => {
              if (gradeExists) {
                throw "The grade already exists in the Benefits"
              }
              benefit.grade.push(req.body.grade);
              console.log('------BG', benefit.grade)
              benefit.save()
            })
            .catch((error) => {
              handleCatch(error, res, 404, next);
            })
        })
        .catch((error) => {
          handleCatch(error, res, 404, next);
        });
    })
    .catch((error) => {
      handleCatch(error, res, 404, next);
    });
};



