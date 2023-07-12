import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { setOrganizationDesignation } from '../../states/reducers/slices/backend/Designation';
import { organizationRoutes } from '../../api/configuration';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '../../components/Table';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { createDesigination } from '../../api/designation';
import Modal from '../../components/Modal';
import CDForm from './CDForm';
import { toastMessage } from '../../AlertConfigs';
import { toast } from 'react-toastify';

const Desiginations = () => {
    let orgId;
    let dispatcher = useDispatch();
    orgId = useSelector(selectCurrentUserOrg);
    const [toggleChange, setToggleChange] = useState(false);
    const [desiginations, setDesiginations] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        organization: orgId,
        shortForm: ""
    });

    useEffect(() => {
        LoadData(dispatcher);
    }, [toggleChange]);

    let LoadData = (dispatcher) => {
        axios.get(organizationRoutes.getDesignationsByOrgId + orgId)
            .then((rsp) => {
                dispatcher(setOrganizationDesignation(rsp.data.response));
                setDesiginations(rsp.data.response);
            })
            .catch((e) => console.log(e));
    }

    const changeToggler = () => {
        setToggleChange(!toggleChange);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateDesigination = (trigger) => {
        if (formData.title.trim() === "" || formData.shortForm.trim() === "") {
            toastMessage("error", "Please fill in all the required fields.", toast);
            trigger()
            return;
        }

        const shortFormRegex = /^[a-zA-Z0-9-]+$/;
        if (!shortFormRegex.test(formData.shortForm)) {
            toastMessage("error", "Short Name can only contain alphabets, numbers, and hyphens (-).", toast);
            trigger()
            return;
        }
        createDesigination(formData, changeToggler, trigger);
        setFormData({
            title: "",
            organization: orgId,
            shortForm: ""
        })
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
                <div className='flex items-center'>
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

    const btnConfig = [
        {
            title: 'Create',
            handler: handleCreateDesigination,
        }
    ]

    return (
        <div>
            <Modal
                action="Create Designation"
                title="Create Designation"
                Element={<CDForm formData={formData} handleInputChange={handleInputChange} />}
                btnConfig={btnConfig}
            />
            <div className="min-h-screen bg-gray-100 text-gray-900">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <div className="mt-6">
                        <Table columns={columns} data={data} />
                    </div>
                </main>
            </div>

        </div>
    );
};

export default Desiginations;
