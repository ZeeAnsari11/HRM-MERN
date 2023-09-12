import React, { useEffect, useState } from 'react'
import Table, { StatusPill } from '../../components/Table';
import { faEye, faPencil } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMissingPunchesRquestsOfUser } from '../../api/missingPunchesRequests';
import { selectUID } from '../../states/reducers/slices/backend/UserSlice'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

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
                    <div className='pr-2'>
                        <button title="Flow" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
                        <FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />
                        </button>
                    </div>
                    <button title="View" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </div>
            )
        }
    ], [handleAction])


    let userId = useSelector(selectUID)
    const [searchTerm] = useState("");
    const [AttendenceRequestHistory, setAttendenceRequestHistory] = useState([]);

    const convertToAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        const formattedTime = new Date();
        formattedTime.setHours(hours, minutes);
        return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    useEffect(() => {
        getMissingPunchesRquestsOfUser(userId)
            .then((response) => {
                if (response !== undefined) setAttendenceRequestHistory(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });
    
    const filteredAttendenceHistory = AttendenceRequestHistory.filter((entry) =>
        entry.status.toLowerCase().includes(searchTerm.toLowerCase()))

    const data = filteredAttendenceHistory.map(obj => ({
        date: obj.date.substring(0, 10),
        createdAt: obj.createdAt.substring(0, 10),
        status: obj.status,
        expectedTime: convertToAMPM(obj.expectedTime),
        punchType: obj.punchType

    }));

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

export default ViewAttendenceRequests;

