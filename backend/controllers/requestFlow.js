import { DepartmentModel } from "../models/departmentSchema.js";
import { RequestFlowModel, RequestFlowNodeModel } from "../models/requestFlowSchema.js";
import { RequestTypeModel } from "../models/requestTypeSchema.js";
import { getAll, getById, handleCatch } from "../utils/common.js";

export const createRequestFlow = (req, res, next) => {
    const { name, requestType } = req.body;
    RequestFlowModel.exists({ name: name, requestType: requestType })
        .then((flowExists) => {
            if (flowExists) {
                throw new Error("Request Flow Name already exists for this Request Type")
            }
            RequestTypeModel.findById(requestType)
                .then((request) => {
                    if (!request) {
                        throw new Error("Request type not found")
                    }
                    else {
                        const newRequestFlow = new RequestFlowModel({
                            name,
                            requestType
                        });
                        newRequestFlow
                            .save()
                            .then((requestFlow) => {
                                res.status(201).json({
                                    success: true,
                                    message: "Request Flow created successfully",
                                    requestFlow
                                });
                            })
                            .catch((error) => {
                                handleCatch(error, res, 500, next)
                            })
                    }
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        })
        .catch((error) => {
            handleCatch(error, res, 409, next)
        })
};

export const getRequestFlowById = (req, res, next) => {
    getById(req.params.id, res, next, RequestFlowModel, "Request Flow");
}

export const updateRequestFlow = (req, res, next) => {
    try {
        if (req.body.requestType) throw new Error("You Can't Update the Request Type")
        RequestFlowModel.findById(req.params.id)
            .then((requestFlow) => {
                if (!requestFlow) {
                    const notFoundError = new Error("Request flow not found");
                    notFoundError.statusCode = 404;
                    throw notFoundError;
                }
                if (req.body.name) {
                    requestFlow.name = req.body.name;
                }
                if (req.body.head) {
                    requestFlow.head = req.body.head;
                }
                return requestFlow.save();
            })
            .then((updatedRequestFlow) => {
                res.status(200).json({
                    success: true,
                    updatedRequestFlow
                });
            })
            .catch((err) => {
                handleCatch(err, res, err.statusCode || 500, next);
            })
    }
    catch (error) {
        handleCatch(error, res, 403, next)
    }
}

export const getAllRequestFlow = (req, res, next) => {
    getAll(res, next, RequestFlowModel, { requestType: req.params.id }, "RequestFlow")
}

export const getAllRequestFlowOfOrganization = (req, res, next) => {
    console.log("req.params.id", req.params.id);
    getAll(res, next, RequestFlowModel, { organization: req.params.id }, "RequestFlow")
}


export const createRequestFlowNode = async (req, res, next) => {
    try {
        const requestFlow = await RequestFlowModel.findById(req.params.id).populate('head').populate('requestType')
        if (!requestFlow) {
            const notFoundError = new Error("Request flow not found");
            notFoundError.statusCode = 404;
            throw notFoundError;
        }
        let filter = {}
        if (req.body.lineManager && req.body.department) {
            const badRequest = new Error("Provide Line Manager or Department Only")
            badRequest.statusCode = 400;
            throw badRequest
        }
        if (req.body.lineManager) {
            filter = { lineManager: req.body.lineManager }
        } else if (req.body.department) {
            const department = await DepartmentModel.findById(req.body.department)
            if (!department) {
                const notFoundError = new Error("Department not found");
                notFoundError.statusCode = 404;
                throw notFoundError
            }
            if (requestFlow.requestType.organization.toString() != department.organization.toString()) {
                const unAuthorize = new Error("You are not authorized to perform this action")
                unAuthorize.statusCode = 403;
                throw unAuthorize
            }
            filter = { department: req.body.department }
        } else {
            const badRequest = new Error("Either lineManager or department is required")
            badRequest.statusCode = 400;
            throw badRequest
        }
        const temp = requestFlow.requestType
        const existingNode = await RequestFlowNodeModel.findOne({
            ...filter,
            temp
        })
        if (existingNode) {
            const alreadyExist = new Error("Node already exists in the Request Flow")
            alreadyExist.statusCode = 409;
            throw alreadyExist
        }

        const node = await RequestFlowNodeModel.create({
            ...req.body,
            requestFlow: requestFlow._id
        })

        if (!requestFlow.head) {
            requestFlow.head = node._id
            await requestFlow.save()
            res.status(200).json({
                message: 'Request flow created successfully',
                response: requestFlow,
            })
        } else {
            let current = await RequestFlowNodeModel.findById(requestFlow.head)
            while (current.nextNode) {
                const nextCurrent = await RequestFlowNodeModel.findById(current.nextNode)
                if (nextCurrent) {
                    current = nextCurrent
                }
            }
            current.nextNode = node._id
            await current.save()
            res.status(200).json({
                message: 'Request flow node created successfully',
                response: node,
            })
        }
    } catch (error) {
        handleCatch(error, res, error.statusCode || 500, next);
    }
}


export const getRequestFlowNodeById = (req, res, next) => {
    getById(req.params.id, res, next, RequestFlowNodeModel, "Request Flow Node");
};


export const deleteRequestFlowNode = async (req, res, next) => {
    const { id, nodeId } = req.params;

    try {
        const requestFlow = await RequestFlowModel.findById(id);

        if (!requestFlow) {
            throw new Error("Request flow not found")
        }

        if (!requestFlow.head) {
            throw new Error("Linked list is empty")
        }

        if (requestFlow.head.toString() === nodeId.toString()) {
            // If the node to be deleted is the head, set the head to the next node
            const nodeToDelete = await RequestFlowNodeModel.findById(nodeId);
            if (!nodeToDelete) {
                throw new Error("Request flow node not found")
            }

            requestFlow.head = nodeToDelete.nextNode;
            await RequestFlowNodeModel.deleteOne(nodeToDelete._id)
            await requestFlow.save();

            return res.status(200).json({
                success: true,
                message: "Request flow node deleted successfully",
            });
        } else {
            // Traverse the linked list to find the node to be deleted
            let prevNode = await RequestFlowNodeModel.findById(requestFlow.head);
            let currentNode = await RequestFlowNodeModel.findById(prevNode.nextNode);

            while (currentNode) {
                if (currentNode._id.toString() === nodeId) {
                    let deleteId = currentNode._id
                    console.log(currentNode.nextNode);
                    console.log(prevNode.nextNode);
                    prevNode.nextNode = currentNode.nextNode;
                    console.log(prevNode.nextNode);
                    await prevNode.save();
                    await RequestFlowNodeModel.deleteOne(deleteId)

                    return res.status(200).json({
                        success: true,
                        message: "Request flow node deleted successfully",
                    });
                }

                prevNode = currentNode;
                currentNode = await RequestFlowNodeModel.findById(currentNode.nextNode);
            }

            throw new Error("Request flow node not found")
        }
    } catch (error) {
        handleCatch(error, res, 404, next);
    }
};


const getNextNode = (node, callback) => {
    if (!node) {
        callback(null);
        return;
    }
    RequestFlowNodeModel.findById(node._id)
        .then(populatedNode => {
            if (!populatedNode) {
                callback(null);
                return;
            }
            getNextNode(populatedNode.nextNode, nextNode => {
                populatedNode.nextNode = nextNode;
                callback(populatedNode);
            });

        })
        .catch(error => {
            callback(null);
        });
};

export const getAllRequestFlowNodes = (req, res, next) => {

    RequestFlowModel.findById(req.params.id)
        .populate('head')
        .then(requestFlow => {
            if (!requestFlow) {
                throw new Error('Request Flow not found')
            }
            const head = requestFlow.head;
            console.log(head);
            getNextNode(head, (finalNode) => {
                const nodes = [];
                let currentNode = finalNode;
                nodes.unshift(currentNode);
                res.status(200).json({
                    success: true,
                    nodes
                });
            });
        })
        .catch(error => {
            handleCatch(error, res, 404, next)
        });
};

