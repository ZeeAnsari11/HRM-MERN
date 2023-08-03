import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75">
                    <span>{item.question}</span>
                    <FontAwesomeIcon icon={faChevronDown}
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-[#1567B1]`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "What is a Human Resource Management System (HRMS)?",
    answer: "A Human Resource Management System (HRMS) is a comprehensive software solution designed to streamline and automate various HR processes within an organization. It facilitates efficient management of employee data, recruitment, onboarding, attendance, payroll, performance evaluation, and other essential HR functions.",
  },
  {
    question: "How can an HRMS benefit my organization?",
    answer: "Implementing an HRMS can bring numerous benefits to your organization. It enhances operational efficiency, reduces paperwork, minimizes errors, and allows HR personnel to focus on strategic tasks. With improved data accuracy and accessibility, HRMS empowers better decision-making and fosters employee satisfaction.",
  },
  {
    question: "Is the HRMS system secure and compliant with data protection regulations?",
    answer: "Yes, the HRMS system prioritizes data security and compliance with relevant data protection regulations. We employ robust encryption protocols and access controls to safeguard sensitive employee information, ensuring it remains confidential and protected from unauthorized access.",
  },
  {
    question: "Can the HRMS be customized to meet our specific HR needs?",
    answer: "Absolutely! Our HRMS is designed to be flexible and customizable. We understand that each organization has unique HR requirements, and our system can be tailored to align with your specific workflows, policies, and business processes.",
  },
  {
    question: "How user-friendly is the HRMS system?",
    answer: "Our HRMS is designed with a user-friendly interface, making it easy for HR personnel and employees to navigate and use. We strive to provide an intuitive experience that requires minimal training, enabling swift adoption across your organization.",
  },
  {
    question: "Does the HRMS support employee self-service features?",
    answer: "Yes, the HRMS incorporates employee self-service functionalities, empowering your workforce to manage personal information, leave requests, attendance, and access important HR-related documents without the need for manual intervention.",
  },
  {
    question: "Can the HRMS system integrate with other tools and software we use?",
    answer: "We understand the importance of seamless integration. Our HRMS system is built to integrate with a variety of third-party applications, such as payroll software, time and attendance systems, and performance management tools, to optimize HR processes and data exchange.",
  },
  {
    question: "Is the HRMS system scalable as our organization grows?",
    answer: "Absolutely! Our HRMS system is designed to scale along with your organization's growth. Whether you have a small business or a large enterprise, our system can accommodate your expanding HR needs without compromising performance.",
  },
];

export default Faq;