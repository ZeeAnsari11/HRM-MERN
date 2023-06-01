import { GradeModel } from "../models/gradeSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";
import { getById, createNew, updateById, deleteById, handleCatch } from "../utils/common.js";

// Create a new grade
//api/v1/grade/new
export const createGrade = (req, res, next) => {
    try {
        const { name, organization } = req.body;
        if (req.body.createdAt) throw new Error ("You can't Provide CreatedAt")
        OrganizationModel.findById(organization)
            .then((org) => {
                if (!org) throw new Error ("Invalid Organization ID")
                req.body.unique_id = name.replace(/\s/g, "")
                createNew(req, res, next, GradeModel);
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }
};

//Get all the Grades of Organizationß
// /api/v1/grade/organization/:id
export const getAllGrades = (req, res, next) => {
    GradeModel.find({ organization: req.params.id })
        .then((grades) => {
            if (grades.length === 0) throw new Error ("No grades found")
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
        if (req.body.createAt || req.body.organization || req.body.unique_id) throw new Error ("You can not change the Organization Or Created At")
        if(req.body.name){
            req.body.unique_id = req.body.name.replace(/\s/g, "") 
        }
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
