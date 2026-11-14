import { Heart, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <Heart size={30} />
                </div>

                <h1>Create Account</h1>
                <p>Register to manage your therapy practice.</p>

                <form>
                    <label>Full Name</label>
                    <div className="login-input">
                        <User size={18} />
                        <input type="text" placeholder="Enter your name" required />
                    </div>

                    <label>Email Address</label>
                    <div className="login-input">
                        <Mail size={18} />
                        <input type="email" placeholder="Enter your email" required />
                    </div>

                    <label>Password</label>
                    <div className="login-input">
                        <Lock size={18} />
                        <input type="password" placeholder="Create a password" required />
                    </div>

                    <button type="submit" className="login-button">
                        Create Account
                    </button>
                </form>

                <p className="login-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;