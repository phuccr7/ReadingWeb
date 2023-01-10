
import React from "react";
import { Component } from "react";
import style from "../../style/header.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import headerUser from "../header/HeaderUser";
import $ from "jquery";
import book from "../../assets/imgs/book.png";
import "./account.css";
import { borderRadius } from "@mui/system";
import { useCallback, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHref, useNavigate } from "react-router-dom";

function notify(str) {
  toast(str, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}
const notify1 = () =>
  toast("Please enter all fields!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
function isEmailAddress(str) {


  console.log(str.match(pattern));
  return str.match(pattern);

}

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [birthday, setBirthday] = useState("");

  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substring(0,10);

  async function register() {
    let item = {
      username: userName,
      password: password,
      email: email,
      retypePassword: confPass,
      fullname: name,
      dateOfBirth: birthday,
    };
    fetch("https://ebook4u-server.onrender.com/auth/register", {
      method: "post",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((Response) => Response.json())

      .then(async (result) => {
        //console.log(result);
        if (result.success) navigate("/login")
        else {
          notify(result.message);
        }



      })

      .catch((error) => { })

      ;
  }

  return (
    <>
      <div className="bg_image">
        <ToastContainer />

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
              <ul className="navbar-nav ms-auto "></ul>
            </div>
          </div>
        </nav>

        <div className="signUpForm">
          <center>
            <h1>Sign Up</h1>

            <div className="row" style={{ margintop: "30px" }}>
              <div className="col_half">
                <input
                  type="text"
                  style={{
                    width: "200px",
                    borderRadius: "5%",
                    height: "40px",
                  }}
                  name="name"
                  id="registerFormEmail"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col_half">
                <input
                  type="text"
                  name="name"
                  id="registerFormName"
                  style={{
                    width: "200px",
                    borderRadius: "5%",
                    height: "40px",
                  }}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col_half">
                <input
                  type="text"
                  style={{
                    width: "200px",
                    borderRadius: "5%",
                    height: "40px",
                  }}
                  id="registerFormUsername"
                  name="name"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col_half">
                <label style={{ marginRight: "15px" }} for="birthday">Birthday:</label>
                <input
                  type="date"
                  style={{
                    width: "120px",
                    borderRadius: "5%",
                    height: "40px",

                  }}
                  id="registerFormDate"
                  name="name"
                  placeholder="Day of birth"
                  defaultValue={date}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col_half">
                <input
                  type="password"
                  style={{
                    width: "200px",
                    borderRadius: "5%",
                    height: "40px",
                  }}
                  name="name"
                  id="registerFormPass"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col_half">
                <input
                  type="password"
                  name="name"
                  style={{
                    width: "200px",
                    borderRadius: "5%",
                    height: "40px",
                  }}
                  id="registerFormPass2"
                  placeholder="Confirm password"
                  onChange={(e) => setConfPass(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row"></div>

            <button
              type="button"
              className="btn btn-success"
              style={{ marginTop: "30px" }}
              onClick={() => {
                let name = $("#registerFormName").val();
                let un = $("#registerFormUsername").val();
                let email = $("#registerFormEmail").val();
                let birthday = $("#registerFormDate").val();
                let pass = $("#registerFormPass").val();
                let pass2 = $("#registerFormPass2").val();

                if (
                  name === "" ||
                  un === "" ||
                  email === "" ||
                  birthday === "" ||
                  pass === "" ||
                  pass2 === ""
                ) {
                  notify1();
                  return;
                }
                else if (pass !== pass2) {
                  notify("Confirm password does not match password!!!");
                  return;
                }
                else if (!isEmailAddress(email)) {
                  notify("Invalid email!!!");
                  return;
                }
                else {
                  register();
                }
              }}
            >
              SIGN
            </button>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <a href="/login/signin">Have an account? Sign In?</a>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default Signup;