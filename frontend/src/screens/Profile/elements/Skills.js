import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Modal from '../../../components/Modal'
import CUForm from './common/CUForm';
import { updateUserById } from '../../../api/user'
import { selectUID } from '../../../states/reducers/slices/backend/UserSlice'
import { useSelector } from 'react-redux'

const Skills = ({ data }) => {
    const title = "Skills"
    const userId = useSelector(selectUID);
    const [formData, setFormData] = React.useState(data?.skills?.join(','));

    const handleInputChange = (e) => {
        setFormData(e.target.value.replace(/\s/g, ''));
    };

    const handleSubmit = (trigger) => {
        const skillData = { skills : formData.split(',') };
        updateUserById(userId, skillData, trigger);
    }
    
    const config = [
        {
            type: 'text',
            name: 'skills',
            value: formData,
            onChange: handleInputChange,
            isRequired: true
        }
    ]

    const btnConfig = [{
        title: 'Update',
        handler: handleSubmit,
    }]
    return (
        <>
            <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6">
                <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={
                        <>
                            <CUForm config={config} handleInputChange={handleInputChange} isFull={false} />
                            <p className='text-xs text-gray-600 font-semibold'><span className='text-red-700'>Important Note :</span> Input should be comma-spererated. (e.g. Marketing,Accounting,Developer, etc)</p>
                        </>
                    }
                    btnConfig={btnConfig}
                />
            </div>
            <div className="flex flex-wrap -mx-2 px-10 py-4">
                {
                    data?.skills?.map((skill, index) => {
                        return <div key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mr-2 mb-2">{skill}</div>
                    })
                }
            </div>
        </>
    )
}

export default Skills
