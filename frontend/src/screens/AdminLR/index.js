import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import RequestsView from './RequestsView';
import Table from '../../components/Table';
import { getLeaveRequestsByOrganizationId } from '../../api/leaverequest';
import { useSelector } from 'react-redux';

const AdminLR = () => {
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);

  const [toggleChange, setToggleChange] = useState(false);
  const [requests, setRequests] = useState([]);

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    LoadData();
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

  const loanLoader = () => {
    setLoader(false)
  }


  let LoadData = () => {
    getLeaveRequestsByOrganizationId(orgId, role, setRequests, loanLoader)
  };


  const columns = [
    {
      Header: 'User',
      accessor: 'user',
    },
    {
      Header: 'Start Date',
      accessor: 'startDate',
    },
    {
      Header: 'End Date',
      accessor: 'endDate',
    },
    {
      Header: 'Count',
      accessor: 'count',
    },
    {
      Header: 'Short',
      accessor: 'short',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Leave',
      accessor: 'leaveType',
    },

    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <RequestsView data={row.original} />
      ),
    },
  ];
  const data = requests?.map(obj => ({
    id : obj._id,
    user: obj.user.firstName + " " + obj.user.lastName,
    startDate: obj.startDate.slice(0, 10),
    endDate: obj.endDate.slice(0, 10),
    count: obj.count,
    short: obj.short ? 'Yes' : 'No',
    status: obj.status,
    shortEndTime : obj?.shortleaveDetails?.endTime,
    shortStartTime : obj?.shortleaveDetails?.startTime,
    leaveType: obj.leaveType?.name ? obj.leaveType?.name : obj?.shortleaveDetails?.shortLeaveType?.name,
    reason : obj.reason
  }))

  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />

        </div>
      </main>
    );
  else return <ComponentLoader color="black" />
};

export default AdminLR;
