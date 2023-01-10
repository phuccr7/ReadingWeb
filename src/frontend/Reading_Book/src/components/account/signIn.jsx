import React from "react";
import { Component } from "react";
import style from "../../style/header.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import headerUser from "../header/HeaderUser";
import bell from "../../assets/imgs/bell-solid.svg";
import chat from "../../assets/imgs/chat.svg";
import book from "../../assets/imgs/book.png";
import user from "../../assets/imgs/user2.png";
import "./account.css";
import $ from "jquery";
import { borderRadius } from "@mui/system";
import { useCallback, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHref, useNavigate } from "react-router-dom";

const notify = () =>
  toast("Wrong username or password!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notify1 = () =>
  toast("Please enter your account!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notify2 = () =>
  toast("Please enter your username!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notify3 = () =>
  toast("Please enter your password!!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const forgetPass = () => {
  let user = $("#inputLoginName").val();
  let pass = $("#inputLoginPass").val();
  if (user === "" ) {
    notify2();
    return;
  }
  
  let item = { information: user };
  fetch("https://ebook4u-server.onrender.com/auth/forget-password", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

function SignIn() {
  const [userName, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  async function login() {
    let item = { username: userName, password: password };
    fetch("https://ebook4u-server.onrender.com/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("user", data.accessToken);
          if (data?.admin) navigate("/admin");
          else navigate("/home");
        } else {
          notify();
        }
      })
      .catch((e) => {});
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

        <div className="signInForm">
          <center>
            <h1>Sign In</h1>
            <div>
              <input
                id="inputLoginName"
                placeholder="Username"
                type="text"
                name="name"
                style={{
                  marginTop: "30px",
                  width: "250px",
                  borderRadius: "5%",
                  height: "40px",
                }}
                required
                value={userName}
                onChange={onUsernameChange}
              />
            </div>
            <div>
              <input
                id="inputLoginPass"
                type="password"
                style={{
                  marginTop: "30px",
                  width: "250px",
                  borderRadius: "5%",
                  height: "40px",
                }}
                placeholder="Password"
                name="name"
                value={password}
                onChange={onPasswordChange}
                required
              />
            </div>

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <Link
                style={{
                  marginTop: "30px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  forgetPass();
                }}
              >
                Forget password?
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-success"
              style={{ marginTop: "20px" }}
              onClick={() => {
                let user = $("#inputLoginName").val();
                let pass = $("#inputLoginPass").val();
                if (user === "") {
                  notify2();
                  return;
                }
                else if (pass === "") {
                  notify3();
                  return;  
                }else{                login();
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
              <a className="link" href="/login/signup">
                New User? Sign Up
              </a>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default SignIn;
