// import React, { useState, useEffect } from 'react';
// import SearchIcon from '@material-ui/icons/Search';
// import {
//     TableContainer,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Paper,
//     Grid,
//     Box,
//     Typography,
// } from '@material-ui/core';
// import { useSelector } from 'react-redux';
// import { selectUID } from '../../states/reducers/slices/backend/UserSlice';
// import { getMissingPunchesRquestsOfUser } from '../../api/missingPunchesRequests';


// const ViewAttendenceRequests = () => {
//     let userId=useSelector(selectUID)
//     const [searchTerm, setSearchTerm] = useState("");
//     const [AttendenceRequestHistory, setAttendenceRequestHistory] = useState([]);

//     const convertToAMPM = (time) => {
//         const [hours, minutes] = time.split(':');

//         const formattedTime = new Date();
//         formattedTime.setHours(hours, minutes);

//         return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
//     }
//     useEffect(() => {
//         console.log("I am rendered")
//         getMissingPunchesRquestsOfUser(userId)
//           .then((response) => {
//             setAttendenceRequestHistory(response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }, []);

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredAttendenceHistory = AttendenceRequestHistory.filter((entry) =>
//         entry.status.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Box p={3}>
//             <Grid container justifyContent="space-between" alignItems="center">
//                 <Typography variant="h5" className="border-l-8 border-backgroundDark font-bold text-lg px-4">
//                     Attendence Requests
//                 </Typography>
//                 <Grid item xs={12} sm={6}>
//                     <div className="relative">
//                         <input
//                             className="w-full border border-backgroundDark rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                             type="text"
//                             placeholder="Search Requests"
//                             onChange={handleSearch}
//                         />
//                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         </div>
//                     </div>
//                 </Grid>

//             </Grid>
//             <TableContainer component={Paper}>
//                 <Table className="min-w-full" aria-label="Attendence Request History Table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell className="px-4 py-2">Punch Type</TableCell>
//                             <TableCell className="px-4 py-2">Date</TableCell>
//                             <TableCell className="px-4 py-2">Punch Time</TableCell>
//                             <TableCell className="px-4 py-2">Status</TableCell>
//                             <TableCell className="px-4 py-2">Date of Request</TableCell>
//                             <TableCell className="px-4 py-2">Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredAttendenceHistory.map((entry, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{entry.punchType}</TableCell>
//                                 <TableCell>{entry.date.slice(0, 10)}</TableCell>
//                                 <TableCell>{convertToAMPM(entry.expectedTime)}</TableCell>
//                                 <TableCell>{entry.status}</TableCell>
//                                 <TableCell>{entry.createdAt.slice(0, 10)}</TableCell>
//                                 <TableCell>
//                                     <div className="flex space-x-1">
//                                         <div title="View Request">
//                                             <button className="bg-blue-500 text-white p-1 rounded-md">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.707-4.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414L11.414 14l3.293 3.293a1 1 0 01-1.414 1.414L10 15.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 14 5.293 10.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                         <div title="Request History">
//                                             <button className="bg-green-500 text-white p-1 rounded-md">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                     <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-9a1 1 0 012 0v4a1 1 0 01-2 0V7z" />
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                         <div title="Cancel Request">
//                                             <button className="bg-red-500 text-white p-1 rounded-md">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.414a1 1 0 011.414 0L10 11.586l1.414-1.414a1 1 0 011.414 1.414L11.414 13l1.414 1.414a1 1 0 01-1.414 1.414L10 14.414l-1.414 1.414a1 1 0 01-1.414-1.414L8.586 13 7.172 11.586a1 1 0 010-1.414z" clipRule="evenodd" />
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </TableCell>

//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// }

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

