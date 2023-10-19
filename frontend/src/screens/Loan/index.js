import Table, { StatusPill } from '../../components/Table';
import { selectCreatingLoan, selectUserLoan } from '../../states/reducers/slices/backend/Loan'
import { selectCurrentUserOrg, selectCurrentUserRole, selectUID } from '../../states/reducers/slices/backend/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

import CreateLoanRequest from './CreateLoan'
import React from 'react'
import { getUserLoanById } from '../../api/loan'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'

// new

function Loan() {

  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);
  
  const columns = useMemo(() => [
    {
      Header: "Loan Type",
      accessor: 'loan_type',
    },
    {
      Header: "Loan Amount",
      accessor: 'loan_amount',
    },
    {
      Header: "Required Date",
      accessor: 'required_Date',
    },
    {
      Header: "Reason",
      accessor: 'reason',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },

  ], [])

  const [isCreatingLoanRequest, setCreatingLoanRequest] = useState(false);
  const handleCreateLoanRequest = () => {
    setCreatingLoanRequest(true);
  };

  const userId = useSelector(selectUID)
  const req = useSelector(selectCreatingLoan)
  const dispatcher = useDispatch()
  useEffect(() => {
    getUserLoanById(userId, dispatcher, orgId, role)
    setCreatingLoanRequest(req)
  }, [])

  const apiData = useSelector(selectUserLoan)

  let data = [];
  if(apiData) {
      data = apiData.map(obj => ({
      loan_type: obj.loan_type.type, loan_amount: obj.loan_amount,
      required_Date: obj.required_Date, reason: obj.reason,
      active: obj.status, status: ""
    }));
  }
  

  for (let index = 0; index < data.length; index++) {
    const dateStr = data[index].required_Date
    const date = new Date(dateStr);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const formattedDate = date.toLocaleString(undefined, options);
    data[index].required_Date = formattedDate
    if (data[index].active === false) {
      data[index].status = "Pending";
    } else {
      data[index].status = "Approved";
    }

  }
  return (
    <div className="bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    
      {!isCreatingLoanRequest && (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Loan Requests</h1>
            <button
              type="submit"
              className="bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCreateLoanRequest}
            >
              Create
            </button>
          </div>
        )}
        {isCreatingLoanRequest ? (
          <CreateLoanRequest /> // Render CreateLoanRequest component if isCreatingLoanRequest is true
        ) : (
          <div className="mt-6">
            <Table columns={columns} data={data} />
          </div>
          
        )}
      </main>
    </div>
  );
}

export default Loan;



