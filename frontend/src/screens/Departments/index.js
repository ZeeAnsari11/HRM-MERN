import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './src/Table'
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { createDepartment, getDepartmentsByOrgId } from '../../api/departments';
import { getBranchesByOrgId } from '../../api/branches';

const Departments = () => {
    let orgId;
    orgId = useSelector(selectCurrentUserOrg);
    const [showModal, setShowModal] = useState(false);
    const [toggleChange, setToggleChange] = useState(false);
    const [departments, setDepartment] = useState([]);
    const [branches, setBranches] = useState([]);


    const [formData, setFormData] = useState({
        name: "",
        organization: orgId,
        branch: ""
    });

    useEffect(() => {
        LoadData()
    }, [toggleChange]);

    const changeToggler = () => {
        setToggleChange(!toggleChange);
    }

    let LoadData = () => {
        getDepartmentsByOrgId(orgId, setDepartment)
        getBranchesByOrgId(orgId, setBranches)
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateDepartment = () => {
        createDepartment(formData, changeToggler);
        setShowModal(false);
        setFormData({ name: "", organization: orgId, branch: "" });
    };
    const handleAction = (rowData) => {

    };
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: 'name',
        },
        {
            Header: "Branch",
            accessor: 'branch',
        },
        {
            Header: "Action",
            accessor: 'action',
            Cell: ({ row }) => (
                <div className='flex items-center justify-center'>
                    <div className='pr-2'>
                        <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} />
                        </button>
                    </div>
                    <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow" onClick={() => handleAction(row.original)}>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </div>
            )
        }
    ], [])

    const data = departments.map(obj => ({
        name: obj.name,
        branch: obj.branch.name
    }));

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(!showModal)}
            >
                Create Department
            </button>

            {showModal && (
                <div className="bg-opacity-50 absolute inset-0">
                    <div className="bg-white rounded p-8 relative">
                        <h2 className="text-lg font-bold mb-4">Create Department</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-1">Name</label>
                                <input
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-1">Branch</label>
                                <select
                                    name="branch"
                                    id="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="" className="border border-gray-300 rounded-md px-3 py-2 w-full"></option>
                                    {branches.map((branch) => (
                                        <option key={branch._id} value={branch._id}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCreateDepartment}
                            >
                                Submit
                            </button>
                        </div>
                    </div>


                </div>
            )}

            <div className={showModal ? 'mt-64 bg-opacity-50 ' : ''}>
                <div className="min-h-screen bg-gray-100 text-gray-900">
                    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                        <div className="mt-6">
                            <Table columns={columns} data={data} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Departments;
