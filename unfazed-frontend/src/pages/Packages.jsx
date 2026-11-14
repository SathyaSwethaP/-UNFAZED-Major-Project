import { Package, IndianRupee, Plus } from "lucide-react";

function Packages() {
    const packages = [
        { name: "Basic Therapy", sessions: 4, price: "₹2,000", duration: "1 Month", status: "Active" },
        { name: "Standard Therapy", sessions: 8, price: "₹3,500", duration: "2 Months", status: "Active" },
        { name: "Premium Therapy", sessions: 12, price: "₹5,000", duration: "3 Months", status: "Active" },
        { name: "Couple Therapy", sessions: 6, price: "₹4,000", duration: "2 Months", status: "Active" }
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Therapy Packages</h1>
                    <p>Manage your therapy plans and pricing.</p>
                </div>

                <button className="primary-btn">
                    <Plus size={18} />
                    Add Package
                </button>
            </div>

            <div className="stats-grid">
                {packages.map((item, index) => (
                    <div className="stat-card" key={index}>
                        <div className="stat-icon purple">
                            <Package size={24} />
                        </div>

                        <h3>{item.name}</h3>
                        <h2>{item.price}</h2>
                        <p>{item.sessions} Sessions</p>
                        <p>{item.duration}</p>

                        <span className="status active">{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Packages;