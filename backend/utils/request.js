import { RequestModel } from "../models/requestSchema.js";
import { handleCatch, updateById } from './common.js'
import { RequestFlowModel } from "../models/requestFlowSchema.js";
import { RequestFlowNodeModel } from "../models/requestFlowSchema.js";
import { UserModel } from "../models/userSchema.js";
import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
import { WFHModel } from "../models/wfhSchema.js";
import { MissingPunchesModel } from "../models/missingPunchesSchema.js";
import { updateAttendance } from "../controllers/attendance.js"
import { LoanModel } from "../models/loanSchema.js";
import { rejectLeaveRequest } from "../controllers/leaveRequest.js";
import { ExpenseModel } from "../models/expenseSchema.js";
let errorOccurred = false

export const creatingRequest = (req, res, next, user, request, requestFlow, requestType, type = null) => {
    RequestFlowModel.findById(requestFlow)
        .then((requestFlow) => {
            if (!requestFlow) throw new Error('No such request flow')
            if (requestFlow.head == null) throw "No such node for the flow"
            RequestFlowNodeModel.find(requestFlow.head)
                .then((node) => {
                    if (node.length == 0) throw new Error('No such node')
                    getfirstNodeUser(req, res, next, node, user, request, requestType, type);
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

const getfirstNodeUser = async (req, res, next, node, user, request, requestType, type = null) => {
    try {
        let nodeUser = ''
        if (node[0].lineManager) nodeUser = user.lineManager
        else {
            const departmentUser = await UserModel.findOne({ HOD: { isHOD: true, department: node[0].department } }).select('_id');
            if (!departmentUser) {
                errorOccurred = true
                throw new Error("Department not Found")
            }
            nodeUser = departmentUser._id;
        }
        let x = {
            nodeId: node[0]._id,
            senderId: request.user,
            receiverId: nodeUser,
            type,
            requestId: request._id,
            message: `${user.firstName + ' ' + user.lastName} has requested ${type} request`,
            flowRequestType: requestType,
            createdAt: request.createdAt
        }
        addingRequest(req, res, next, x)
    } catch (error) {
        handleCatch(error, res, 404, next)
    }
}


const addingRequest = (req, res, next, obj, show = true) => {
    const senderId = obj.senderId;
    RequestModel.findOne({ "requests.requestDetails.senderId": senderId })
        .then((userFound) => {
            if (!userFound) {
                req.body.requests = {
                    requestDetails: []
                }
                req.body.requests.requestDetails.push(obj)
                RequestModel.create(req.body)
                    .then(() => {
                        if (show) {
                            res.status(200).json({
                                success: true,
                                message: "Your Rquest created successfully"
                            })
                        }
                        else return
                    })
                    .catch((error) => {
                        handleCatch(error, res, 500, next)
                    })
            }
            else {
                userFound.requests.requestDetails.push(obj);
                userFound.save()
                    .then(() => {
                        if (show) {
                            res.status(200).json({
                                success: true,
                                message: "Your Rquest created successfully"
                            })
                        }
                        else return;
                    })
                    .catch((error) => { handleCatch(error, res, 500, next) })
            }
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

export const requestToNextNode = (req, res, next) => {
    try {
        // console.log('===============11============');
        if (!req.body.nodeId || !req.body.notificationId || !req.body.senderId || !req.body.flowRequestType || !req.body.requestId || !req.body.createdAt || !req.body.type) throw new Error('Invalid Body.')
        RequestFlowNodeModel.findById(req.body.nodeId)
            .then((previousNode) => {
                if (!previousNode) throw new Error('No such node')
                if (previousNode.nextNode !== null) {
                    RequestFlowNodeModel.findById(previousNode.nextNode)
                        .then((node) => {
                            if (!node) throw new Error('No such node available.')
                            UserModel.findById(req.body.senderId)
                                .then((user) => {
                                    if (!user) throw new Error('No such user')
                                    settingStatus(req, res, next, '', node, user)
                                })
                                .catch((error) => {
                                    // console.log("=========1========", error);
                                    handleCatch(error, res, 404, next)
                                })
                        })
                        .catch((error) => {
                            // console.log("=========2========", error);
                            handleCatch(error, res, 401, next)
                        })
                }
                else {
                    switch (req.body.type) {
                        case 'MissingPunches': {
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                        case 'Leave': {
                            // console.log('===============22============');
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                        case 'Loan': {
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                        case 'WFH': {
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                        case 'Expense': {
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                    }
                }
            })
            .catch((error) => {
                // console.log("========3========", error);
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        // console.log("=========4========", error);

        handleCatch(error, res, 400, next)
    }
}

const settingStatus = (req, res, next, requestStatus = null, node = null, user = null) => {
    // console.log('===============33============');

    const requestId = req.body.notificationId;
    const type = req.body.type
    RequestModel.findOne({ "requests.requestDetails._id": requestId })
        .then((request) => {
            if (!request) throw new Error("Request Object in Request Collection not found")
            request.requests.requestDetails.forEach(previousRequest => {
                if (previousRequest._id.toString() == req.body.notificationId) {
                    if (previousRequest.state != "pending") throw new Error("This request already approved/rejected by you")
                    previousRequest.state = requestStatus == 'rejected' ? "rejected" : "approved"
                    if (node && user) {
                        // console.log("-------geting node user=======");
                        getNodeUser(node, user, req, res, next, false);
                    }
                }
            })
            request.save()
                .then(() => {
                    switch (type) {
                        case 'MissingPunches': {
                            commonModels(req, res, next, MissingPunchesModel, requestStatus, 'MissingPunches')
                            break;
                        }
                        case 'Loan': {
                            commonModels(req, res, next, LoanModel, requestStatus, 'Loan')
                            break;
                        }
                        case 'Leave': {
                            // console.log('===============44============');

                            commonModels(req, res, next, LeaveRequestModel, requestStatus, 'Leave')
                        }
                            break;
                        case 'WFH': {
                            commonModels(req, res, next, WFHModel, requestStatus, 'WFH')
                            break;
                        }
                        case 'Expense': {
                            commonModels(req, res, next, ExpenseModel, requestStatus, 'Expense')
                            break;
                        }
                    }
                })
                .catch((err) => {
                    // console.log("=========5========", error);
                    handleCatch(err, res, 500, next)
                })
        })
        .catch((error) => {
            // console.log("=========6========", error);

            handleCatch(error, res, 404, next)
        })
}


const getNodeUser = async (node, user, req, res, next, show) => {
    try {
        // console.log("========node========",node);
        let nodeUser = ''
        if (node.lineManager) {
            // console.log("--------if called========");
            nodeUser = user.lineManager
        }
        else {
            const departmentUser = await UserModel.findOne({ HOD: { isHOD: true, department: node.department } }).select('HOD firstName lastName');
            // console.log("==========departmentUser========",departmentUser );
            if (!departmentUser) {
                errorOccurred = true
                throw new Error("Department not found for user")
            }
            nodeUser = departmentUser._id;
        }
        let x = {
            nodeId: node._id,
            senderId: req.body.senderId,
            receiverId: nodeUser,
            type: req.body.type,
            requestId: req.body.requestId,
            message: `${user.firstName + ' ' + user.lastName} has generated a ${req.body.type} request`,
            flowRequestType: req.body.flowRequestType,
            createdAt: req.body.createdAt
        }
        addingRequest(req, res, next, x, show)
    } catch (error) {
        handleCatch(error, res, 404, next)
        return;
    }
}

export const commonModels = (req, res, next, model, requestStatus = null, msg) => {
    // console.log('===============55============');
    model.findById(req.body.requestId)
        .then((Obj) => {
            if (!Obj) throw new Error(`Request for ${msg} is not found`)
            Obj.status = requestStatus == "approvedByAll" ? "approved" : requestStatus == "rejected" ? "rejected" : "processing"
            Obj.save()
                .then((Obj) => {
                    if (requestStatus == "approvedByAll") {
                        switch (msg) {
                            case 'MissingPunches': {
                                let request = {};
                                request.body = {
                                    user: Obj.user,
                                    date: Obj.date.toISOString().slice(0, 10),
                                    [Obj.punchType]: Obj.expectedTime
                                }
                                updateAttendance(request, res, next);
                            }
                                break;
                            case 'Loan': {
                                console.log("=======Your Loan Request is Approved");
                            }
                                break;
                            case 'Leave': {
                                // console.log('===============66============');
                                updateAttendance(req, res, next, true);
                            }
                                break;
                            case 'WFH': {
                                console.log("===============Your WFH Request is Approved ");
                            }
                                break;
                            case 'Expense': {
                                if (!Obj.descriptionByApprover || !Obj.paymentMethod) {
                                    Obj.descriptionByApprover = req.body.descriptionByApprover
                                    Obj.paymentMethod = req.body.paymentMethod
                                }
                                if (Obj.paymentMethod == "manual") {
                                    Obj.status = "paid"
                                }

                                Obj.save();
                                res.status(200).json({
                                    success: true,
                                    message: "Your Expense Request Approved successfully"
                                })
                            }
                                break;
                        }
                    }
                    else {
                        if (errorOccurred) return;
                        // console.log("=======errorOccurred==", errorOccurred);
                        if (msg == "Expense") {
                            if (!Obj.descriptionByApprover || !Obj.paymentMethod) {
                                Obj.descriptionByApprover = req.body.descriptionByApprover
                                Obj.paymentMethod = req.body.paymentMethod
                                Obj.save()
                                    .catch((err) => { handleCatch(err, res, 500, next) })
                            }
                        }
                        let message = requestStatus == 'rejected' ? `Your Request for ${msg} is Rejected` : `Your Request for ${msg} Approved by Node`
                        res.status(200).json({
                            success: true,
                            message
                        })
                        return;
                    }
                })
                .catch(err => handleCatch(err, res, 404, next))
        })
        .catch(err => handleCatch(err, res, 404, next))
}

export const rejectRequest = (req, res, next) => {
    settingStatus(req, res, next, 'rejected')
    switch (req.body.type) {
        case 'Leave': {
            const request = {
                params: {
                    id: req.body.requestId
                }
            };
            rejectLeaveRequest(request, res, next, false)
        }
            break;
    }
}


