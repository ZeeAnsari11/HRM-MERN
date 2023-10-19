import React, { useEffect, useState } from 'react';
import { createEmployeementType, getEmployementTypesByOrgId } from '../../api/employeementType';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import EmployeementTypeForm from './EmployeementTypeForm';
import EmployeementTypeView from './EmployeementTypeView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { useSelector } from 'react-redux';

const EmployeementType = () => {
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);

  const [toggleChange, setToggleChange] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [formData, setFormData] = useState({
    employmentType: '',
    organization: orgId,
  });
  const [validationErrors, setValidationErrors] = useState({
    employmentType: ''
  });
  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  const [loader, setLoader] = useState(true);

  const employementLoader = () => {
    setLoader(false)
  }
  let LoadData = () => {
    getEmployementTypesByOrgId(orgId, setEmploymentTypes, employementLoader, role)
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

  const handleCreateEmployeementType = (trigger) => {
    const newValidationErrors = {};
    if (formData.employmentType.trim() === "") {
      newValidationErrors.employmentType = "Employment Type is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {

      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createEmployeementType(formData, changeToggler, trigger, orgId, role);
    setFormData({
      employmentType: '',
      organization: orgId,
    });
  };

  const columns = [
    {
      Header: 'Employment Type',
      accessor: 'employmentType',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <EmployeementTypeView data={row.original} />
      ),
    },
  ];

  const data = employmentTypes.map(obj => ({
    id: obj?._id,
    employmentType: obj?.employmentType,
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateEmployeementType,
    }
  ]
  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} element={
            <Modal
              action="Create Employment Type"
              title="Create Employment Type"
              btnStyle={commonStyles.btnDark}
              Element={<EmployeementTypeForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
              btnConfig={btnConfig}
              validationErrors={validationErrors}
              check={(closeModal) => {
                if (!validationErrors?.employmentType && formData?.employmentType.trim()) {
                  closeModal()
                }
              }}
            />
          } />

        </div>
      </main>
    );
  else return <ComponentLoader color="black" />;
};

export default EmployeementType;
