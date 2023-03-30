import React from 'react'

const Skeleton = () => {
    return (
        <>
            <div role="status" className="flex justify-between space-x-4 pb-4">
                <div className="animate-pulse h-24 border-2 rounded-md w-full">
                    <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
                        <div className="w-8 h-8 bg-lightText rounded-full">
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="h-4 bg-lightText rounded-md w-36 ">
                            </div>
                            <div className="w-24 h-4 bg-lightText rounded-md ">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse h-24 border-2 rounded-md w-full">
                    <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
                        <div className="w-8 h-8 bg-lightText rounded-full ">
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="h-4 bg-lightText rounded-md w-36 ">
                            </div>
                            <div className="w-24 h-4 bg-lightText rounded-md ">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse h-24 border-2 rounded-md w-full">
                    <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
                        <div className="w-8 h-8 bg-lightText rounded-full ">
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="h-4 bg-lightText rounded-md w-36 ">
                            </div>
                            <div className="w-24 h-4 bg-lightText rounded-md ">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse h-24 border-2 rounded-md w-full">
                    <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
                        <div className="w-8 h-8 bg-lightText rounded-full ">
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="h-4 bg-lightText rounded-md w-36 ">
                            </div>
                            <div className="w-24 h-4 bg-lightText rounded-md ">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-between space-x-4'>
                <div role="status" className="p-4 border w-1/2 rounded shadow animate-pulse md:p-6">
                    <div className="h-2.5 bg-lightText rounded-full w-32 mb-2.5"></div>
                    <div className="w-48 h-2 mb-10 bg-lightText rounded-full"></div>
                    <div className="flex items-baseline mt-4 space-x-6">
                        <div className="w-full bg-lightText rounded-t-lg h-72"></div>
                        <div className="w-full h-56 bg-lightText rounded-t-lg"></div>
                        <div className="w-full bg-lightText rounded-t-lg h-72"></div>
                        <div className="w-full h-64 bg-lightText rounded-t-lg"></div>
                        <div className="w-full bg-lightText rounded-t-lg h-80"></div>
                        <div className="w-full bg-lightText rounded-t-lg h-72"></div>
                        <div className="w-full bg-lightText rounded-t-lg h-80"></div>
                    </div>
                </div>
                <div role="status" className="w-1/2 p-4 space-y-4 border divide-y divide-gray-200 rounded shadow animate-pulse">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-2.5 bg-lightText rounded-full w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-lightText rounded-full"></div>
                        </div>
                        <div className="h-2.5 bg-lightText rounded-full w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-lightText rounded-full w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-lightText rounded-full"></div>
                        </div>
                        <div className="h-2.5 bg-lightText rounded-full w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-lightText rounded-full w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-lightText rounded-full"></div>
                        </div>
                        <div className="h-2.5 bg-lightText rounded-full w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-lightText rounded-full w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-lightText rounded-full"></div>
                        </div>
                        <div className="h-2.5 bg-lightText rounded-full w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-lightText rounded-full w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-lightText rounded-full"></div>
                        </div>
                        <div className="h-2.5 bg-lightText rounded-full w-12"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Skeleton
