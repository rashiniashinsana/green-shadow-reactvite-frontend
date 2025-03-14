import React, { useState } from "react";
import "../css/SignupPage.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {addUser} from "../reducers/UserSlice.tsx";

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!isTermsChecked) {
            alert("Please agree to the Terms, Privacy Policy, and Fees.");
            return;
        }

        dispatch(addUser({ email, password, role }));
        alert("Registered Successfully!");
        navigate("/"); // Redirect to login page after successful signup
    };

    return (
        <div className="signUpContainer">
            <div className="boxContainer">
                <div className="formSection">
                    <h2 className="formTitle">SIGN UP</h2>
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
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                required
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                required
                                className="form-select"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                checked={isTermsChecked}
                                onChange={(e) => setIsTermsChecked(e.target.checked)}
                            />
                            <label htmlFor="terms">I agree to all Terms, Privacy Policy, and Fees.</label>
                        </div>
                        <button type="submit" className="signUp-btn btn btn-primary">Sign Up</button>
                    </form>
                    <p className="mt-3 text-center">
                        Already have an account? <Link to="/">Sign In Now.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
