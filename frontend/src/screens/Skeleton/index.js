import React from 'react'

const Skeleton = () => {
    return (
        <>
            <div role="status" className="grid grid-cols-1 py-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Dashboard Elements */}
                <div class="flex-1 rounded-md p-6 shadow">
                    <div class="mb-3 flex items-center justify-between">
                        <div class="inline-flex items-center rounded-full border border-red-500 bg-red-500 px-3 py-1 text-xs capitalize leading-none text-white">
                            <span class="mr-1 inline-flex h-4 w-4 items-center justify-center"
                            ><svg viewBox="0 0 24 24" width="14" height="14" class="inline-block"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path></svg>
                            </span>
                            <span>12%</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">Absents</h3>
                            <h1 class="text-3xl font-semibold leading-tight"><div>2</div></h1>
                        </div>
                        <span class="inline-flex h-16 items-center justify-center text-red-500"
                        ><svg viewBox="0 0 24 24" width="48" height="48" class="inline-block"><path fill="currentColor" d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"></path>
                        </svg></span>
                    </div>
                </div>

                <div class="flex-1 rounded-md p-6 shadow">
                    <div class="mb-3 flex items-center justify-between">
                        <div class="inline-flex items-center rounded-full border border-yellow-500 bg-yellow-500 px-3 py-1 text-xs capitalize leading-none text-white">
                            <span class="mr-1 inline-flex h-4 w-4 items-center justify-center"
                            ><svg viewBox="0 0 24 24" width="14" height="14" class="inline-block"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path></svg></span
                            ><span>12%</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">Missing Punches</h3>
                            <h1 class="text-3xl font-semibold leading-tight"><div>4</div></h1>
                        </div>
                        <span class="inline-flex h-16 items-center justify-center text-yellow-500"
                        ><svg viewBox="0 0 24 24" width="48" height="48" class="inline-block"><path fill="currentColor" d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"></path></svg
                        ></span>
                    </div>
                </div>

                <div class="flex-1 rounded-md p-6 shadow">
                    <div class="mb-3 flex items-center justify-between">
                        <div class="inline-flex items-center rounded-full border border-emerald-500 bg-emerald-500 px-3 py-1 text-xs capitalize leading-none text-white">
                            <span class="mr-1 inline-flex h-4 w-4 items-center justify-center"
                            ><svg viewBox="0 0 24 24" width="14" height="14" class="inline-block"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path></svg></span
                            ><span>12%</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">Leaves</h3>
                            <h1 class="text-3xl font-semibold leading-tight"><div>0</div></h1>
                        </div>
                        <span class="inline-flex h-16 items-center justify-center text-emerald-500"
                        ><svg viewBox="0 0 24 24" width="48" height="48" class="inline-block"><path fill="currentColor" d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"></path></svg
                        ></span>
                    </div>
                </div>

                <div class="flex-1 rounded-md p-6 shadow">
                    <div class="mb-3 flex items-center justify-between">
                        <div class="inline-flex items-center rounded-full border border-blue-500 bg-blue-500 px-3 py-1 text-xs capitalize leading-none text-white">
                            <span class="mr-1 inline-flex h-4 w-4 items-center justify-center"
                            ><svg viewBox="0 0 24 24" width="14" height="14" class="inline-block"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path></svg></span
                            ><span>12%</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">Present</h3>
                            <h1 class="text-3xl font-semibold leading-tight"><div>15</div></h1>
                        </div>
                        <span class="inline-flex h-16 items-center justify-center text-blue-500"
                        ><svg viewBox="0 0 24 24" width="48" height="48" class="inline-block"><path fill="currentColor" d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"></path></svg
                        ></span>
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
