import { RequestModel } from "../models/requestSchema.js";
import { handleCatch } from './common.js'
import { RequestFlowModel } from "../models/requestFlowSchema.js";
import { RequestFlowNodeModel } from "../models/requestFlowSchema.js";
import { UserModel } from "../models/userSchema.js";
import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
import { WFHModel } from "../models/wfhSchema.js";

export const creatingRequest = (req, res, next, user, request, requestFlow, requestType) => {
    RequestFlowModel.findById(requestFlow)
        .then((requestFlow) => {
            if (!requestFlow) throw 'No such request flow'
            RequestFlowNodeModel.find(requestFlow.head)
                .then((node) => {
                    if (node.length == 0) throw 'No such node'
                    getfirstNodeUser(req, res, next, node, user, request, requestType);
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const getfirstNodeUser = async (req, res, next, node, user, request, requestType) => {
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
            requestId: request._id,
            message: `${user.firstName + ' ' + user.lastName} has requested leave request`,
            flowRequestType: requestType,
            createdAt: request.createdAt
        }
        addingRequest(req, res, next, x)
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}


const addingRequest = (req, res, next, obj) => {
    const senderId = obj.senderId;
    RequestModel.findOne({ "requests.requestDetails.senderId": senderId })
        .then((userFound) => {
            if (!userFound) {
                req.body.requests = {
                    requestDetails: []
                }
                req.body.requests.requestDetails.push(obj)
                RequestModel.create(req.body)
                    .then((response) => {
                        res.status(200).json({
                            success: true,
                            response
                        })
                    })
                    .catch((error) => {
                        handleCatch(`${error}`, res, 401, next)
                    })
            }
            else {
                userFound.requests.requestDetails.push(obj);
                userFound.save()
                    .then((response) => {
                        res.status(200).json({
                            success: true,
                            response
                        })
                    })
            }
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

export const requestToNextNode = (req, res, next) => {
    try {
        if (!req.body.nodeId || !req.body.notificationId || !req.body.senderId || !req.body.flowRequestType || !req.body.requestId || !req.body.createdAt) throw 'Invalid Body.'
        RequestFlowNodeModel.findById(req.body.nodeId)
            .then((previousNode) => {
                if (!previousNode) throw 'No such node'
                if (previousNode.nextNode !== null) {
                    RequestFlowNodeModel.findById(previousNode.nextNode)
                        .then((node) => {
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
                    LeaveRequestModel.findById(req.body.requestId)
                        .then((leave) => {
                            if (leave) {
                                updateRequestStatus(req, res, next, leave, LeaveRequestModel)
                            }
                        })
                        .catch((error) => {
                            handleCatch(`${error}`, res, 401, next)
                        })
                    WFHModel.findById(req.body.requestId)
                        .then((wfh) => {
                            if (wfh) {
                                updateRequestStatus(req, res, next, wfh, WFHModel)
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

const settingStatus = (req, res, next) => {
    const requestId = req.body.notificationId;
    RequestModel.findOne({ "requests.requestDetails._id": requestId })
        .then((request) => {
            request.requests.requestDetails.forEach(previousRequest => {
                if (previousRequest._id.toString() == req.body.notificationId) {
                    previousRequest.state = true
                }
            })
            request.save()
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
            requestId: req.body.requestId,
            message: `${user.firstName + ' ' + user.lastName} has generated a request`,
            flowRequestType: req.body.flowRequestType,
            createdAt: req.body.createdAt
        }
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
        else throw 'Cannot Update this leave'
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}