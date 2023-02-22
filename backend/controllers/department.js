import { DepartmentModel } from '../models/departmentSchema.js'
import { BranchSchema } from '../models/branchSchema.js'

const createDepartment = (req, res, next) => {
    BranchSchema.findById(req.body.branch)
        .then((branch) => {
            if (branch) {
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
                    message: `No Branch with this id ${req.body.branch}`
                })
            }
        })
}


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
    DepartmentModel.find()
        .then((departments) => {
            departments.find({})
        })
}


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



export {
    createDepartment, getAllDepartmentsByBranchId, getAllDepartmentsByOrganizationId, getDepartmentById,
    deleteDepartmentById, updateDepartmentNameById, getBranchByDepartmentId
}