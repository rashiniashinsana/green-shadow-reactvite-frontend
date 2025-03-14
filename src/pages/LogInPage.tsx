import React, {useEffect, useState} from "react";
import "../css/LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/UserSlice";
import {RootState} from "../store/Store.ts";

const LogInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password || !role) {
            setError("Please fill in all fields");
            return;
        }

        if (!isTermsChecked) {
            setError("Please agree to the Terms, Privacy Policy, and Fees.");
            return;
        }

        try {
            dispatch(loginUser({ email, password }));
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            return;
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate]);


    return (
        <div className="signInContainer">
            <div className="boxContainer">
                <div className="formSection">
                    <h2 className="formTitle">SIGN IN</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                required
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                required
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                className="form-select"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="Manager">Manager</option> {/* Fixed the role mismatch */}
                            </select>
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                checked={isTermsChecked}
                                onChange={(e) => setIsTermsChecked(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="terms">I agree to the Terms, Privacy Policy, and Fees</label>
                        </div>
                        <button type="submit" className="signUp-btn btn btn-primary">Sign In</button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/register">Register Now.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
