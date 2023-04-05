import { faHome, faUser, faGear, faTimeline, faChartArea, faCircleDollarToSlot, faCalendarDays, faCalendarDay, faCodePullRequest, faCalendarPlus, faCalendarWeek, faCalendarTimes, faFileAlt, faCalendarCheck, faUserClock, faNetworkWired, faUserCircle } from '@fortawesome/free-solid-svg-icons'

export const Menus = [
    { title: "Dashboard", font:faHome, gap: true, child:[], to: "/dashboard/home"},
    {
        title: "Self Services",
        font: faUser,
        child: [
            { title: "Probation", font:faUserClock, to:"/dashboard/probation" },
            { title: "Roaster", font:faCalendarPlus, to:"/dashboard/roaster"},
            { title: "Chart", font:faChartArea, to:"/dashboard/chart" },
            { title: "Loan & Advance", font:faCircleDollarToSlot, to:"/dashboard/loan" },
        ] 
    },
    {
        title: "Leaves", 
        font: faCalendarDay,
        child: [
            { title: "Request Leave", font: faCodePullRequest, to:"/dashboard/leaverequest" },
            { title: "View Leaves", font: faCalendarCheck, to:"/dashboard/leaves"},
            { title: "Policy", font: faTimeline, to:"/dashboard/policy" },
        ]
    },
    {
        title: "Attendence", 
        font: faCalendarWeek,
        child: [
            { title: "Time Sheet", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Attendence Request ", font: faFileAlt, to:"/dashboard/attendence" },
            { title: "Work From Home", font: faNetworkWired, to:"/dashboard/wfh" },
        ]
    },

    { title: "Payslips", font: faCircleDollarToSlot, child:[], to:"/dashboard/payslips"  },
    { title: "Profile ", font: faUserCircle, gap: true, child:[], to:"/dashboard/profile"},
    { title: "Settings", font: faGear, child:[], to:"/dashboard/settings" },
];