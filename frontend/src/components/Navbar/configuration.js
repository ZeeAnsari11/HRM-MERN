import { faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarPlus, faCalendarTimes, faCalendarWeek, faCediSign, faChartArea, faCircleDollarToSlot, faCodePullRequest, faCoffee, faFileAlt, faGear, faHome, faNetworkWired, faTimeline, faUser, faUserCircle, faUserClock, faUsers } from '@fortawesome/free-solid-svg-icons'

export const Menus = [
    { title: "Dashboard", access: "Admin", font:faHome, gap: true, child:[], to: "/dashboard/home"},
    {
        title: "Self Services",
        font: faUser,
        access: "Non-Admin",
        child: [
            { title: "Probation",    font:faUserClock, to:"/dashboard/probation" },
            { title: "Roaster",    font:faCalendarPlus, to:"/dashboard/roaster"},
            { title: "Chart",    font:faChartArea, to:"/dashboard/chart" },
            { title: "Loan & Advance",    font:faCircleDollarToSlot, to:"/dashboard/loan" },
        ] 
    },
    {
        title: "Assets",
        access:"Admin",
        font: faCalendarDay,
        child: [
            { title: "Add Asset", font: faCodePullRequest, to:"/dashboard/add-asset" },
            { title: "Manage Assets", font: faCalendarCheck, to:"/dashboard/manage-assets"},
            { title: "Asset Type", font: faCodePullRequest, to:"/dashboard/asset-type" },
        ]
    },
    { title: "Desiginations",access:"Admin", font: faCalendarCheck, child:[], to:"/dashboard/desiginations"  },
    { title: "Loan Type", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/loan-type"  },
    { title: "Departments", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/departments"  },
    { title: "Branches", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/branches"  },
    { title: "TimeSlots", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/timeSlots"  },

    {
        title: "Employee", 
        access:"Admin",
        font: faUsers,
        child: [
            { title: "Create Employee", font: faCalendarTimes, to:"/dashboard/employee" },
            { title: "View Employees", font: faFileAlt, to:"/dashboard/view-employees" },
        ]
    },
    {
        title: "Leave", 
        font: faCalendarWeek,
        child: [
            { access:"Admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Request Leave", font: faCodePullRequest, to:"/dashboard/leaverequest" },
            { title: "View Leaves", font: faCalendarCheck, to:"/dashboard/leaves"},
            { title: "Policy", font: faTimeline, to:"/dashboard/policy" },
        ]
    },
    {
        title: "Work From Home", 
        font: faCalendarWeek,
           
        child: [
            // { access:"Admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/wfh" },
            { title: "Request", font: faCalendarTimes, to:"/dashboard/wfh" },
            { title: "View WFH Requests", font: faFileAlt, to:"/dashboard/view-wfh" },
        ]
    },
    {
        title: "Attendence", 
        font: faCalendarWeek,
        child: [
            { title: "Time Sheet", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Attendence Request ", font: faFileAlt, to:"/dashboard/attendence-request" },
            { title: "View Attendece", font: faCalendarCheck, to:"/dashboard/attendence"},
        ]
    },

    { title: "Payslips", access:"Admin", font: faCircleDollarToSlot, child:[], to:"/dashboard/payslips"  },
    { title: "Allowances",access:"Admin", font: faCalendarCheck, child:[], to:"/dashboard/allowances"  },
    { title: "Profile ", font: faUserCircle, gap: true, child:[], to:"/dashboard/profile"},
    { title: "Settings", font: faGear, child:[], to:"/dashboard/settings" },
];
