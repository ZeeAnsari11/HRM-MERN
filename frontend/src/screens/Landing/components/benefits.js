import React from "react";
import benefitOneImg from "../../../assets/benefit-one.png";
import benefitTwoImg from "../../../assets/benefit-two.png";

const Benefits = (props) => {
  const { data } = props;
  return (
    <>
      <div className="max-w-screen-xl mx-auto flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap !px-8 tablet:px-2 mt-8">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 ${
            props.imgPos === "right" ? "lg:order-1" : ""
          }`}>
          <div>
            <img
              src={(props.imgPos === "right") ? benefitOneImg : benefitTwoImg}
              width="521"
              height="auto"
              alt="Benefits"
              className={"object-cover w-full"}
              placeholder="blur"
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 ${
            data.imgPos === "right" ? "lg:justify-end" : ""
          }`}>
          <div>
            <div className="flex flex-col w-full mt-4 tablet:text-center">
              <h3 className="max-w-2xl mt-3 font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight text-xl lg:text-4xl">
                {data.title}
              </h3>

              <p className="px-4 max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Benefit(props) {
  return (
    <>
      <div className="flex items-start mt-8 space-x-3 tablet:items-center">
        <div className={`flex items-center justify-center flex-shrink-0 mt-1 bg-[#1567B1] rounded-md w-11 h-11`}>
          {React.cloneElement(props.icon, {
            className: "w-7 h-7 text-indigo-50",
          })}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800">
            {props.title}
          </h4>
          <p className="mt-1 text-gray-500">
            {props.children}
          </p>
        </div>
      </div>
    </>
  );
}

export default Benefits;
