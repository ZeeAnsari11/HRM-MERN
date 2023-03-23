import { faHome, faMessage, faUser, faCalendar, faSearch, faFolder, faGear } from '@fortawesome/free-solid-svg-icons'

export const configuration = {
    background: "#263871",
    textHead: "#9ba5ca",
    textColor: "white"
}

export const Menus = [
    { title: "Dashboard", font:faHome, gap: true, child:[] },
    {
        title: "Self Services", 
        font:faMessage,
        child: [
            { title: "Probation", font:faHome },
            { title: "Roaster", font:faHome },
            { title: "Chart", font:faHome },
            { title: "Loan & Advance", font:faHome },
            { title: "Time Sheet", font:faHome },
        ] 
    },
    { 
        title: "Leaves", 
        font: faCalendar,
        child: [
            { title: "Request Leave", font: faCalendar },
            { title: "View Leaves", font: faCalendar },
            { title: "Policy", font: faCalendar },
        ]
    },
    { 
        title: "Attendence", 
        font: faUser,
        child: [
            { title: "Time Sheet", font: faCalendar },
            { title: "Attendence Request ", font: faCalendar },
            { title: "Work From Home", font: faCalendar },
        ]
    },

    { title: "Payslips", font: faSearch, child:[]  },
    { title: "Files ", font: faFolder, gap: true, child:[]},
    { title: "Settings", font: faGear, child:[] },
];