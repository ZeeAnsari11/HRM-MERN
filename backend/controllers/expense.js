import { ExpenseModel } from "../models/expenseSchema.js"
import { UserModel } from "../models/userSchema.js"
import { creatingRequest } from "../utils/request.js"
import { getAll, getById, handleCatch, updateById } from "../utils/common.js"
import { RequestFlowModel } from "../models/requestFlowSchema.js"
import mongoose from "mongoose"

export const createExpense = (req, res, next) => {
    try {
        let user;
        if (req.body.status || req.body.descriptionByApprover || req.body.paymentMethod) { throw new Error("Invalid Body") }
        UserModel.find({ _id: req.body.user, organization: req.body.organization }).select("_id lineManager organization branch firstName lastName designation")
            .then((users) => {
                if (users.length == 0) throw new Error('User And Organization Does Not Belog To Each Other')
                user = users[0];
                mongoose.startSession().then((session) => {
                    session.startTransaction();
                    ExpenseModel.create([req.body], { session: session })
                        .then((newExpense) => {
                            let expense = newExpense[0];
                            return RequestFlowModel.find({ name: "Expense Flow" }).populate({
                                path: "requestType",
                                match: {
                                    organization: user.organization,
                                },
                            })
                                .then((flows) => {
                                    let flow = flows.filter(flow => flow.requestType != null)
                                    if (flow.length == 0) {
                                        throw new Error("There is no flow defined for this type of request by organization.");
                                    } else {
                                        return Promise.resolve(flow[0]);
                                    }
                                })
                                .then((flow) => {
                                    creatingRequest(req, res, next, user, expense, flow._id, flow.requestType._id, "Expense");
                                    session.commitTransaction()
                                })
                                .catch((err) => {
                                    session.endSession();
                                    handleCatch(err, res, 400, next);
                                });
                        })
                })
            })
            .catch((err) => {
                handleCatch(err, res, 400, next)
            })
    }
    catch (err) { handleCatch(err, res, 400, next) }
}


export const getExpenseById = (req, res, next) => {
    getById(req.params.id, res, next, ExpenseModel, "Expense")
}

export const deleteExpenseById = (req, res, next) => {
    ExpenseModel.findById(req.params.id)
        .then((expense) => {
            if (!expense) {
                const notFoundError = new Error("Expense not found");
                notFoundError.statusCode = 404;
                throw notFoundError;
            }
            if (expense.status !== "pending") {
                const forbiddenError = new Error("You cannot delete an approved or rejected or processing expense request");
                forbiddenError.statusCode = 423;
                throw forbiddenError;
            }

            expense.remove()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: `Expense Request Deleted Successfully`
                    });
                })
                .catch((err) => handleCatch(err, res, 500, next));
        })
        .catch((err) => {
            handleCatch(err, res, err.statusCode || 500, next);
        });
};

export const filterExpenses = (req, res, next) => {
    try {
        if (!req.query.organization) throw new Error("Organization not specified");
        const filters = { organization: req.query.organization };
        if (req.query.status) {
            const validStatuses = ["pending", "approved", "rejected", "processing"];
            const status = req.query.status.toLowerCase();
            if (validStatuses.includes(status)) {
                filters.status = status;
            } else {
                throw new Error(`You can only filter on the basis of "pending", "approved", "rejected", or "processing"`);
            }
        }
        if (req.query.paymentMethod) {
            filters.paymentMethod = req.query.paymentMethod;
        }
        ExpenseModel.find(filters)
            .then((expenses) => {
                if (expenses.length === 0) throw new Error("No expenses found for the specified filters");
                res.status(200).json({
                    success: true,
                    count: expenses.length,
                    data: expenses
                });
            })
            .catch(err => handleCatch(err, res, 404, next));
    } catch (err) {
        handleCatch(err, res, 400, next);
    }
}


export const updateExpenseById = (req, res, next) => {
    try {
        if (req.body.user || req.body.organization || req.body.status) throw new Error('You can not update the organization, and user of expense')
        ExpenseModel.findById(req.params.id)
            .then((expense) => {
                if (!expense) {
                    const notFoundError = new Error("Expense not found");
                    notFoundError.statusCode = 404;
                    throw notFoundError;
                }
                if (expense.status !== "pending") {
                    const forbiddenError = new Error("You cannot Updated an approved or rejected or processing expense request");
                    forbiddenError.statusCode = 423;
                    throw forbiddenError;
                }
                updateById(req, res, next, ExpenseModel, "Expense")
            })
            .catch((err) => {
                handleCatch(err, res, err.statusCode || 500, next);
            });
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
}

export const getAllExpensesByUserId = (req, res, next) => {
    getAll(res, next, ExpenseModel, { user: req.params.id }, "Expense")
}

export const ExpenseApproved = () => {
    console.log("========= Your Expense is Approved=======");
}