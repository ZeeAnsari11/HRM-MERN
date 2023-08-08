import React from 'react';

function NotFound({description, header}) {
  return (
    <section className="bg-white">
      <div className="container flex items-center px-2 sm:px-6 py-4 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center p-4">
          <p className="p-2 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </p>
          <h1 className="mt-2 text-xl font-semibold text-gray-800 md:text-2xl">{header}</h1>
          <p className="mt-3 text-gray-500 text-sm">{description}</p>

          {/* <div className="flex items-center w-full mt-4 gap-x-2 shrink-0 sm:w-auto">
            <button className="flex items-center justify-center w-1/2 px-3 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-1 sm:w-auto hover:bg-gray-100 dark:text-gray-200"
             onClick={closeModal}   
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
              <span>Go back</span>
            </button>
            <button className="w-1/2 px-3 py-1 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
              Take me home
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default NotFound;
