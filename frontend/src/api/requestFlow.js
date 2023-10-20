import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";
import {setRequestFlows, setRequestTypes } from "../states/reducers/slices/backend/UserSlice";
import { requestFlow, requestType } from "./configuration";

export const getRequestTypes = (orgId, dispatcher, trigger = null) => {
    axios.get(requestType.all+orgId)
    .then((response) => {
        dispatcher(setRequestTypes(response.data.response))
    })
    .catch((err) => {
        toastMessage("error", err.response.data.Message, toast);
    }).finally(() =>{
      if(trigger !== null){
          trigger()
      }
  })
}



export const getRequestFlowsByOrgId = (orgId, dispatcher) => {
    axios
      .get(requestFlow.all + orgId)
      .then((response) => {
        // console.log("responseData==", response);
        dispatcher(setRequestFlows(response.data.response))
      })
      .catch((err) => {
        console.log(err);
      });
};

export const getRequestFlows = (orgId, dispatcher, trigger = null) => {
  axios.get(requestFlow.all+orgId)
  .then((response) => {
      dispatcher(setRequestFlows(response.data.response))
  })
  .catch((err) => {
      toastMessage("error", err.response.data.Message, toast);
  }).finally(() =>{
    if(trigger !== null){
        trigger()
    }
})
}

// export const saveRequestFlowData = ( formData) => {
//     axios.post(requestFlow.create, formData)
//     .then((response) => {
//         console.log("response", response);
//         toastMessage("success", "Request Flow Created Successfully", toast);
//     })
//     .catch((error) => {
//         console.log("error", error);
//         toastMessage("error", error.response.data.Message, toast);
//     })
// }


export const getRequesTypesByOrgId = (orgId, dispatcher) => {
    axios
      .get(requestFlow.all + orgId)
      .then((response) => {
        dispatcher(setRequestFlows(response.data.response))
      })
      .catch((err) => {
        console.log(err);
      });
};

export const createRequestType = (formData, changeToggler, trigger = null) => {
  axios
    .post(requestType.create, formData)
    .then(() => {
      toastMessage("success", "Request Type creation success.", toast);
      changeToggler();
    })
    .catch((err) => {
      toastMessage("error", "Request Type creation failed!", toast);
    })
    .finally(() => {
      if (trigger !== null) trigger();
    });
};


export const saveRequestFlowData = (formData, changeToggler, trigger = null) => {
  axios
    .post(requestFlow.create, formData)
    .then((res) => {
      console.log("res:",res);
      toastMessage("success", "Request Flow creation success.", toast);
      changeToggler();
    })
    .catch((err) => {
      toastMessage("error", "Request Flow creation failed!", toast);
    })
    .finally(() => {
      if (trigger !== null) trigger();
    });
};


export const updateRequestTypeById = (id, formData, trigger) => {
  axios
    .put(requestType.update + id, formData)
    .then((response) => {
      toastMessage("success", response.data.Message, toast);
      setTimeout(() => {
        window.location.href = "/dashboard/request-type";
      }, 2000);
    })
    .catch((error) => {
      toastMessage("error", error.response.data.Message, toast);
    })
    .finally(() => {
      trigger();
    });
};