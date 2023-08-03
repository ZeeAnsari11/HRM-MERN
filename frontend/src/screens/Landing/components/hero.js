import Container from "./container";

const Hero = () => {
  return (
    <div className="px-8 tablet:px-2 pt-32">
      <Container className="flex flex-wrap h-full">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8 space-y-4 tablet:text-center">
            <h1 className="text-4xl font-bold leading-snug text-gray-700 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
            Unlock the Power of Nex-HR
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-lg xl:text-2xl">
            An HR system that automates complete HR operations support Integrations & guarantee speed without complexities
If you are here to automate your HR operations, Get a free trial & consultation that will save you time, money & boost your company's productivity 100% Guaranteed.
            </p>

            <div className="flex flex-col items-start tablet:items-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                target="_blank"
                rel="noopener"
                className={`px-8 py-4 text-lg font-medium text-center text-white bg-[#1567B1] rounded-md`}>
                Start a free trial
              </a>
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
      </Container>
    </div>
  );
}

export default Hero;