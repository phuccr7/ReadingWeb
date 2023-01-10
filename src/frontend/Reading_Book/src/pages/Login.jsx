import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "../components/account/signUp";
import SignIn from "../components/account/signIn";
import ForgetPass from "../components/account/forgetPass";

function Login() {
    return (
        <Routes>
            <Route exact path="/" element={<SignIn />}></Route>
            <Route exact path="/signin" element={<SignIn />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/forgetpass" element={<ForgetPass />}></Route>
        </Routes>
    );
}
export default Login;