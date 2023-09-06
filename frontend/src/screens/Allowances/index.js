import React, { useEffect, useState } from 'react';
import { createAllowance, getAllowancesByOrgId } from '../../api/allowances';

import AllowanceForm from './AllowanceForm';
import AllowanceView from './AllowanceView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import ComponentLoader from '../../components/Loader/ComponentLoader';

const Allowances = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [allowances, setAllowances] = useState([]);
  const [formData, setFormData] = useState({
    allowanceName: '',
    percrentageOfBaseSalary: '',
    organization: orgId,
  });
  const [validationErrors, setValidationErrors] = useState({
    allowanceName: '',
    percrentageOfBaseSalary: ''
  })

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }
  
  const [loader, setLoader] = useState(true)
  const allowanceLoader = () =>{
    setLoader(false)
  }

  let LoadData = () => {
    getAllowancesByOrgId(orgId, setAllowances, allowanceLoader)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const handleCreateAssetType = (trigger) => {
    const newValidationErrors = {};
    if (formData.allowanceName.trim() === "") {
      newValidationErrors.allowanceName = "Allowance Name is required.";
    }
    if (formData.percrentageOfBaseSalary.trim() === "") {
      newValidationErrors.percrentageOfBaseSalary = "% of Base Salary is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    
    createAllowance(formData, changeToggler, trigger);
    setFormData({
      allowanceName: '',
      percrentageOfBaseSalary: '',
      organization: orgId,
    });
  };

  const columns = [
    {
      Header: "Name",
      accessor: "allowanceName",
    },
    {
      Header: "Percrentage Of Base Salary (%)",
      accessor: "percrentageOfBaseSalary",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <AllowanceView data={row.original} />
    ),
    },
  ];
  const data = allowances.map(obj => ({
    id: obj._id,
    allowanceName : obj.allowanceName,
    percrentageOfBaseSalary : obj.percrentageOfBaseSalary
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateAssetType,
    }
  ]

  if(!loader)
  return (

        <main className="mx-auto px-4 sm:px-6 pt-4">
        <Table columns={columns} data={data}
          element={
            <Modal
              action="Create Allowance"
              title="Create Allowance"
              btnStyle={commonStyles.btnDark}
              Element={<AllowanceForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors}/>}
              btnConfig={btnConfig}
              validationErrors={validationErrors}
          check={(closeModal) => {
            if (!validationErrors?.allowanceName && !validationErrors?.percrentageOfBaseSalary  && formData?.allowanceName.trim() && formData?.percrentageOfBaseSalary ) {
              closeModal()
            }
          }}
            />
          } />
      </main>
  );
  else return <ComponentLoader color="black" />;
};

export default Allowances;