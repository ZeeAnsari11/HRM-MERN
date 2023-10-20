import React, { useEffect, useState } from 'react'
import Table, { StatusPill } from '../../components/Table';

import { getMissingPunchesRquestsOfUser } from '../../api/missingPunchesRequests';
import { selectMissingPunches, selectUID } from '../../states/reducers/slices/backend/UserSlice'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ViewAttendanceRequest from './src/modal';

function ViewAttendenceRequests() {

    const [showView, setShowView] = useState(false);
    const handleAction = (rowData) => {
        setShowView(!showView);
    };
    const columns = useMemo(() => [
        {
            Header: "Punch Type",
            accessor: 'punchType',
        },
        {
            Header: "Date",
            accessor: 'date',
        },

        {
            Header: "Punch Time",
            accessor: 'expectedTime',
            Cell: StatusPill,
        },
        {
            Header: "Status",
            accessor: 'status',
        },
        {
            Header: "Date of Request",
            accessor: 'createdAt',
        },
        {
            Header: "Action", 
            accessor: 'action',
            Cell: ({ row }) => (
              <div className='flex items-center justify-center'>
                <ViewAttendanceRequest
                  selectedId={row.original.id}
                />
              </div>
            )
          },
    ], [])


    let userId = useSelector(selectUID)
    const [searchTerm] = useState("");
    const dispatch = useDispatch()
    const convertToAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        const formattedTime = new Date();
        formattedTime.setHours(hours, minutes);
        return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    useEffect(() => {
        getMissingPunchesRquestsOfUser(userId, dispatch)
    },[]);

    const AttendenceRequestHistory = useSelector(selectMissingPunches)
    console.log("Missing Pucnches", AttendenceRequestHistory);
    const filteredAttendenceHistory = AttendenceRequestHistory.filter((entry) =>
        entry.status.toLowerCase().includes(searchTerm.toLowerCase()))
      
    const data = filteredAttendenceHistory.map(obj => ({
        date: obj.date.substring(0, 10),
        createdAt: obj.createdAt.substring(0, 10),
        status: obj.status,
        expectedTime: convertToAMPM(obj.expectedTime),
        punchType: obj.punchType,
        id: obj._id
    }));


    return (
        <div className="bg-gray-100 text-gray-900">
            <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="mt-6">
                    <Table columns={columns} data={data} />
                </div>
            </main>
        </div>
    );
}

export default ViewAttendenceRequests;

