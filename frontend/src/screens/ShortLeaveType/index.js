import React, { useEffect, useState } from 'react';
import { createLeaveType, getLeaveTypeByOrgId } from '../../api/leaveType';
import { createShortLeaveType, getShortLeaveTypeByOrgId } from '../../api/shortLeaveType';

import Modal from '../../components/Modal';
import SLTForm from './SLTForm';
import ShortLeaveTypeView from './ShortLeaveTypeView';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const ShortLeaveType = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [shortLeaveType, setShortLeaveType] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    organization: orgId,
    shiftReductionInPercentage: 0,
    balance: 0,
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    shiftReductionInPercentage: '',
    balance: '',
  })

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getShortLeaveTypeByOrgId(orgId, setShortLeaveType)
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

  const handleCreateLeaveType = (trigger) => {
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (Number(formData.shiftReductionInPercentage) < 20 || Number(formData.shiftReductionInPercentage) > 100 ) {
      newValidationErrors.shiftReductionInPercentage = "% is required b/w 20 and 100.";
    }
 console.log(Number(formData.balance), "momomo")
    if (Number(formData.balance) < 0.2 || Number(formData.balance) > 1  ) {
      newValidationErrors.balance = "Balance is required b/w 0 and 1";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
  }
    createShortLeaveType(formData, changeToggler, trigger);
    setFormData({
      name: '',
      shiftReductionInPercentage: '0',
      balance: '0',
    });
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Shift Reduction in %',
      accessor: 'shiftReductionInPercentage',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <ShortLeaveTypeView data={row.original} />
      )
    },
  ];
  const data = shortLeaveType.map(obj => ({
    id: obj._id,
    name: obj.name,
    shiftReductionInPercentage: obj.shiftReductionInPercentage,
    balance: obj.balance,
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateLeaveType,
    }
  ]

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mt-6">
        <Table columns={columns} data={data} element={
          <Modal
            action="Create Leave Type"
            title="Create Leave Type"
            btnStyle={commonStyles.btnDark}
            Element={<SLTForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
            btnConfig={btnConfig}
            validationErrors={validationErrors}
            check={(closeModal) => {
              if (!validationErrors.name && !validationErrors.shiftReductionInPercentage && !validationErrors.balance && formData.name && formData.balance>=0 && formData.balance<=1 && formData.shiftReductionInPercentage>=20 && formData.shiftReductionInPercentage<=100) {
                closeModal()
              }
            }}
          />
        } />

      </div>
    </main>
  );
};

export default ShortLeaveType;
