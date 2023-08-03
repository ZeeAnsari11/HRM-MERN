import { faChartBar, faGlobeAsia, faGrinBeam, faMobile, faSmile, faSun } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const benefitOne = {
  title: "Highlight your benefits",
  desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
  bullets: [
    {
      title: "Understand your customers",
      desc: "Then explain the first point breifly in one or two lines.",
      icon: <FontAwesomeIcon icon={faSmile}/>,
    },
    {
      title: "Improve acquisition",
      desc: "Here you can add the next benefit point.",
      icon: <FontAwesomeIcon icon={faChartBar}/>,
    },
    {
      title: "Drive customer retention",
      desc: "This will be your last bullet point in this section.",
      icon: <FontAwesomeIcon icon={faGrinBeam}/>,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "A good HRMS ensures that your company is in legal compliance with corporate, international, or local laws. You can automatically update policies to support legality and ensure all information is stored securely. ",
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "NexHR is designed as a mobile first responsive template.",
      icon: <FontAwesomeIcon icon={faMobile}/>,
    },
    {
      title: "Powered by MERN",
      desc: "This template is powered by latest technologies and tools.",
      icon: <FontAwesomeIcon icon={faGlobeAsia}/>,
    },
    {
      title: "Dark & Light Mode",
      desc: "NexHR comes with a zero-config light & dark mode. ",
      icon: <FontAwesomeIcon icon={faSun}/>,
    },
  ],
};


export {benefitOne, benefitTwo};
