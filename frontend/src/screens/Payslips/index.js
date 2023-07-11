import React from 'react'
import Table, { StatusPill } from './src/Table'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectPayslips, selectUID, selectUserWfh } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'
import { getAllWfhOfUser } from '../../api/wfh'
import View from './src/modal';
import { useState } from 'react';
import { getPayslips } from '../../api/payslips';

function Payslips() {

  const [showView, setShowView] = useState(false);
  const handleAction = (rowData) => {
    setShowView(!showView);
  };
  const columns = useMemo(() => [
    {
      Header: "Month",
      accessor: 'month',
    },
    {
      Header: "Year",
      accessor: 'year',
    },
    {
      Header: "Earning",
      accessor: 'grossSalary',
    },
    {
      Header: "Tax",
      accessor: 'tax',
    },
    {
      Header: "Net Payable",
      accessor: 'finalSalary',
    },

    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Action", 
      accessor: 'action',
      Cell: ({ row }) => (
        <div className='flex items-center justify-center'>
          <View></View>
          {/* <button bclassName="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
            <FontAwesomeIcon icon={faEye} />
          </button> */}
        </div>
      )
    }
  ], [])
  const user_id = useSelector(selectUID)
  const apiData = useSelector(selectPayslips)
  console.log("Payslips",apiData);
  const dispatcher = useDispatch()
  useEffect(() => {
    getPayslips(user_id, dispatcher)
  }, [])

  const data = apiData.map(obj => ({
    month: obj.month, grossSalary: obj.grossSalary,
    tax: obj.tax, finalSalary: obj.finalSalary,
    status: obj.status, year: obj.year,
  }));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
        {showView && <View />}
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default Payslips;

