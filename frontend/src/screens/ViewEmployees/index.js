// import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../components/Table';
// import { selectAllUsers, selectOrgId } from '../../states/reducers/slices/backend/UserSlice'
// import { useDispatch, useSelector } from 'react-redux'

// import React from 'react'
// import { getAllUsersByOrganization } from '../../api/user'
// import { useEffect } from 'react'
// import { useMemo } from 'react'

// // new


// function ViewEmployees() {

//   const columns = useMemo(() => [
//     {
//       Header: "Name",
//       accessor: 'name',
//       Cell: AvatarCell,
//       imgAccessor: "imgUrl",
//       emailAccessor: "email",
//     },
//     {
//       Header: "Designation",
//       accessor: 'designation',
//     },
//     {
//       Header: "Status",
//       accessor: 'status',
//       Cell: StatusPill,
//     },
//     {
//       Header: "Gross Salary",
//       accessor: 'salary',
//     },
//     {
//       Header: "Role",
//       accessor: 'role',
//       Filter: SelectColumnFilter,  // new
//       filter: 'includes',
//     },
//   ], [])

//   const organization = useSelector(selectOrgId)
//   const dispatcher = useDispatch()
//   useEffect(() => {
//     getAllUsersByOrganization(organization, dispatcher)
//   }, [])

//   const apiData = useSelector(selectAllUsers)

//   const data = apiData.map(obj => ({
//     name: obj.firstName + " " + obj.lastName, email: obj.email,
//     designation: obj.designation?.title, salary: obj.grossSalary, 
//     active: obj.status, role: obj.roleType, status: ""
//   }));

//   for (let index = 0; index < data.length; index++) {
//     if(data[index].active === false) {
//       data[index].status = "InActive";
//     } else {
//       data[index].status = "Active";
//     }

//   }
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
//         <div className="mt-6">
//           <Table columns={columns} data={data} />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ViewEmployees;

import { AvatarCell, SelectColumnFilter, StatusPill } from '../../components/Table';
import React, { useEffect, useState } from 'react';
import { selectAllUsers, selectOrgId } from '../../states/reducers/slices/backend/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

import DepartmentsView from '../Departments/DepartmentsView';
import EmployeesVieModal from './EmplyeesViewModal';
import EmployeesViewForm from './EmplyeesViewModal';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { createBranch } from '../../api/branches';
import { getAllUsersByOrganization } from '../../api/user'
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useMemo } from 'react'

// Import DepartmentsView here if it's defined in a separate file

