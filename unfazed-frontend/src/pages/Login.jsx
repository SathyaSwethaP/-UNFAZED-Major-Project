import { Heart, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <Heart size={30} />
                </div>

                <h1>Welcome to UNFAZED</h1>
                <p>Sign in to manage your therapy practice.</p>

                <form>
                    <label>Email Address</label>
                    <div className="login-input">
                        <Mail size={18} />
                        <input type="email" placeholder="Enter your email" required />
                    </div>

                    <label>Password</label>
                    <div className="login-input">
                        <Lock size={18} />
                        <input type="password" placeholder="Enter your password" required />
                    </div>

                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>

                <p className="login-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;