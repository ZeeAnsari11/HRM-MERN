import React, { useEffect, useState } from "react";

import CDForm from "./CDForm";
import ComponentLoader from "../../components/Loader/ComponentLoader";
import RequestFlowView from "./RequestFlowView";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { commonStyles } from "../../styles/common";
import { selectCurrentUserOrg, selectRequestFlows } from "../../states/reducers/slices/backend/UserSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getRequestFlows, saveRequestFlowData } from "../../api/requestFlow";

const RequestFlows = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    organization: orgId
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
  });

  useEffect(() => {
    LoadData();
  });

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

 
  const dispatcher = useDispatch()
  const [loader, setLoader] = useState(true);
  const RequestTypeLoader = () => {
    setLoader(false);
  };

  console.log("OrgId:", orgId);
  let LoadData = () => {
    getRequestFlows(orgId, dispatcher, RequestTypeLoader);
  };

  // const handleSubmit = () => {
  //   form.validateFields().then(() => {
  //     const requestFlowData = {
  //       requestType: selectedRequestType,
  //       name: requestFlowName.trim(),
  //     };
  //     saveRequestFlowData(requestFlowData);
  //   });
  // };

  const handleInputChange = (e, fieldType) => {
    if (fieldType === 'requestType') {
      setFormData({
        ...formData,
        requestType: e,
      });
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
        organization: orgId,
      });
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      });
    }
  };
  
  const handleCreateRequestFlow = (trigger) => {
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    console.log("formData", formData);

    saveRequestFlowData(formData, changeToggler, trigger);
    setFormData({ name: "", organization: orgId });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => <RequestFlowView data={row.original} />,
      },
    ],
    []
  );

  const apiData = useSelector(selectRequestFlows)
    console.log("Request Flows: ", apiData);

  const data = apiData.map((obj) => ({
    id: obj._id,
    name: obj.name,
    createdAt: obj.createdAt.substr(0, 10)
  }));

  const btnConfig = [
    {
      title: "Create",
      handler: handleCreateRequestFlow,
    },
  ];
  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Table
          columns={columns}
          data={data}
          element={
            <Modal
              action="Create Request Flow"
              title="Create Request Flow"
              btnStyle={commonStyles.btnDark}
              Element={
                <CDForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              }
              btnConfig={btnConfig}
              validationErrors={validationErrors}
              check={(closeModal) => {
                if (
                  !validationErrors?.name &&
                  formData?.name.trim()
                ) {
                  closeModal();
                }
              }}
            />
          }
        />
      </main>
    );
  else return <ComponentLoader color="black" />;
};

export default RequestFlows;
