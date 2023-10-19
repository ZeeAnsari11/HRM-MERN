import React, { useEffect, useState } from 'react';
import { createLoanType, getLoanTypesByOrgId } from '../../api/LoanType';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import EditAndViewLoan from './EditAndViewLoan';
import OpenLoanModal from './OpenLoanModal';
import Table from '../../components/Table';
import { getAllLoansByOrgId } from '../../api/loan'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const LoanRequestList = () => {

  let dispatcher = useDispatch();
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);

  const [toggleChange, setToggleChange] = useState(false);
  const [loanTypes, setLoanTypes] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    loan_amount: '',
    required_Date: '',
    applied_Date: '',
    loan_type: '',
    status: ''

  });
  const [validationErrors, setValidationErrors] = useState({
    userName: '',
    loan_amount: '',
    required_Date: '',
    applied_Date: '',
    loan_type: '',
    status: ''
  });

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    LoadData();
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

  const loanLoader = () => {
    setLoader(false)
  }


  let LoadData = () => {
    getAllLoansByOrgId(orgId, loanLoader, role, setLoanTypes)
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


  const handleUpdateLoanType = (trigger) => {
    const newValidationErrors = {};
    if (formData.type.trim() === "") {
      newValidationErrors.type = "Type is required.";
    }
    if (formData.designations === "" || formData.designations == undefined || formData.designations.length <= 0) {
      newValidationErrors.designations = "Select at least one designation";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }

    createLoanType(formData, changeToggler, trigger, orgId, role);
    setFormData({
      type: '',
      designations: '',
      organization: orgId,
    });
  };

  const columns = [
    {
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Loan Amount',
      accessor: 'loan_amount',
    },
    {
      Header: 'Loan Type',
      accessor: 'loan_type',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Required At',
      accessor: 'required_Date',
    },
    {
      Header: 'Applied At',
      accessor: 'applied_Date',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <OpenLoanModal data={row.original} />
      ),
    },
  ];
  console.log("====loanTypes=", loanTypes);
  const data = loanTypes?.map((obj) => ({
    userName: obj?.user?.firstName + " " + obj?.user?.lastName,
    loan_amount: obj?.loan_amount,
    required_Date: obj?.required_Date.slice(0,10),
    applied_Date: obj?.createdAt.slice(0,10),
    loan_type: obj?.loan_type?.type,
    status: obj?.status,
    reason : obj?.reason,
    repaymentSchedules : obj?.repaymentSchedules
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleUpdateLoanType,
    },
  ];
  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    );
  else return <ComponentLoader color="black" />
};

export default LoanRequestList;
