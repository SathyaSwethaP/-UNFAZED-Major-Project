import { CalendarDays, Plus, Clock } from "lucide-react";

function Appointments() {
    const appointments = [
        { name: "Arun Kumar", date: "14 Nov 2026", time: "10:00 AM", type: "Individual Therapy", status: "Confirmed" },
        { name: "Priya Sharma", date: "14 Nov 2026", time: "11:30 AM", type: "Follow-up Session", status: "Pending" },
        { name: "Rahul Kumar", date: "15 Nov 2026", time: "02:00 PM", type: "Online Consultation", status: "Confirmed" },
        { name: "Sneha R", date: "16 Nov 2026", time: "04:00 PM", type: "Individual Therapy", status: "Completed" }
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Appointments</h1>
                    <p>Schedule and manage your therapy sessions.</p>
                </div>

                <button className="primary-btn">
                    <Plus size={18} />
                    Add Appointment
                </button>
            </div>

            <div className="content-card">
                <div className="card-header">
                    <div>
                        <h3>All Appointments</h3>
                        <p>Upcoming and previous sessions</p>
                    </div>
                </div>

                <div className="clients-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Session Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.date}</td>
                                    <td>
                                        <Clock size={15} style={{ verticalAlign: "middle" }} />
                                        {" "}{appointment.time}
                                    </td>
                                    <td>{appointment.type}</td>
                                    <td>
                                        <span className={`status ${appointment.status.toLowerCase()}`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Appointments;