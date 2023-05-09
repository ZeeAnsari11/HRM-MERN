import { RequestModel } from "../models/requestSchema.js";
import { handleCatch } from './common.js'
import { RequestFlowModel } from "../models/requestFlowSchema.js";
import { RequestFlowNodeModel } from "../models/requestFlowSchema.js";
import { UserModel } from "../models/userSchema.js";
import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
import { WFHModel } from "../models/wfhSchema.js";
import { MissingPunchesModel } from "../models/missingPunchesSchema.js";
import { updateAttendance } from "../controllers/attendance.js"
import { LoanModel } from "../models/loanSchema.js";

export const creatingRequest = (req, res, next, user, request, requestFlow, requestType, type = null) => {
    RequestFlowModel.findById(requestFlow)
        .then((requestFlow) => {
            // console.log("========RequestFlowModel==",requestFlow);
            if (!requestFlow) throw 'No such request flow'
            RequestFlowNodeModel.find(requestFlow.head)
                .then((node) => {
                    // console.log("========RequestFlowNodHead==",node);
                    if (node.length == 0) throw 'No such node'
                    getfirstNodeUser(req, res, next, node, user, request, requestType, type);
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const getfirstNodeUser = async (req, res, next, node, user, request, requestType, type = null) => {
    try {
        let nodeUser = ''
        if (node[0].lineManager) nodeUser = user.lineManager
        else {
            const departmentUser = await UserModel.findOne({ HOD: { isHOD: true, department: node[0].department } }).select('_id');
            if (!departmentUser) throw "ERROR"
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
        // console.log("===============x===========",x);
        addingRequest(req, res, next, x)
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}


const addingRequest = (req, res, next, obj) => {
    const senderId = obj.senderId;
    console.log("========obj=======", obj);
    RequestModel.findOne({ "requests.requestDetails.senderId": senderId })
        .then((userFound) => {
            console.log("=========userFound=======", userFound);
            if (!userFound) {
                console.log("================if=================");
                req.body.requests = {
                    requestDetails: []
                }
                req.body.requests.requestDetails.push(obj)
                RequestModel.create(req.body)
                    .then()
                    .catch((error) => {
                        handleCatch(`${error}`, res, 401, next)
                    })
            }
            else {
                console.log("================else=================");
                userFound.requests.requestDetails.push(obj);
                userFound.save()
                    .catch((error) => { handleCatch(`${error}`, res, 401, next) })
            }
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

export const requestToNextNode = (req, res, next) => {
    try {
        if (!req.body.nodeId || !req.body.notificationId || !req.body.senderId || !req.body.flowRequestType || !req.body.requestId || !req.body.createdAt || !req.body.type) throw 'Invalid Body.'
        RequestFlowNodeModel.findById(req.body.nodeId)
            .then((previousNode) => {
                if (!previousNode) throw 'No such node'
                if (previousNode.nextNode !== null) {
                    RequestFlowNodeModel.findById(previousNode.nextNode)
                        .then((node) => {
                            console.log("============if==============", node._id);
                            if (!node) throw 'No such node available.'
                            UserModel.findById(req.body.senderId)
                                .then((user) => {
                                    if (!user) throw 'No such user'
                                    settingStatus(req, res, next)
                                    getNodeUser(node, user, req, res, next);
                                })
                                .catch((error) => {
                                    handleCatch(`${error}`, res, 401, next)
                                })
                        })
                        .catch((error) => {
                            handleCatch(`${error}`, res, 401, next)
                        })
                }
                else {
                    switch (req.body.type) {
                        case 'MissingPunches': {
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                        case 'MissingPunches': {
                            settingStatus(req, res, next, "approvedByAll")
                            break;
                        }
                    }
                    LeaveRequestModel.findById(req.body.requestId)
                        .then((leave) => {
                            if (leave) {
                                updateRequestStatus(req, res, next, leave)
                            }
                        })
                        .catch((error) => {
                            handleCatch(`${error}`, res, 401, next)
                        })
                    WFHModel.findById(req.body.requestId)
                        .then((wfh) => {
                            if (wfh) {
                                updateRequestStatus(req, res, next, wfh)
                            }
                        })
                        .catch((error) => {
                            handleCatch(`${error}`, res, 401, next)
                        })
                }
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const settingStatus = (req, res, next, requestStatus = null) => {
    const requestId = req.body.notificationId;
    const type = req.body.type
    RequestModel.findOne({ "requests.requestDetails._id": requestId })
        .then((request) => {
            request.requests.requestDetails.forEach(previousRequest => {
                if (previousRequest._id.toString() == req.body.notificationId) {
                    previousRequest.state = "approved"
                }
            })
            request.save()
                .then(() => {
                    switch (type) {
                        case 'MissingPunches': {
                            console.log("========missing punch case==========");
                            MissingPunchesModel.findById(req.body.requestId)
                                .then((missingPunches) => {
                                    console.log("==============missingPunches=======", missingPunches);
                                    if (!missingPunches) throw "Request for missing Punches is not found"
                                    requestStatus == "approvedByAll" ? missingPunches.status = "approved" : missingPunches.status = "processing"
                                    return missingPunches.save()
                                        .then((missingPunchesRequest) => {
                                            console.log("==============saved=================", missingPunchesRequest);
                                            if (requestStatus == "approvedByAll") {
                                                console.log("=============final request======", req);
                                                console.log("=========missing======", missingPunchesRequest);
                                                let request = {};
                                                request.body = {
                                                    user: missingPunchesRequest.user,
                                                    date: missingPunchesRequest.date.toISOString().slice(0, 10),
                                                    [missingPunchesRequest.punchType]: missingPunchesRequest.expectedTime
                                                }
                                                updateAttendance(request, res, next);
                                                console.log("============final body=====", request.body)
                                            }
                                            else {
                                                res.status(200).json({
                                                    success: true,
                                                    message: "Request Approved by Node"
                                                })
                                            }
                                        })
                                })
                                .catch(err => handleCatch(err, res, 401, next))
                            break;
                        }
                        case 'Loan': {
                            LoanModel.findById(req.body.requestId)
                                .then((loan) => {
                                    console.log("==============loan=======", loan);
                                    if (!loan) throw "Request for loan is not found"
                                    requestStatus == "approvedByAll" ? loan.status = "approved" : loan.status = "processing"
                                    return loan.save()
                                        .then((loan) => {
                                            if (requestStatus == "approvedByAll") {

                                            }
                                            else {
                                                res.status(200).json({
                                                    success: true,
                                                    message: "Request Approved by Node"
                                                })
                                            }
                                        })
                                })
                            break;
                        }
                    }
                })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const getNodeUser = async (node, user, req, res, next) => {
    try {
        let nodeUser = ''
        if (node.lineManager) nodeUser = user.lineManager
        else {
            const departmentUser = await UserModel.findOne({ HOD: { isHOD: true, department: node.department } });
            if (!departmentUser) throw "ERROR"
            nodeUser = departmentUser._id;
        }
        let x = {
            nodeId: node._id,
            senderId: req.body.senderId,
            receiverId: nodeUser,
            type: req.body.type,
            requestId: req.body.requestId,
            message: `${user.firstName + ' ' + user.lastName} has generated a request`,
            flowRequestType: req.body.flowRequestType,
            createdAt: req.body.createdAt
        }
        console.log("===========x22==========", x);
        addingRequest(req, res, next, x)
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const updateRequestStatus = (req, res, next, request) => {
    try {
        if (request.status == 'pending') {
            settingStatus(req, res, next)
            request.status = 'approved'
            request.save()
            res.status(200).json({
                success: true,
                Message: 'Request Approved Successfully.'
            })
        }
        else throw 'Cannot Update this Request'
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const rejectRequest = (req, res, next) => {
    console.log("===========1==================", req.body);
    const requestId = req.body.notificationId;
    const type = req.body.type
    RequestModel.findOne({ "requests.requestDetails._id": requestId })
        .then((request) => {
            console.log("====request collectioon==", request);
            request.requests.requestDetails.forEach(previousRequest => {
                if (previousRequest._id.toString() == req.body.notificationId) {
                    previousRequest.state = "rejected"
                }
            })
            request.save()
                .then(() => {
                    switch (type) {
                        case 'MissingPunches': {
                            console.log("========missing punch case==========");
                            MissingPunchesModel.findById(req.body.requestId)
                                .then((missingPunches) => {
                                    console.log("==============missingPunches=======", missingPunches);
                                    if (!missingPunches) throw "Request for missing Punches is not found"
                                    missingPunches.status = "rejected"
                                    return missingPunches.save()
                                        .then((saved) => {
                                            res.status(200).json({
                                                message: "Request for missing is rejected"
                                            })
                                        })
                                })
                                .catch(err => handleCatch(err, res, 401, next))
                            break;
                        }
                    }
                })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}