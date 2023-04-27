import React, { useState } from "react";
import Multistep from "./elements/Multistep";
import Forms from "./elements/Forms";
const User = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const changePageNumber = () => {
        setPageNumber(pageNumber+1);
    }
    return (
        <div className="min-h-screen p-6 flex justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Create Employee Form</h2>
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600 m-auto">
                                <Multistep index={pageNumber}/>
                            </div>
                            <Forms formNumber={pageNumber} changePageNumber={changePageNumber}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;