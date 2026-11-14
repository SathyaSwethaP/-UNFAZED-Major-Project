import {
    Users,
    CalendarCheck,
    Wallet,
    Clock,
    ArrowUpRight,
    CalendarDays,
    UserRound
} from "lucide-react";

function Dashboard() {
    const statistics = [
        {
            title: "Total Clients",
            value: "120",
            change: "+12% this month",
            icon: Users,
            color: "purple"
        },
        {
            title: "Appointments",
            value: "28",
            change: "This month",
            icon: CalendarCheck,
            color: "blue"
        },
        {
            title: "Total Revenue",
            value: "₹45,000",
            change: "+8% this month",
            icon: Wallet,
            color: "green"
        },
        {
            title: "Pending Sessions",
            value: "08",
            change: "Needs attention",
            icon: Clock,
            color: "orange"
        }
    ];

    const appointments = [
        {
            name: "Arun Kumar",
            time: "10:00 AM",
            type: "Individual Therapy",
            status: "Confirmed"
        },
        {
            name: "Priya Sharma",
            time: "11:30 AM",
            type: "Follow-up Session",
            status: "Pending"
        },
        {
            name: "Rahul Kumar",
            time: "02:00 PM",
            type: "Online Consultation",
            status: "Confirmed"
        },
        {
            name: "Sneha R",
            time: "04:00 PM",
            type: "Individual Therapy",
            status: "Completed"
        }
    ];

    return (
        <div className="dashboard-page">

            <div className="welcome-section">
                <div>
                    <h1>Welcome back, Therapist! 👋</h1>
                    <p>Here's an overview of your practice today.</p>
                </div>

                <button className="primary-btn">
                    <CalendarDays size={18} />
                    View Schedule
                </button>
            </div>

            <div className="stats-grid">
                {statistics.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div className="stat-card" key={index}>
                            <div className={`stat-icon ${item.color}`}>
                                <Icon size={24} />
                            </div>

                            <p>{item.title}</p>
                            <h2>{item.value}</h2>

                            <span className="stat-change">
                                <ArrowUpRight size={15} />
                                {item.change}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-content">

                <div className="content-card appointments-card">
                    <div className="card-header">
                        <div>
                            <h3>Recent Appointments</h3>
                            <p>Overview of your appointments</p>
                        </div>

                        <button className="text-btn">
                            View All
                        </button>
                    </div>

                    <div className="appointment-list">
                        {appointments.map((appointment, index) => (
                            <div className="appointment-item" key={index}>
                                <div className="appointment-avatar">
                                    <UserRound size={22} />
                                </div>

                                <div className="appointment-details">
                                    <h4>{appointment.name}</h4>
                                    <p>{appointment.type}</p>
                                </div>

                                <div className="appointment-time">
                                    <p>{appointment.time}</p>
                                    <span className={`status ${appointment.status.toLowerCase()}`}>
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-card quick-card">
                    <h3>Quick Overview</h3>
                    <p>Manage your practice easily.</p>

                    <div className="quick-item">
                        <div className="quick-icon purple">
                            <Users size={21} />
                        </div>
                        <div>
                            <h4>Manage Clients</h4>
                            <p>View your client records</p>
                        </div>
                    </div>

                    <div className="quick-item">
                        <div className="quick-icon blue">
                            <CalendarCheck size={21} />
                        </div>
                        <div>
                            <h4>Appointments</h4>
                            <p>Manage your schedule</p>
                        </div>
                    </div>

                    <div className="quick-item">
                        <div className="quick-icon green">
                            <Wallet size={21} />
                        </div>
                        <div>
                            <h4>Payments</h4>
                            <p>Track your payments</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;