import Table, { StatusPill } from '../../components/Table';
import { selectUID, selectUserWfh } from '../../states/reducers/slices/backend/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import View from './src/modal';
import { getAllWfhOfUser } from '../../api/wfh'
import { useEffect } from 'react'
import { useMemo } from 'react'

function ViewWorkFromHome() {


  const user_id = useSelector(selectUID)
  const apiData = useSelector(selectUserWfh)
  const dispatcher = useDispatch()
  useEffect(() => {
    getAllWfhOfUser(user_id, dispatcher)
  }, [])

  const data = apiData.map(obj => ({
    startDate: obj.startDate.substring(0, 10), endDate: obj.endDate.substring(0, 10),
    createdAt: obj.createdAt.substring(0, 10), reason: obj.reason,
    status: obj.status, id: obj._id,
  }));


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
          <View
            selectedId={row.original.id}
            user_id = {user_id}
          />
        </div>
      )
    }
  ], [])

  return (
    <div className="bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
        {/* {showView && <View />} */}
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default ViewWorkFromHome;



