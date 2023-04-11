import { DepartmentModel } from "../models/departmentSchema.js";
import { RequestFlowModel, RequestFlowNodeModel } from "../models/requestFlowSchema.js";
import { RequestTypeModel } from "../models/requestTypeSchema.js";
import { getAll, getById, handleCatch } from "../utils/common.js";

export const createRequestFlow = (req, res, next) => {
    const { name, requestType } = req.body;
    RequestFlowModel.exists({ name: name, requestType: requestType })
        .then((flowExists) => {
            if (flowExists) {
                throw "Request Flow Name already exists for this Request Type"
            }
            RequestTypeModel.findById(requestType)
                .then((request) => {
                    if (!request) {
                        throw "Request type not found"
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
                                console.log(error);
                                handleCatch(error, res, 404, next)
                            })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    handleCatch(error, res, 404, next)
                })
        })
        .catch((error) => {
            console.log(error);
            handleCatch(error, res, 404, next)
        })
};

export const getRequestFlowById = (req, res, next) => {
    getById(req.params.id, res, next, RequestFlowModel, "Request Flow");
}

export const updateRequestFlow = (req, res, next) => {
    try {
        if (req.body.requestType) throw "You Can't Update the Request Type"
        RequestFlowModel.findById(req.params.id)
            .then((requestFlow) => {
                if (!requestFlow) {
                    throw "Request flow not found"
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
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }
}

export const getAllRequestFlow = (req, res, next) => {
    getAll(res, next, RequestFlowModel, { requestType: req.params.id }, "RequestFlow")
}


export const createRequestFlowNode = async (req, res, next) => {
    try {
        const requestFlow = await RequestFlowModel.findById(req.params.id).populate('head').populate('requestType')
        if (!requestFlow) {
            throw 'Request flow not found'
        }

        let filter = {}
        if (req.body.lineManager && req.body.department) throw "Provide Line Manager or Department Only"
        if (req.body.lineManager ) {
            filter = { lineManager: req.body.lineManager }
        } else if (req.body.department) {
            const department = await DepartmentModel.findById(req.body.department)
            if (requestFlow.requestType.organization.toString() != department.organization.toString()) {
                throw 'You are not authorized to perform this action'
            }
            filter = { department: req.body.department }
        } else {
            throw 'Either lineManager or department is required'
        }

        const existingNode = await RequestFlowNodeModel.findOne({
            ...filter
        })
        if (existingNode) {
            throw 'Node already exists in the Request Flow'
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
        console.log(error);
        handleCatch(error, res, 404, next)
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
            throw "Request flow not found"
        }

        if (!requestFlow.head) {
            throw "Linked list is empty"
        }

        if (requestFlow.head.toString() === nodeId.toString()) {
            // If the node to be deleted is the head, set the head to the next node
            const nodeToDelete = await RequestFlowNodeModel.findById(nodeId);
            if (!nodeToDelete) {
                throw "Request flow node not found"
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

            throw "Request flow node not found"
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
                throw 'Request Flow not found'
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
            handleCatch(error, res, 400, next)
        });
};

