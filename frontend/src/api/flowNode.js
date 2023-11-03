// /request-flow/all-org/:id

import { requestFlow, requestFlowNode } from "./configuration";

import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const getAllRequestFlowOfOrg = (orgId, role) => {
  const headers = setHeaders(orgId, role, 'getAllRequestFlowOfOrganization')
  return axios
    .get(requestFlow.all + orgId, { headers })
    .then((response) => {
      return (response.data.response)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addNode = (formData, requestFlow, orgId, role, changeToggler) => {
  const headers = setHeaders(orgId, role, 'createRequestFlowNode')
  axios.post(requestFlowNode.create + requestFlow, formData, { headers })
    .then(() => {
      toastMessage("success", "Node created successfully,", toast);
      changeToggler();
    })
    .catch((err) => {
      toastMessage("error", err.response.data.Message, toast);
    })
}

export const getAllNodesByFlowId = (flowId, orgId, role) => {
  const headers = setHeaders(orgId, role, 'getAllRequestFlowNodes')
  return axios
    .get(requestFlowNode.all + flowId, { headers })
    .then((response) => {

      return (response.data.nodes)
    })
    .catch((err) => {
      console.log(err);
    });
}
export const deleteNodeFromFlow = (flowId, nodeId, changeToggler) => {
  // console.log("================requestFlowNode.deleteNode(flowId, nodeId)==",requestFlowNode.deleteNode(flowId, nodeId));
  axios.delete(requestFlowNode.deleteNode(flowId, nodeId))
    .then((response) => {
      toastMessage('success', response.data.Message, toast)
      changeToggler()
    })
    .catch((err) => {
      toastMessage('error', err.response.data.Message, toast)
    })
}