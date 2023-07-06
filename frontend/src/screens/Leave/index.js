import React from 'react'
import Table, { StatusPill } from './src/Table'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectUID } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'
import View from './src/modal';
import { useState } from 'react';
import { getUserLeaves } from '../../api/leaverequest';
import { selectUserLeaves } from '../../states/reducers/slices/backend/LeaveRequest';

function Leave() {

  const [showView, setShowView] = useState(false);


  const handleAction = (rowData) => {
    setShowView(!showView);
  };
  const columns = useMemo(() => [
    {
      Header: "Leave Type",
      accessor: 'leaveType',
    },
    {
      Header: "Start Date",
      accessor: 'startDate',
    },

    {
      Header: "End Date",
      accessor: 'endDate',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Count",
      accessor: 'count',
    },
    {
      Header: "Date Of Request",
      accessor: 'createdAt',
    },
    {
      Header: "Action", 
      accessor: 'action',
      Cell: ({ row }) => (
        <div className='flex items-center justify-center'>
          <div className='pr-2'>
            <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </div>
          <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      )
    }
  ], [])
  const user_id = useSelector(selectUID)
  const apiData = useSelector(selectUserLeaves)
  console.log(apiData,"apiData");
  const dispatcher = useDispatch()
  useEffect(() => {
    getUserLeaves(user_id, dispatcher)
  }, [])

  const data = apiData.map(obj => ({
    leaveType: obj.leaveType.shortName,
    startDate: obj.startDate.substring(0, 10), endDate: obj.endDate.substring(0, 10),
    createdAt: obj.createdAt.substring(0, 10), count: obj.count,
    status: obj.status
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

export default Leave;



