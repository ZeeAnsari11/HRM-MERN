import React from 'react'  // new
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../components/Table';
import { useMemo } from 'react'
import { getAllUsersByOrganization } from '../../api/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, selectOrgId } from '../../states/reducers/slices/backend/UserSlice'
import { useEffect } from 'react'


function ViewEmployees() {

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
    },
    {
      Header: "Designation",
      accessor: 'designation',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Gross Salary",
      accessor: 'salary',
    },
    {
      Header: "Role",
      accessor: 'role',
      Filter: SelectColumnFilter,  // new
      filter: 'includes',
    },
  ], [])

  const organization = useSelector(selectOrgId)
  const dispatcher = useDispatch()
  useEffect(() => {
    getAllUsersByOrganization(organization, dispatcher)
  }, [])

  const apiData = useSelector(selectAllUsers)

  const data = apiData.map(obj => ({
    name: obj.firstName + " " + obj.lastName, email: obj.email,
    designation: obj.designation.title, salary: obj.grossSalary, 
    active: obj.status, role: obj.roleType, status: ""
  }));

  for (let index = 0; index < data.length; index++) {
    if(data[index].active === false) {
      data[index].status = "InActive";
    } else {
      data[index].status = "Active";
    }
    
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default ViewEmployees;



