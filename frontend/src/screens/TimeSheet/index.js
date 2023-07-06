import React from 'react'
import Table, { StatusPill } from './src/Table'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectTimeSheet, selectUID, selectUserWfh } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'
import { getTimeSheet } from '../../api/wfh'
import View from './src/modal';
import { useState } from 'react';

function TimeSheet() {

  const [showView, setShowView] = useState(false);


  const handleAction = (rowData) => {
    setShowView(!showView);
  };
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: 'date',
    },
    {
      Header: "Checked In",
      accessor: 'checkIn',
    },

    {
      Header: "Checked Out",
      accessor: 'checkOut',
      // Cell: StatusPill,
    },{
      Header: "On Leave",
      accessor: 'onLeave',
    },
    {
      Header: "Early Arrival Time ",
      accessor: 'earlyArrivalTime',
      // Cell: StatusPill,
    },
    {
      Header: "Early Left Time ",
      accessor: 'earlyLeftTime',
      // Cell: StatusPill,
    },

    
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <div className='flex items-center justify-center w-min'>
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



  const user = useSelector(selectUID)
  const apiData = useSelector(selectTimeSheet)
  const dispatcher = useDispatch()
  const today = new Date();
  const start = today.toLocaleDateString();
  const part = start.split('/');
  const endDate = `${part[2]}-${part[1]}-${part[0]}`;
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const end = firstDayOfMonth.toLocaleDateString()
  const parts = end.split('/');
  const startDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const body = {
    user,
    startDate,
    endDate,
    filter: "my-sheet"
  }

  console.log("body", body);
  useEffect(() => {
    getTimeSheet(body, dispatcher)
  }, [])

  console.log("Time Sheet",apiData);

  const data = apiData.map(obj => ({
    date: obj.date.substring(0, 10), checkIn: obj.checkIn,
    checkOut: obj.checkOut, earlyArrivalTime: obj.earlyArrivalTime,
    earlyLeftTime: obj.earlyLeftTime,
    isAbsent: obj.isAbsent,
    isEarlyArrival: obj.isEarlyArrival,
    isEarlyLeft: obj.isEarlyLeft,
    isPresent: obj.isPresent,
    onLeave: obj.onLeave,
  }));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          {showView && <View />}
          <div className="overflow-x-hidden">
            <Table className="w-full" columns={columns} data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TimeSheet;



