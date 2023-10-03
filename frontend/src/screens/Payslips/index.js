import React, { useState, useEffect } from 'react';
import Table, { StatusPill } from '../../components/Table';
import { selectOrgId, selectPayslips, selectUID } from '../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import ComponentLoader from '../../components/Loader/ComponentLoader';
import { getPayslips, getPayslipsOrg } from '../../api/payslips';

import View from './src/modal';
import { useMemo } from 'react';

function Payslips({ isAdmin = false }) {
  const apiData = useSelector(selectPayslips);
  const user_id = useSelector(selectUID);
  const org_id = useSelector(selectOrgId);
  const dispatcher = useDispatch();
  const [setSelectedId] = useState(null);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [isLoading, setIsLoading] = useState(true);


  // Example CSS classes
const openStatusClass = 'status-open';
const closedStatusClass = 'status-closed';

// Example CSS styles (you can customize these styles)
const statusStyles = {
  open: {
    color: 'red',
  },
  closed: {
    color: 'green',
  },
};


  useEffect(() => {
    if (isAdmin === false) {
      getPayslips(user_id, dispatcher)
    } else {
      getPayslipsOrg(org_id, dispatcher)
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
  }, []);

  const data = apiData.map(obj => ({
    month: month[obj.month],
    grossSalary: Math.floor(obj.grossSalary),
    tax: Math.floor(obj.tax),
    finalSalary: Math.floor(obj.finalSalary),
    status: obj.status,
    year: obj.year,
    id: obj._id,
  }));

  const columns = useMemo(() => [
    {
      Header: "Month",
      accessor: 'month',
    },
    {
      Header: "Year",
      accessor: 'year',
    },
    {
      Header: "Earning",
      accessor: 'grossSalary',
    },
    {
      Header: "Tax",
      accessor: 'tax',
    },
    {
      Header: "Net Payable",
      accessor: 'finalSalary',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: ({ row }) => {
        const status = row.original.status;
        const statusClassName = status === 'Open' ? openStatusClass : closedStatusClass;
        const statusStyle = {
          color: statusStyles[status.toLowerCase()].color,
          border: '1px solid ' + statusStyles[status.toLowerCase()].borderColor,
          padding: '4px 8px',
        };
  
        return (
          <span className={statusClassName} style={statusStyle}>
            {status}
          </span>
        );
      },
    },
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <div className='flex items-center justify-center'>
          <View
            selectedId={row.original.id}
            setSelectedId={setSelectedId}
          />
        </div>
      ),
    },
  ], []);

  
  if (isLoading) {
    return <ComponentLoader color="black" />;
  }

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4">
      <Table columns={columns} data={data} />
    </main>
  );
}

export default Payslips;
