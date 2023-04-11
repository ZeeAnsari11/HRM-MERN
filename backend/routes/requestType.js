import express from "express";
import { 
  createRequestType, 
  deleteRequestType, 
  getAllRequestTypes, 
  getRequestTypeById, 
  updateRequestType 
} from "../controllers/requestType.js";


export const requestTypeRoute = express.Router();

requestTypeRoute.get("/request-type/all/:id", getAllRequestTypes);
requestTypeRoute.get("/request-type/:id", getRequestTypeById);
requestTypeRoute.post("/request-type/create", createRequestType);
requestTypeRoute.put("/request-type/update/:id", updateRequestType);
requestTypeRoute.delete("/request-type/delete/:id", deleteRequestType);


