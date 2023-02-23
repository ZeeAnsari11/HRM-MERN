import { DepartmentModel } from '../models/departmentSchema.js'
import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'

//// Creating New Department ////
const createDepartment = (req, res, next) => {
    OrganizationModel.findById(req.body.organization)
        .then((organization) => {
            if (organization) {
                BranchSchema.findById(req.body.branch)
                    .then((branch) => {
                        if (branch && branch.organization === req.body.branch) {
                            DepartmentModel.create(req.body)
                                .then((department) => {
                                    res.status(201).json({
                                        success: true,
                                        department
                                    })
                                })
                        }
                        else {
                            res.status(404).json({
                                success: false,
                                message: `No Branch with this id ${req.body.branch} or Branch does not exist in this organization`
                            })
                        }
                    })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Organization with this id ${req.body.organization}`
                })
            }
        })
}

//// Get All Departments By Branch Id ////
const getAllDepartmentsByBranchId = (req, res, next) => {
    DepartmentModel.find({ branch: req.params.id })
        .then((department) => {
            res.status(200).json({
                success: true,
                department
            })
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })

}

const getAllDepartmentsByOrganizationId = (req, res, next) => {
    DepartmentModel.find({ organization: req.params.id })
        .then((departments) => {
            if (departments) {
                res.status(200).json({
                    success: true,
                    departments
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Organization with this id ${req.params.id}`
                })
            }
        })
}

//// Get Department By Id ////
const getDepartmentById = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (department) {
                res.status(200).json({
                    success: true,
                    department
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })

}

//// Update Department By Id ////
const updateDepartmentNameById = (req, res, next) => {
    DepartmentModel.findByIdAndUpdate(req.params.id, req.body)
        .then((department) => {
            if (department) {
                res.status(200).json({
                    success: true,
                    department
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })

}

//// Delete Department By Id ////
const deleteDepartmentById = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (department) {
                department.remove()
                res.status(200).json({
                    success: true,
                    message: 'Department Deleted Successfully'
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })
}

//// Get Branch By Department Id ////
const getBranchByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (department) {
                BranchSchema.find({ _id: department.branch })
                    .then((branch) => {
                        if (branch) {
                            res.status(200).json({
                                success: true,
                                branch
                            })
                        }
                        else {
                            res.status(404).json({
                                success: false,
                                message: `No Branch with this id ${req.params.id}`
                            })
                        }
                    })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })
}

//// Get Organization By Department Id ////
const getOrganizationByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (department) {
                BranchSchema.findById(department.branch)
                    .then((branch) => {
                        if (branch) {
                            OrganizationModel.find({ _id: branch.organization })
                                .then((organization) => {
                                    if (organization) {
                                        res.status(201).json({
                                            success: true,
                                            organization
                                        })
                                    }
                                    else {
                                        res.status(404).json({
                                            success: false,
                                            message: `No Organization with this id ${req.params.id}`
                                        })
                                    }
                                })
                        }
                        else {
                            res.status(404).json({
                                success: false,
                                message: `No Branch with this id ${req.params.id}`
                            })
                        }
                    })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })
}



export {
    createDepartment, getAllDepartmentsByBranchId, getAllDepartmentsByOrganizationId, getDepartmentById,
    deleteDepartmentById, updateDepartmentNameById, getBranchByDepartmentId, getOrganizationByDepartmentId
}