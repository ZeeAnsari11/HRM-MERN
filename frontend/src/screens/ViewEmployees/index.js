import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../components/Table';
import { selectAllUsers, selectOrgId } from '../../states/reducers/slices/backend/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

import EmployeeViewAndEdit from './EmployeeViewAndEdit';
import React from 'react'
import TimeSlotsView from '../TimeSlots/TimeSlotsView'
import { getAllUsersByOrganization } from '../../api/user'
import { useEffect } from 'react'
import { useMemo } from 'react'

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
      accessor: 'designationTitle',
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
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <EmployeeViewAndEdit data={row.original} />
      ),
    },
  ], [])


  const organization = useSelector(selectOrgId)
  const dispatcher = useDispatch()
  useEffect(() => {
    getAllUsersByOrganization(organization, dispatcher)
  }, [])

  const apiData = useSelector(selectAllUsers)

  const data = apiData.map(obj => ({
    id: obj._id,
    name: obj.firstName + " " + obj.lastName,
    email: obj.email,
    designationTitle: obj.designation?.title,
    salary: obj.grossSalary,
    active: obj.status,
    role: obj.roleType, status: "",

    userDefinedCode: obj.userDefinedCode,
    grade: obj.grade,
    department: obj.department,
    phoneNumber: obj.phoneNumber,
    firstName: obj.firstName,
    lastName: obj.lastName,
    branch: obj.branch,
    designation: obj.designation,
    skills: obj.skills,
    timeSlots: obj.userRoster.timeSlots,
    roaster : {
      restDays: obj.userRoster.restDays
    },
    isLineManager: obj.isLineManager,
    isTeamLead: obj.isTeamLead,
    isFinalAuthority: obj.isFinalAuthority,
    lineManager: obj.lineManager,
    employeeType: obj.employeeType,
    employmentType: obj.employmentType,
    roleType: obj.roleType,
    joiningDate: obj.joiningDate,
    religion: obj.religion,
    nationality: obj.nationality,
    personalEmail: obj.personalEmail,
    nic: {
      number: obj.nic.number,
      attachment: {
        back: obj.nic.attachment.back,
        front: obj.nic.attachment.front
      }
    },
    passport: {
      number: obj.passport.number,
      attachment: obj.passport.attachment,
      expiry: obj.passport.expiry
    },
    drivingLiscence: {
      number: obj.drivingLiscence.number,
      attachment: obj.drivingLiscence.attachment,
      expiry: obj.drivingLiscence.expiry
    },
    isHOD : obj.HOD.isHOD,
    grossSalary: obj.grossSalary,
    temporaryAddress: obj.temporaryAddress,
    permanentAddress: obj.permanentAddress,
    bgShifterAddress: obj.bgShifterAddress
  }));

  for (let index = 0; index < data.length; index++) {
    if (data[index].active === false) {
      data[index].status = "InActive";
    } else {
      data[index].status = "Active";
    }

  }
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

export default ViewEmployees;



