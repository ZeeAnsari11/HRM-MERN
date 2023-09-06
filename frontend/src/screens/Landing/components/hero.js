import { Link } from "react-router-dom";
import myImage from '../../../assets/NexHr.webp'

const Hero = () => {
  return (
    <div className="px-8 tablet:px-2 mt-32 max-w-screen-xl mx-auto">
      <div className="flex flex-wrap h-full">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8 tablet:text-center">
            <div className="text-xl font-bold leading-snug text-gray-700 lg:leading-tight xl:leading-tight">
              Unlock the Power of
              <div className="flex items-center justify-center lg:justify-start">
                <img src={myImage} alt="nexius logo" className="w-[200px] tablet:w-[100px] tablet:my-4" />
              </div>
            </div>
            <p className="leading-normal text-gray-500 text-lg xl:text-xl pt-1">
              An HR system that automates complete HR operations support Integrations & guarantee speed without complexities
              If you are here to automate your HR operations, Get a free trial & consultation that will save you time, money & boost your company's productivity 100% Guaranteed.
            </p>

            <div className="flex mt-10 flex-col tablet:justify-center tablet:items-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                to='/welcome'
                target="_blank"
                rel="noopener"
                className={`px-5 py-2.5 text-lg font-medium text-center text-white bg-[#1567B1] rounded-md`}>
                Start a free trial
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <img
              src={"https://resourceinn.com/offers/hr-management-software/images/header/hr-software.png"}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;