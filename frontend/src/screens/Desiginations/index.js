import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { selectOrganizationDesignation } from '../../states/reducers/slices/backend/Designation'
import { setOrganizationDesignation } from '../../states/reducers/slices/backend/Designation';
import { organizationRoutes } from '../../api/configuration';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './src/Table'
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';

import { createDesigination } from '../../api/designation';

const Desiginations = () => {
    let orgId;
    let dispatcher = useDispatch();
    orgId = useSelector(selectCurrentUserOrg);
    const [showModal, setShowModal] = useState(false);
    const [desiginations, setDesiginations] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        organization: orgId,
        shortForm: ""
    });

    useEffect(() => {
        LoadData(dispatcher);
    }, []);

    let LoadData = (dispatcher) => {
        axios.get(organizationRoutes.getDesignationsByOrgId + orgId)
            .then((rsp) => {
                dispatcher(setOrganizationDesignation(rsp.data.response));
                // setDesiginations(rsp.data.response);
            })
            .catch((e) => console.log(e));
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateDesigination = () => {
        if (formData.title.trim() === "" || formData.shortForm.trim() === "") {
            alert("Please fill in all the required fields.");
            return;
        }

        const shortFormRegex = /^[a-zA-Z0-9-]+$/;
        if (!shortFormRegex.test(formData.shortForm)) {
            alert("Short Name can only contain alphabets, numbers, and hyphens (-).");
            return;
        }
        createDesigination(formData);
        setShowModal(false)
    };
    const handleAction = (rowData) => {

    };
    const columns = useMemo(() => [
        {
            Header: "Title",
            accessor: 'title',
        },
        {
            Header: "Short Form",
            accessor: 'shortForm',
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

    const data = desiginations.map(obj => ({
        title: obj.title,
        shortForm: obj.shortForm
    }));

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(!showModal)}
            >
                Create Desigination
            </button>

            {showModal && (
                <div className="bg-opacity-50 absolute inset-0">
                    <div className="bg-opacity-30 absolute inset-0"></div>
                    <div className="bg-white rounded p-8 relative">
                        <h2 className="text-lg font-bold mb-4">Create Desigination</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-1">Title</label>
                                <input
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-1">Short Name</label>
                                <input
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                    type="text"
                                    name="shortForm"
                                    value={formData.shortForm}
                                    onChange={handleInputChange}
                                    pattern="^[a-zA-Z0-9-]+$"
                                    title="Short Name can only contain alphabets, numbers, and hyphens (-)."
                                    required
                                />
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
                                onClick={handleCreateDesigination}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={showModal ? 'mt-64 bg-opacity-50 ' : ''}>
                {/* <div className="min-h-screen bg-gray-100 text-gray-900">
                    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                        <div className="mt-6">
                            <Table columns={columns} data={data} />
                        </div>
                    </main>
                </div> */}
            </div>
        </div>
    );
};

export default Desiginations;
