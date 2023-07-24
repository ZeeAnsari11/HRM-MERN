import React from 'react'
import Table, { StatusPill } from '../../components/Table';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectUID } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'
import { useState } from 'react';
import { getUserLeaves } from '../../api/leaverequest';
import { selectUserLeaves } from '../../states/reducers/slices/backend/LeaveRequest';
import View from './src/modal';

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
          <View
            selectedId={row.original.id}
          />
        </div>
      )
    },
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
        {/* {showView && <View />} */}
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default Leave;