function ViewEmployees() {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({});

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  const organization = useSelector(selectOrgId)
  const dispatcher = useDispatch()
  useEffect(() => {
    getAllUsersByOrganization(organization, dispatcher)
  }, [])

  const apiData = useSelector(selectAllUsers)
  console.log("====apiData====", apiData);
  // const data = apiData.map(obj => ({
  //   name: obj.firstName + " " + obj.lastName,
  //   email: obj.email,
  //   designation: obj.designation?.title,
  //   salary: obj.grossSalary,
  //   active: obj.status,
  //   role: obj.roleType, status: "",
  //   firstName: obj.firstName,
  //   lastName: obj.lastName,
  //   grossSalary: obj.grossSalary,
  //   isActive: obj.isActive,
  //   roleType: obj.roleType,
  //   status: "", // You can add more fields here
  //   // Add more fields as needed
  //   nicNumber: obj.nic?.number,
  //   nicFrontAttachment: obj.nic?.attachment?.front,
  //   nicBackAttachment: obj.nic?.attachment?.back,
  //   nicExpiry: obj.nic?.expiry,
  //   id: obj._id,
  //   skills: obj.skills,
  //   isLineManager: obj.isLineManager,
  //   isTeamLead: obj.isTeamLead,
  //   isFinalAuthority: obj.isFinalAuthority,
  //   attendanceExempt: obj.attendanceExempt,
  //   lineManager: obj.lineManager,
  //   firstUser: obj.firstUser,
  //   grade: obj.grade,
  //   branch: obj.branch,
  //   organization: obj.organization,
  //   personalEmail: obj.personalEmail,
  //   bloodGroup: obj.bloodGroup,
  //   nationality: obj.nationality,
  //   joiningDate: obj.joiningDate,
  //   employmentType: obj.employmentType,
  //   employeeType: obj.employeeType,
  //   userDefinedCode: obj.userDefinedCode,
  //   leaveTypeDetails: obj.leaveTypeDetails,
  //   timeZone: obj.timeZone,
  //   rehire: obj.rehire,
  //   createdAt: obj.createdAt,
  //   __v: obj.__v,
  //   phoneNumber: obj.phoneNumber,
  //   permanentAddress: obj.permanentAddress,
  //   temporaryAddress: obj.temporaryAddress,
  // }));
  let pass = apiData.map(obj => obj.password)
  console.log("====pass=======", pass);
  
  const data = apiData.map(obj => ({
    fullName: obj.firstName + " " + obj.lastName,
    designationTitle: obj.designation?.title,
    HOD: {
      department: obj.HOD?.department,
      isHOD: obj.HOD?.isHOD
    },
    areaBounded: {
      isBounded: obj.areaBounded?.isBounded
    },
    attendanceExempt: obj.attendanceExempt,
    "blood-group": obj.bloodGroup,
    branch: obj.branch,
    createdAt: obj.createdAt,
    designation: obj.designation,
    password: obj.password,
    drivingLiscence: {
      number: obj.drivingLiscence?.number
    },
    email: obj.email,
    employeeType: obj.employeeType,
    employmentType: obj.employmentType,
    firstName: obj.firstName,
    firstUser: obj.firstUser,
    grade: obj.grade,
    grossSalary: obj.grossSalary,
    isActive: obj.isActive,
    isFinalAuthority: obj.isFinalAuthority,
    isLineManager: obj.isLineManager,
    isTeamLead: obj.isTeamLead,
    joiningDate: obj.joiningDate,
    lastName: obj.lastName,
    lineManager: obj.lineManager,
    nationality: obj.nationality,
    nic: {
      attachment: {
        back: obj.nic?.attachment?.back,
        front: obj.nic?.attachment?.front
      },
      expiry: obj.nic?.expiry,
      number: obj.nic?.number,
    },
    organization: obj.organization,
    passport: {
      number: obj.passport?.number,
    },
    permanentAddress: obj.permanentAddress,
    personalEmail: obj.personalEmail,
    phoneNumber: obj.phoneNumber,
    probation: {
      isOnProbation: obj.probation?.isOnProbation,
      status: obj.probation?.status
    },
    roleType: obj.roleType,
    temporaryAddress: obj.temporaryAddress,
    timeZone: obj.timeZone,
    userDefinedCode: obj.userDefinedCode,
    userRoster: {
      restDays: obj.userRoster?.restDays,
      timeSlots: obj.userRoster?.timeSlots
    },
    id: obj._id
  }));


  for (let index = 0; index < data.length; index++) {
    if (data[index].active === false) {
      data[index].status = "InActive";
    } else {
      data[index].status = "Active";
    }
  }

  // Define handleInputChange, handleCreateBranch, columns, and data outside the return statement

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateBranch = (trigger) => {
    createBranch(formData, changeToggler, trigger);
    setFormData({
      fullName: '',
      designationTitle: '',
      country: '',
      description: '',
      organization: orgId,
    });
  };

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: 'fullName',
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
      Filter: SelectColumnFilter,  // new
      filter: 'includes',
    },
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        // Replace DepartmentsView with the correct component here
        <EmployeesVieModal data={row.original} />
      ),
    },
  ], []);

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateBranch,
    }
  ]

  return (
    <div className='my-4'>
      <Modal
        action="Create Branch"
        title="Create Branch"
        // Element={<CBForm formData={formData} handleInputChange={handleInputChange} />}
        btnConfig={btnConfig}
      />
      <div className="bg-gray-100 text-gray-900">
        <main className="mx-auto px-4 sm:px-6 pt-4">
          <Table columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
}

export default ViewEmployees;
