import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastMessage } from '../../AlertConfigs';
import { toast } from 'react-toastify';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { createDepartment, getDepartmentsByOrgId } from '../../api/departments';
import { getBranchesByOrgId } from '../../api/branches';
import Modal from '../../components/Modal';
import CFForm from './component/CFForm';
import Table from '../../components/Table';

const Departments = () => {
    let orgId;
    orgId = useSelector(selectCurrentUserOrg);
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

    const handleCreateDepartment = (toggler) => {
        if (!formData.name || !formData.branch) {
            toastMessage("error", "Please fill in all the required fields.", toast);
            toggler();
            return;
        }
        createDepartment(formData, changeToggler, toggler);
        setFormData({ name: "", organization: orgId, branch: "" });
    };

    const handleAction = (rowData) => {
        // Handle action here
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
    ], []);

    const data = departments.map(obj => ({
        name: obj.name,
        branch: obj.branch.name
    }));

    const btnConfig = [
        {
          title: 'Create',
          handler: handleCreateDepartment,
        }
      ]

    return (
        <div>
            <Modal
                action="Create Department"
                title="Create Department"
                Element={<CFForm branches={branches} formData={formData} handleInputChange={handleInputChange} />}
                btnConfig={btnConfig}
            />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="mt-6">
                    <Table columns={columns} data={data} />
                </div>
            </main>

        </div>
    );
};

export default Departments;
