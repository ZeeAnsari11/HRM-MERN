import React from 'react'
import Table, { StatusPill } from '../../components/Table';
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUID, selectUserWfh } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'
import { getAllWfhOfUser } from '../../api/wfh'
import { useState } from 'react';

function ViewWorkFromHome() {

  const [showView, setShowView] = useState(false);
  const handleAction = (rowData) => {
    setShowView(!showView);
  };
  const columns = useMemo(() => [
    {
      Header: "Start Date",
      accessor: 'startDate',
    },
    {
      Header: "End Data",
      accessor: 'endDate',
    },

    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
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
          {/* <View></View> */}
          {/* <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
            <FontAwesomeIcon icon={faEye} />
          </button> */}
        </div>
      )
    }
  ], [])
  const user_id = useSelector(selectUID)
  const apiData = useSelector(selectUserWfh)
  const dispatcher = useDispatch()
  useEffect(() => {
    getAllWfhOfUser(user_id, dispatcher)
  }, [])

  const data = apiData.map(obj => ({
    startDate: obj.startDate.substring(0, 10), endDate: obj.endDate.substring(0, 10),
    createdAt: obj.createdAt.substring(0, 10), reason: obj.reason,
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

export default ViewWorkFromHome;



