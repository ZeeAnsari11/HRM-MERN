import React from 'react';
import MultiSelect from '../../components/SelectForm/MultiSelect';
import { useEffect, useState } from 'react';

export default function LoanTypeView({ data, orgId, desiginationsList }) {
    // console.log("========data========", data);
    const [toggleChange, setToggleChange] = useState(false);
    const [formData2, setFormData] = useState({
        type: data.type,
        designations: data.designations,
        organization: orgId,
    });
    console.log("========formData2========", formData2);

    const handleInputChange = (e) => {
        setFormData({ ...formData2, [e.target.name]: e.target.value });
    };

    return <form>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Create Loan Type Name</label>
            <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                type="text"
                name="type"
                value={formData2.type}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Select Designation(s) </label>
            <MultiSelect handleInputChange={handleInputChange} desiginations={desiginationsList} formData={formData2} />
        </div>
    </form>
}



