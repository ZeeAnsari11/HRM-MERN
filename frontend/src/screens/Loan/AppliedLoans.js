import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg, selectCurrentUserRole, selectUID } from '../../states/reducers/slices/backend/UserSlice';

import AllowanceForm from '../Allowances/AllowanceForm';
import AllowanceView from '../Allowances/AllowanceView';
import ComponentLoader from '../../components/Loader/ComponentLoader';
import EditAndViewLoan from './EditAndViewLoan';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { getLoansByUserId } from '../../api/loan';
import { useSelector } from 'react-redux';

const AppliedLoans = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const userId = useSelector(selectUID);

  let role = useSelector(selectCurrentUserRole);

  const [toggleChange, setToggleChange] = useState(false);
  const [loans, setAllLoans] = useState([]);
  const [formData, setFormData] = useState({
    loan_amount: '',
    reason: '',
    organization: orgId,
    status: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    loan_amount: '',
    reason: '',
    date: ''
  })

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  const [loader, setLoader] = useState(true)
  const allowanceLoader = () => {
    setLoader(false)
  }

  let LoadData = () => {
    getLoansByUserId(orgId, setAllLoans, allowanceLoader, role, userId)
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
  const columns = [
    {
      Header: "Amount",
      accessor: "loan_amount",
    },
    {
      Header: "Reason",
      accessor: "reason",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Required Date",
      accessor: "date",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <EditAndViewLoan data={row.original} />
      ),
    },
  ];
  const data = loans.map(obj => ({
    id: obj._id,
    loan_amount: obj.loan_amount,
    reason: obj.reason,
    date: obj.required_Date.substr(0,10),
    status: obj.status,
    loan_type : obj.loan_type
  }));
  const btnConfig = [
    {
      title: '',
      handler: '',
    }
  ]
  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 pt-4">
        <Table columns={columns} data={data} />
      </main>
    );
  else return <ComponentLoader color="black" />;
};

export default AppliedLoans;