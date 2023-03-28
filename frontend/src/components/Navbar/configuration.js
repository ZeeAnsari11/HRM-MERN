import { faHome, faUser, faFolder, faGear, faTimeline, faChartArea, faCircleDollarToSlot, faCalendarDays, faCalendarDay, faCodePullRequest, faCalendarPlus, faCalendarWeek, faCalendarTimes, faFileAlt, faCalendarCheck, faUserClock, faNetworkWired } from '@fortawesome/free-solid-svg-icons'

export const Menus = [
    { title: "Dashboard", font:faHome, gap: true, child:[] },
    {
        title: "Self Services", 
        font: faUser,
        child: [
            { title: "Probation", font:faUserClock },
            { title: "Roaster", font: faCalendarPlus },
            { title: "Chart", font:faChartArea },
            { title: "Loan & Advance", font:faCircleDollarToSlot },
            { title: "Time Sheet", font:faCalendarDays },
        ] 
    },
    {
        title: "Leaves", 
        font: faCalendarDay,
        child: [
            { title: "Request Leave", font: faCodePullRequest },
            { title: "View Leaves", font: faCalendarCheck },
            { title: "Policy", font: faTimeline },
        ]
    },
    {
        title: "Attendence", 
        font: faCalendarWeek,
        child: [
            { title: "Time Sheet", font: faCalendarTimes },
            { title: "Attendence Request ", font: faFileAlt },
            { title: "Work From Home", font: faNetworkWired },
        ]
    },

    { title: "Payslips", font: faCircleDollarToSlot, child:[]  },
    { title: "Files ", font: faFolder, gap: true, child:[]},
    { title: "Settings", font: faGear, child:[] },
];