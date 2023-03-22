import { GradeModel } from "../models/gradeSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";
import { getById, createNew, updateById, deleteById, handleCatch } from "../utils/common.js";

// Create a new grade
//api/v1/grade/new
export const createGrade = (req, res, next) => {

    try {
        const { name, organization } = req.body;
        if (req.body.createdAt) throw "You can't Provide CreatedAt"
        OrganizationModel.findById(organization)
            .then((org) => {
                if (!org) throw "Invalid Organization ID"
                GradeModel.exists({ name: name, organization: organization })
                    .then((gradeExists) => {
                        if (gradeExists) {
                            res.status(400).json({
                                message: "Grade already exists in the organization"
                            });
                        }
                        else {
                            createNew(req, res, next, GradeModel);
                        }
                    })
                    .catch((error) => {
                        handleCatch(error, res, 404, next)
                    })
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }


};

//Get all the Grades of Organization
// /api/v1/grade/organization/:id
export const getAllGrades = (req, res, next) => {

    GradeModel.find({ organization: req.params.id })
        .then((grades) => {
            if (grades.length === 0) throw "No grades found"
            res.status(200).json({
                success: true,
                grades
            });

        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        });
}

// Get a single grade by ID
//grade/:id
export const getGradeById = (req, res, next) => {
    getById(req.params.id, res, next, GradeModel, "Grade")
};

// Update an existing grade
//api/v1/grade/update/:id
export const updateGrade = (req, res, next) => {
    try {
        if (req.body.createAt || req.body.organization) throw "You can not change the Organization Or Created At"
        updateById(req, res, next, GradeModel, "Grade")
    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }
};

// Delete an existing grade by Id
export const deleteGradeById = (req, res, next) => {
    deleteById(req.params.id, res, next, GradeModel, "Grade")
};
