import express from "express";
import { 
    createRequestFlow, 
    createRequestFlowNode, 
    deleteRequestFlowNode, 
    getAllRequestFlow, 
    getAllRequestFlowNodes, 
    getAllRequestFlowOfOrganization, 
    getRequestFlowById, 
    getRequestFlowNodeById, 
    updateRequestFlow 
} from "../controllers/requestFlow.js";

export const requestFlowRoute = express.Router();

requestFlowRoute.post('/request-flow/create', createRequestFlow);
requestFlowRoute.get('/request-flow/get/:id', getRequestFlowById);
requestFlowRoute.put('/request-flow/update/:id', updateRequestFlow);
requestFlowRoute.delete('/request-flow/delete/:id', deleteRequestFlowNode);
requestFlowRoute.get('/request-flow/all-org/:id', getAllRequestFlowOfOrganization);
requestFlowRoute.get('/request-flow/all/:id', getAllRequestFlow);
requestFlowRoute.post('/request-flow/create-node/:id', createRequestFlowNode);
requestFlowRoute.get('/request-flow/node/:id', getRequestFlowNodeById);
requestFlowRoute.delete('/request-flow/:id/nodes/:nodeId', deleteRequestFlowNode);
requestFlowRoute.get('/request-flow/all/nodes/:id', getAllRequestFlowNodes);


