import React, { useEffect, useState } from "react";
import { createDepartment } from "../../api/departments";

import CDForm from "./CDForm";
import ComponentLoader from "../../components/Loader/ComponentLoader";
import DepartmentsView from "./RequestTypeView";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { commonStyles } from "../../styles/common";
import { selectCurrentUserOrg, selectRequestTypes } from "../../states/reducers/slices/backend/UserSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequestType, getRequestTypes } from "../../api/requestFlow";

const RequestType = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    organization: orgId,
    branch: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    branch: "",
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
  let LoadData = () => {
    getRequestTypes(orgId, dispatcher, RequestTypeLoader);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  const handleCreateRequestType = (trigger) => {
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createRequestType(formData, changeToggler, trigger);
    setFormData({ name: "", organization: orgId, branch: "" });
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
        Cell: ({ row }) => <DepartmentsView data={row.original} />,
      },
    ],
    []
  );

  const apiData = useSelector(selectRequestTypes)

  const data = apiData.map((obj) => ({
    id: obj._id,
    name: obj.name,
    createdAt: obj.createdAt.substr(0, 10)
  }));

  const btnConfig = [
    {
      title: "Create",
      handler: handleCreateRequestType,
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
              action="Create Request Type"
              title="Create Request Type"
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
                  !validationErrors?.branch &&
                  formData?.name.trim() &&
                  formData?.branch.trim()
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

export default RequestType;
