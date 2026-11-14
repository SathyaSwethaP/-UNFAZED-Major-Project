import { Search, UserPlus, Users } from "lucide-react";

function Clients() {
    const clients = [
        { name: "Arun Kumar", email: "arun@gmail.com", phone: "9876543210", status: "Active" },
        { name: "Priya Sharma", email: "priya@gmail.com", phone: "9876543211", status: "Active" },
        { name: "Rahul Kumar", email: "rahul@gmail.com", phone: "9876543212", status: "Inactive" },
        { name: "Sneha R", email: "sneha@gmail.com", phone: "9876543213", status: "Active" }
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Client Management</h1>
                    <p>View and manage your clients.</p>
                </div>

                <button className="primary-btn">
                    <UserPlus size={18} />
                    Add Client
                </button>
            </div>

            <div className="content-card">
                <div className="card-header">
                    <div>
                        <h3>All Clients</h3>
                        <p>Manage your client information</p>
                    </div>

                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Search clients..." />
                    </div>
                </div>

                <div className="clients-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clients.map((client, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="client-name">
                                            <Users size={18} />
                                            {client.name}
                                        </div>
                                    </td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        <span className={`status ${client.status.toLowerCase()}`}>
                                            {client.status}
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

export default Clients;