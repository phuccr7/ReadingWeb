import React from "react";
import { Component } from "react";
import style from "../../style/header.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import headerUser from "../header/HeaderUser";

import book from "../../assets/imgs/book.png";
import "./account.css";
import { borderRadius } from "@mui/system";
import { useCallback, useState, useEffect } from "react";

function ForgetPass() {
    const [email, setEmail] = useState("");
    const onEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    return (
        <>
            <div className="bg_image">
                <nav className="navbar navbar-expand-lg navbar-dark p-3 ">
                    <div className="container-fluid">
                        <img className="book" src={book} alt="" />
                        <a className="navbar-brand" href="/home">
                            EBook4U
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ms-auto ">
                                
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="forgetPass">
                    <center>
                        <h1>Reset Password</h1>
                        <p style={{ marginTop: "20px", color: "blue" }}>
                            Enter your registered email to retrieve your password
                            <br />
                            We will send your password to that email
                        </p>
                        <div>
                            <input
                                id="inputLogin"
                                placeholder="Email"
                                name="name"
                                style={{
                                    marginTop: "30px",
                                    width: "250px",
                                    borderRadius: "5%",
                                    height: "40px",
                                }}
                                value={email}
                                onChange={onEmailChange}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-success"
                            style={{ marginTop: "20px" }}
                        >
                            SUBMIT
                        </button>
                        <div
                            style={{
                                marginTop: "30px",
                            }}
                        >
                            <a
                                style={{
                                    marginTop: "30px",
                                }}
                                href="/login/SignIn"
                            >
                                Recieved an email? Sign In?
                            </a>
                        </div>

                        <div
                            style={{
                                marginTop: "10px",
                            }}
                        >
                            <a className="link" href="#top">
                                Haven't recieved an email? Resend?
                            </a>
                        </div>
                    </center>
                </div>
            </div>
        </>
    );
}

export default ForgetPass;