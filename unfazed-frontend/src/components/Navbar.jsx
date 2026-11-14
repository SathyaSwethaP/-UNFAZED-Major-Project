import { Search, Bell, UserCircle } from "lucide-react";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <h2>Therapist Dashboard</h2>
                <p>Welcome back! Here's what's happening today.</p>
            </div>

            <div className="navbar-right">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search anything..." />
                </div>

                <button className="notification-btn">
                    <Bell size={21} />
                    <span></span>
                </button>

                <div className="profile-info">
                    <UserCircle size={38} />
                    <div>
                        <h4>Therapist</h4>
                        <p>Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;