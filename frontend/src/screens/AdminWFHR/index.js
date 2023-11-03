import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import LoanTypeView from '../AdminLR/RequestsView';
import Table from '../../components/Table';
import { getWFHRequestsByOrganizationId } from '../../api/wfh';
import { useSelector } from 'react-redux';

const AdminWFHR = () => {
  console.log("========1=====");
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
    getWFHRequestsByOrganizationId(orgId, role, setRequests, loanLoader)
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
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <LoanTypeView data={row.original} />
      ),
    },
  ];

  const data = requests?.map(obj => ({
    id: obj._id,
    user: obj?.user?.firstName + " " + obj?.user?.lastName,
    startDate: obj.startDate.slice(0, 10),
    endDate: obj.endDate.slice(0, 10),
    status: obj.status,
    reason: obj.reason
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

export default AdminWFHR;
