import { faHome, faMessage, faUser, faCalendar, faSearch, faChartBar, faFolder, faGear } from '@fortawesome/free-solid-svg-icons'

export const configuration = {
    background: "#263871",
    textHead: "#9ba5ca",
    textColor: "white"
}

export const Menus = [
    { title: "Dashboard", font:faHome, gap: true },
    { title: "Inbox", font:faMessage },
    { title: "Accounts", font: faUser, gap: true },
    { title: "Schedule ", font: faCalendar },
    { title: "Search", font: faSearch },
    { title: "Analytics", font: faChartBar },
    { title: "Files ", font: faFolder, gap: true },
    { title: "Setting", font: faGear },
];