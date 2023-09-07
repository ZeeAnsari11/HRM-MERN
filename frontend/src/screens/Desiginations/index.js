import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CDForm from "./CDForm";
import DesiginationsView from "./DesiginationsView";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import axios from "axios";
import { commonStyles } from "../../styles/common";
import { createDesigination } from "../../api/designation";
import { organizationRoutes } from "../../api/configuration";
import { selectCurrentUserOrg } from "../../states/reducers/slices/backend/UserSlice";
import { setOrganizationDesignation } from "../../states/reducers/slices/backend/Designation";
import { useMemo } from "react";
import ComponentLoader from "../../components/Loader/ComponentLoader";
// import NotFound from "../../components/Table/shared/NotFound";

const Desiginations = () => {
  let orgId;
  let dispatcher = useDispatch();
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [desiginations, setDesiginations] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    organization: orgId,
    shortForm: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    shortForm: "",
  });
  // Initial component loader
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    LoadData(dispatcher);
  }, [toggleChange]);

  let LoadData = (dispatcher) => {
    axios
      .get(organizationRoutes.getDesignationsByOrgId + orgId)
      .then((rsp) => {
        dispatcher(setOrganizationDesignation(rsp.data.response));
        setDesiginations(rsp.data.response);
        console.log(rsp.data.response)

        // Disable loader to decide btw not found & data
        
      })
      .catch((e) => console.log(e))
      .finally(() =>{
        setLoader(false);
    })
  };

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const handleCreateDesigination = (trigger) => {
    // Validate form data
    const newValidationErrors = {};
    if (formData.title.trim() === "") {
      newValidationErrors.title = "Title is required.";
    }
    if (formData.shortForm.trim() === "") {
      newValidationErrors.shortForm = "Short Name is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createDesigination(formData, changeToggler, trigger);

    setFormData({
      title: "",
      organization: orgId,
      shortForm: "",
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Short Form",
        accessor: "shortForm",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => <DesiginationsView data={row.original} />,
      },
    ],
    []
  );

  const data = desiginations.map((obj) => ({
    id: obj._id,
    title: obj.title,
    shortForm: obj.shortForm.toUpperCase(),
  }));

  const btnConfig = [
    {
      title: "Create",
      handler: handleCreateDesigination,
    },
  ];

  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table
            columns={columns}
            data={data}
            element={
              <Modal
                action="Create Designation"
                title="Create Designation"
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
                    !validationErrors?.title &&
                    !validationErrors?.shortForm &&
                    formData?.title.trim() &&
                    formData?.shortForm.trim()
                  ) {
                    closeModal();
                  }
                }}
              />
            }
          />
        </div>
      </main>
    );
  // Loader Component
  else return <ComponentLoader color="black" />;
};

export default Desiginations;