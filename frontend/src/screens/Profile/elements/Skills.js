import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Modal from '../../../components/Modal'

const Skills = ({ data }) => {
    const title = "Skills"
    const handleSubmit = (triiger) => {
        console.log("Clicked")
        triiger();
    }
    const btnConfig = [{
        title: 'Create',
        handler: handleSubmit,
    }]
    return (
        <>
            <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg">
                <h1 className="px-4 text-2xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={<h1>Hello</h1>}
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
