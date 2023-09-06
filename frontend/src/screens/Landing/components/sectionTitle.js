import React from "react";

const SectionTitle = (props) => {
  return (
    <div
      className={`flex w-full flex-col ${
        props.align === "left" ? "" : "items-center justify-center text-center mt-16"
      }`}>
      {props.pretitle && (
        <div className="text-sm font-bold tracking-wider text-[#1567B1] uppercase">
          {props.pretitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-2xl mt-3 font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight text-xl lg:text-4xl">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="px-4 max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
          {props.children}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;