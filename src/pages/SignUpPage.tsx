import React, { useState } from "react";
import "../css/SignupPage.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

        console.log("Registered Successfully!", { email, password });
    };

    return (
        <div className="signUpContainer">
            <div className="boxContainer">
                <div className="infoSection">
                    <h1 className="welcomeTitle">WELCOME</h1>
                    <h2 className="companyName">Green Shadow (Pvt) Ltd</h2>
                    <p className="tagline">Shaping Tomorrow with Innovation and Integrity</p>
                    <p className="infoText">
                        Join us today and be part of a journey driven by innovation and trust.
                    </p>
                </div>
                <div className="formSection">
                    <h2 className="formTitle">SIGN UP</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                required
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                required
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                checked={isTermsChecked}
                                onChange={(e) => setIsTermsChecked(e.target.checked)}
                            />
                            <label htmlFor="terms" id="checkBox-label">
                                I agree to all Terms, Privacy Policy, and Fees.
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="btn-container">
                            <Link to="/" className="text-link text-success fw-bold">
                                <button type="submit" className="signUp-btn btn btn-primary">
                                    Sign Up
                                </button>
                            </Link>


                        <p className="mt-3 text-center">
                                Already have an account?{" "}
                                <Link to="/" className="text-link text-success fw-bold">
                                    Sign In Now.
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
