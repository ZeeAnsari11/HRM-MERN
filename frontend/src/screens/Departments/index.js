import React, { useEffect, useState } from "react";
import { createDepartment, getDepartmentsByOrgId } from "../../api/departments";
import { selectCurrentUserOrg, selectCurrentUserRole } from "../../states/reducers/slices/backend/UserSlice";

import CDForm from "./CDForm";
import ComponentLoader from "../../components/Loader/ComponentLoader";
import DepartmentsView from "./DepartmentsView";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { commonStyles } from "../../styles/common";
import { getBranchesByOrgId } from "../../api/branches";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const Departments = () => {
  let orgId, role;
  orgId = useSelector(selectCurrentUserOrg);
  role = useSelector(selectCurrentUserRole);
  
  const [toggleChange, setToggleChange] = useState(false);
  const [departments, setDepartment] = useState([]);
  const [branches, setBranches] = useState([]);

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
  },[]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

  const [loader, setLoader] = useState(true);
  const departmentLoader = () => {
    setLoader(false);
  };
  let LoadData = () => {
    getDepartmentsByOrgId(orgId, setDepartment, role);
    getBranchesByOrgId(orgId, setBranches, departmentLoader,role);
  };

  // const handleInputChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  const handleCreateDepartment = (trigger) => {
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (formData.branch.trim() === "") {
      newValidationErrors.branch = "Branch Name is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createDepartment(formData, changeToggler, trigger, orgId, role);
    setFormData({ name: "", organization: orgId, branch: "" });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => <DepartmentsView data={row.original} />,
      },
    ],
    []
  );

  const data = departments.map((obj) => ({
    id: obj._id,
    name: obj.name,
    branch: obj.branch?.name,
  }));

  const btnConfig = [
    {
      title: "Create",
      handler: handleCreateDepartment,
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
              action="Create Department"
              title="Create Department"
              btnStyle={commonStyles.btnDark}
              Element={
                <CDForm
                  branches={branches}
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

export default Departments;
