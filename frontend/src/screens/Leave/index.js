import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Box,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { selectLeaveType, selectUserLeaves } from '../../states/reducers/slices/backend/LeaveRequest';
import { useDispatch, useSelector } from 'react-redux';
import { selectUID } from '../../states/reducers/slices/backend/UserSlice';
import { getLeaveTypeById, getUserLeaves } from '../../api/leaverequest';


const Leave = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatcher = useDispatch();
  const user_id = useSelector(selectUID)
  const leaveHistory = useSelector(selectUserLeaves)
  const leaveType = useSelector(selectLeaveType)
  console.log(leaveType);
  const leaveType_id = leaveHistory.find(obj => obj.leaveType);
  console.log(leaveType_id);

  useEffect(() => {
    getUserLeaves(user_id, dispatcher)
    getLeaveTypeById(leaveHistory.leaveType, dispatcher)
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLeaveHistory = leaveHistory.filter((entry) =>
    entry.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" className="border-l-8 border-backgroundDark font-bold text-lg px-4">
          Requests
        </Typography>
        <Grid item xs={12} sm={6}>
          <div className="relative">
            <input
              className="w-full border border-backgroundDark rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
              placeholder="Search Requests"
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </Grid>

      </Grid>
      <TableContainer component={Paper}>
        <Table className="min-w-full" aria-label="leave history table">
          <TableHead>
            <TableRow>
              <TableCell className="px-4 py-2">Leave Type</TableCell>
              <TableCell className="px-4 py-2">StartDate</TableCell>
              <TableCell className="px-4 py-2">End Date</TableCell>
              <TableCell className="px-4 py-2">Count</TableCell>
              <TableCell className="px-4 py-2">Status</TableCell>
              <TableCell className="px-4 py-2">Date of Request</TableCell>
              <TableCell className="px-4 py-2">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaveHistory.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.leaveType}</TableCell>
                <TableCell>{entry.startDate}</TableCell>
                <TableCell>{entry.endDate}</TableCell>
                <TableCell>{entry.count}</TableCell>
                <TableCell>{entry.status}</TableCell>
                <TableCell>{entry.createdAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <div title="View Request">
                      <button className="bg-blue-500 text-white p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.707-4.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414L11.414 14l3.293 3.293a1 1 0 01-1.414 1.414L10 15.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 14 5.293 10.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div title="Request History">
                      <button className="bg-green-500 text-white p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-9a1 1 0 012 0v4a1 1 0 01-2 0V7z" />
                        </svg>
                      </button>
                    </div>
                    <div title="Cancel Request">
                      <button className="bg-red-500 text-white p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.414a1 1 0 011.414 0L10 11.586l1.414-1.414a1 1 0 011.414 1.414L11.414 13l1.414 1.414a1 1 0 01-1.414 1.414L10 14.414l-1.414 1.414a1 1 0 01-1.414-1.414L8.586 13 7.172 11.586a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Leave;
