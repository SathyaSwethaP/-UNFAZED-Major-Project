import { CreditCard, IndianRupee, Wallet } from "lucide-react";

function Payments() {
    const payments = [
        { client: "Arun Kumar", amount: "₹2,000", date: "10 Nov 2026", method: "UPI", status: "Completed" },
        { client: "Priya Sharma", amount: "₹3,500", date: "11 Nov 2026", method: "Card", status: "Completed" },
        { client: "Rahul Kumar", amount: "₹1,500", date: "13 Nov 2026", method: "UPI", status: "Pending" },
        { client: "Sneha R", amount: "₹2,500", date: "14 Nov 2026", method: "Online", status: "Completed" }
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Payment Management</h1>
                    <p>Track client payments and transactions.</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon green">
                        <Wallet size={24} />
                    </div>
                    <p>Total Revenue</p>
                    <h2>₹45,000</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-icon blue">
                        <CreditCard size={24} />
                    </div>
                    <p>Completed Payments</p>
                    <h2>18</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        <IndianRupee size={24} />
                    </div>
                    <p>Pending Payments</p>
                    <h2>₹1,500</h2>
                </div>
            </div>

            <div className="content-card">
                <div className="card-header">
                    <div>
                        <h3>Recent Transactions</h3>
                        <p>Overview of client payments</p>
                    </div>
                </div>

                <div className="clients-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={index}>
                                    <td>{payment.client}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.method}</td>
                                    <td>
                                        <span className={`status ${payment.status.toLowerCase()}`}>
                                            {payment.status}
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

export default Payments;