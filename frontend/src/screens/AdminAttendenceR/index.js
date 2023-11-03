import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import RequestsView from '../AdminLR/RequestsView';
import Table from '../../components/Table';
import { getAllM_PByOrgId } from '../../api/missingPunchesRequests';
import { useSelector } from 'react-redux';

const AdminAttendenceR = () => {
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
    getAllM_PByOrgId(orgId, role, setRequests, loanLoader)
  };

  console.log("===requests====",requests);
  const columns = [
    {
      Header: 'User',
      accessor: 'user',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Expected Time',
      accessor: 'expectedTime',
    },
    {
      Header: 'Punch Type',
      accessor: 'punchType',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
    id: obj._id,
    user: obj?.user?.firstName + " " + obj?.user?.lastName,
    date: obj.date.slice(0, 10),
    expectedTime : obj.expectedTime,
    punchType : obj.punchType,
    status: obj.status,
    description: obj.description
  }))

  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data}/>
        </div>
      </main>
    );
  else return <ComponentLoader color="black" />
};

export default AdminAttendenceR;
