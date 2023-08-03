import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigation = [
    "Features",
    "Services",
    "Gallery",
    "Blog",
  ];

  return (
    <div className="w-full backdrop-blur-lg fixed px-8 tablet:px-2 shadow-md">
      <nav className="container flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link to="/">
                      <img
                        src='https://nexius.ai/wp-content/uploads/2023/05/nexius-hghres.webp'
                        alt="N"
                        width="32"
                        height="32"
                        className="w-2/3"
                      />
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className={`px-2 ml-auto text-gray-500 rounded-md lg:hidden hover:text-[#1567B1] focus:text-[#1567B1] focus:outline-none`}>
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <a key={index} href="/" className={`w-full px-4 py-2 -ml-4 text-gray-500 rounded-md hover:text- focus:text-[#1567B1] focus:bg-indigo-100 focus:outline-none`}>
                          {item}
                      </a>
                    ))}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <a href="/" className={`inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md hover:text-[#1567B1] focus:text-[#1567B1] focus:bg-indigo-100 focus:outline-none`}>
                    {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link to="/welcome" className={`px-6 py-2 text-white bg-[#1567B1] rounded-md md:ml-5`}>
              Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
