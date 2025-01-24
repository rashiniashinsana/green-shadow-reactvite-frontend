import React, { useState } from "react";
import "../css/LoginPage.css";
import { Link } from "react-router-dom";
import "../assets/gs logo 1.png";

const LogInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        if (!isTermsChecked) {
            alert("Please agree to the Terms, Privacy Policy, and Fees.");
            return;
        }

        console.log("Logged In Successfully!", { email, password });
    };

    return (
        <div className="signInContainer">
            <div className="boxContainer">
                <div className="infoSection">
                    <h1 className="welcomeTitle">WELCOME</h1>
                    <h2 className="companyName">Green Shadow (Pvt) Ltd</h2>
                    <p className="tagline">Shaping Tomorrow with Innovation and Integrity</p>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p className="infoText">
                        Experience the ease and innovation of our service, crafted to provide you with
                        the utmost convenience and satisfaction.
                    </p>
                </div>
                <div className="formSection">
                    <h2 className="formTitle">SIGN IN</h2>
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

                        <div className="btn-container">
                            <Link to="/home" className="text-link text-success fw-bold">
                            <button type="submit" className="signUp-btn btn btn-primary">
                                 Sign In
                            </button>
                            </Link>
                            <p className="mt-3 text-center">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-link text-success fw-bold">Register Now.</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
