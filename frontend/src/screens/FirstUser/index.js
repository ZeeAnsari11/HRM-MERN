import React, { useState } from "react";
import Image from '../../assets/placer.svg'
import Forms from "./elements/Forms";

const FirstUser = () => {
    const [page, setPage] = useState(1);
    
    const handleNextPage = () => {
        setPage(page+1);
    }
    const handlePrevPage = () => {
        setPage(page-1);
    }
    
  return (
    <section className="w-screen mx-auto bg-cover bg-[url(https://static.vecteezy.com/system/resources/previews/008/171/873/original/abstract-boxes-background-modern-technology-with-square-mesh-geometric-on-white-background-with-lines-cube-cell-illustration-free-vector.jpg)]">
      <div className="flex justify-center items-center bg-white bg-opacity-[0.85] h-screen md:flex-row flex-col p-5">
        <div className="flex justify-center items-center tablet:hidden">
            <img src={Image} loading="lazy" alt="banner" className="w-1/2"/>
        </div>
        <div className="md:w-1/2 flex flex-col items-center justify-center h-96">
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6">
              Lets Create Your Account
            </h2>

            <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
              Please fill in the details to start your organization
            </p>
          </div>
          <div className="w-full text-gray-600">
            <div className="container flex flex-col px-5 tablet: py-4">
              <div className="flex flex-wrap tablet:mx-0 mx-auto">
                <div className={`flex items-center justify-center w-1/3 py-3 font-medium leading-none tracking-wider ${page === 1 ? 'text-indigo-500 bg-gray-100 border-indigo-500' : ''} ${page > 1 ? 'text-green-500 border-green-500' : ''} rounded-t border-b-2 sm:px-6 sm:w-auto sm:justify-start title-font`}>
                  STEP 1
                </div>
                <div className={`inline-flex items-center justify-center w-1/3 py-3 font-medium leading-none tracking-wider ${page === 2 ? 'text-indigo-500 bg-gray-100 border-indigo-500' : ''} ${page > 2 ? 'text-green-500 border-green-500' : ''} border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font hover:text-gray-900`}>
                  STEP 2
                </div>
                <div className={`inline-flex items-center justify-center w-1/3 py-3 font-medium leading-none tracking-wider ${page === 3 ? 'text-indigo-500 bg-gray-100 border-indigo-500' : ''} border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start title-font hover:text-gray-900`}>
                  STEP 3
                </div>
              </div>
              <div className="flex flex-col tablet:w-fill text-center">
                <div className="py-6 sm:py-8 lg:py-12">
                  <Forms page={page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstUser;
