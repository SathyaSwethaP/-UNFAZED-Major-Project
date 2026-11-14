import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CalendarDays,
    Clock,
    Package,
    FileText,
    CreditCard,
    LogOut,
    Heart
} from "lucide-react";

function Sidebar() {
    const menuItems = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Clients", path: "/clients", icon: Users },
        { name: "Appointments", path: "/appointments", icon: CalendarDays },
        { name: "Availability", path: "/availability", icon: Clock },
        { name: "Packages", path: "/packages", icon: Package },
        { name: "Clinical Notes", path: "/clinical-notes", icon: FileText },
        { name: "Payments", path: "/payments", icon: CreditCard }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <Heart size={23} />
                </div>
                <h2>UNFAZED</h2>
            </div>

            <p className="menu-heading">MAIN MENU</p>

            <nav className="sidebar-menu">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                isActive ? "menu-link active" : "menu-link"
                            }
                        >
                            <Icon size={19} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-bottom">
                <NavLink to="/login" className="menu-link">
                    <LogOut size={19} />
                    <span>Logout</span>
                </NavLink>
            </div>
        </aside>
    );
}

export default Sidebar;