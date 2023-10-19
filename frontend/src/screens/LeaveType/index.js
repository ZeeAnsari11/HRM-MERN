import React, { useEffect, useState } from 'react';
import { createLeaveType, getLeaveTypeByOrgId } from '../../api/leaveType';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import LTForm from './LTForm';
import LeaveTypeView from './LeaveTypeView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { useSelector } from 'react-redux';

const LeaveType = () => {
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);
  
  const [toggleChange, setToggleChange] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    organization: orgId,
    accumulativeCount: '',
    shortLeave: false,
    attachmentRequired: false
  });
  
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    shortName: '',
    accumulativeCount: '',
  })
  
  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  const [loader, setLoader] = useState(true);
  const leaveLoader = () => {
    setLoader(false)
  }

  let LoadData = () => {
    getLeaveTypeByOrgId(orgId, setLeaveType, leaveLoader, role)
  }

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
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
    if (formData.shortName.trim() === "") {
        newValidationErrors.shortName = "Short Name is required.";
    }
    if (formData.accumulativeCount === "") {
      newValidationErrors.accumulativeCount = "Accumulative Count is required.";
  }
    if (Object.keys(newValidationErrors).length > 0) {
        // Set validation errors and prevent closing the modal
        setValidationErrors(newValidationErrors);
        trigger();
        return;
    }
    createLeaveType(formData, changeToggler, trigger, orgId, role);
    setFormData({
      name: '',
      shortName: '',
      organization: orgId,
      accumulativeCount: '',
      shortLeave: false,
      attachmentRequired: false
    });
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Short Name',
      accessor: 'shortName',
    },
    {
      Header: 'Accumulative Count',
      accessor: 'accumulativeCount',
    },
    {
      Header: 'Short Leave',
      accessor: 'shortLeave',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <LeaveTypeView data={row.original} />
      )
    },
  ];
  const data = leaveType.map(obj => ({
    id: obj._id,
    name: obj.name,
    shortName: obj.shortName,
    accumulativeCount: obj.accumulativeCount,
    shortLeave: obj.shortLeave ? "Yes" : "No",
    attachmentRequired : obj.attachmentRequired
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateLeaveType,
    }
  ]

  if(!loader)
  return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mt-6">
          <Table columns={columns} data={data} element={
              <Modal
                  action="Create Leave Type"
                  title="Create Leave Type"
                  btnStyle={commonStyles.btnDark}
                  Element={<LTForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
                  btnConfig={btnConfig}
                  validationErrors={validationErrors}
                  check={(closeModal) => {
                      if (!validationErrors?.name && !validationErrors?.shortName && !validationErrors?.accumulativeCount && formData?.name.trim() && formData?.shortName.trim() && formData?.accumulativeCount) {
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

export default LeaveType;
