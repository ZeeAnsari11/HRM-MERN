import mongoose from "mongoose";

const RequestFlowNodeSchema = mongoose.Schema({
  lineManager: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  nextNode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RequestFlowNode',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RequestFlowSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name of Node Type"],
    trim: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, "Please Enter the Organization Id"]
  },
  requestType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RequestType',
    required: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RequestFlowNode',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export const RequestFlowNodeModel = mongoose.model('RequestFlowNode', RequestFlowNodeSchema, 'Request Flow Node Collection');
export const RequestFlowModel = mongoose.model('RequestFlow', RequestFlowSchema, 'Request Flow Collection');

