import React from "react";

const Cta = () => {
  return (
    <div class="mt-8">
      <div className={`flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-[#1567B1] p-8 lg:flex-nowrap rounded-xl`}>
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl pb-2">
            Ready to try-out this application ?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-lg">
          Our HRMS has been thoughtfully designed to cater to all your HR needs, offering a comprehensive solution to streamline your HR processes and boost overall productivity. With its user-friendly interface and powerful features, you can look forward to a hassle-free HR management experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cta;