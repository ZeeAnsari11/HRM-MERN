import React from 'react'
import Table, { StatusPill } from './src/Table'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { selectUID, selectUserWfh } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'
import View from './src/modal';
import { useState } from 'react';
import { getMissingPunchesRquestsOfUser } from '../../api/missingPunchesRequests';


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
                            <FontAwesomeIcon icon={faArrowAltCircleRight} />
                        </button>
                    </div>
                    <button title="View" className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </div>
            )
        }
    ], [])


    let userId = useSelector(selectUID)
    const [searchTerm, setSearchTerm] = useState("");
    const [AttendenceRequestHistory, setAttendenceRequestHistory] = useState([]);

    const convertToAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        const formattedTime = new Date();
        formattedTime.setHours(hours, minutes);
        return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    useEffect(() => {
        console.log("I am rendered")
        getMissingPunchesRquestsOfUser(userId)
            .then((response) => {
                console.log(response, 'init')
                if (response !== undefined) setAttendenceRequestHistory(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    console.log(typeof (AttendenceRequestHistory))
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

export default ViewAttendenceRequests;

