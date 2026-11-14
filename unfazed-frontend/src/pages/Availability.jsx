import { Clock, CalendarDays } from "lucide-react";

function Availability() {
    const schedule = [
        { day: "Monday", time: "09:00 AM - 05:00 PM", status: "Available" },
        { day: "Tuesday", time: "09:00 AM - 05:00 PM", status: "Available" },
        { day: "Wednesday", time: "10:00 AM - 04:00 PM", status: "Available" },
        { day: "Thursday", time: "09:00 AM - 05:00 PM", status: "Available" },
        { day: "Friday", time: "09:00 AM - 03:00 PM", status: "Available" },
        { day: "Saturday", time: "Not Scheduled", status: "Unavailable" },
        { day: "Sunday", time: "Not Scheduled", status: "Unavailable" }
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Availability Management</h1>
                    <p>Manage your weekly working hours.</p>
                </div>

                <button className="primary-btn">
                    <CalendarDays size={18} />
                    Update Schedule
                </button>
            </div>

            <div className="content-card">
                <div className="card-header">
                    <div>
                        <h3>Weekly Availability</h3>
                        <p>Your regular working schedule</p>
                    </div>
                </div>

                <div className="appointment-list">
                    {schedule.map((item, index) => (
                        <div className="appointment-item" key={index}>
                            <div className="appointment-avatar">
                                <Clock size={21} />
                            </div>

                            <div className="appointment-details">
                                <h4>{item.day}</h4>
                                <p>{item.time}</p>
                            </div>

                            <span className={`status ${item.status.toLowerCase()}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Availability;