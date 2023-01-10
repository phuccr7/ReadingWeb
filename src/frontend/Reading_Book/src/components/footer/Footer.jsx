import React from "react";
import facebook from "../../assets/imgs/facebook.png";
import twitter from "../../assets/imgs/twitter.png";
import google from "../../assets/imgs/google.png";
import linkedin from "../../assets/imgs/linkedin.png";
import github from "../../assets/imgs/github.png";
import instagram from "../../assets/imgs/instagram.png";
import home from "../../assets/imgs/home.png";
import envelope from "../../assets/imgs/envelope.png";
import telephone from "../../assets/imgs/telephone.png";

// import "bootstrap/dist/css/bootstrap.css";

// import { Dropdown } from "bootstrap";
import "./footer.css";
import { jwt } from "../../service/authHeader";

function Footer() {
  return (
    <>
      <div
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#227C70" }}
      >
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  EBook4U
                </h6>
                <p>
                  We’re here to help you find new books and connect with other
                  readers. Our goal is to foster a community of avid readers who
                  want to learn more about the world while they enjoy books.
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful link
                </h6>
                <p>
                  <a className="text-white" href="/home">
                    Home
                  </a>
                </p>
                <p>
                  <span className="text-white" onClick={profile} style={{
                    "cursor": "pointer", "fontWeight": "600",
                    "fontFamily": 'Inter'
                  }}>
                    Your Account
                  </span>
                </p>
                <p>
                  <a className="text-white" href="/aboutus">
                    About Us
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  {" "}
                  <span>
                    <img src={home} className="icon1" alt="" />
                  </span>{" "}
                  HCM City, HCMUS
                </p>
                <p>
                  <span>
                    <img src={envelope} className="icon1" alt="" />
                  </span>{" "}
                  ebook4u@gmail.com
                </p>
                <p>
                  <span>
                    <img src={telephone} className="icon1" alt="" />
                  </span>{" "}
                  + 01 234 567 88
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
                </h6>

                <a href="https://www.facebook.com/">
                  <img className="icon" src={facebook} />
                </a>

                <a href="https://www.facebook.com/">
                  <img className="icon" src={twitter} />
                </a>

                <a href="https://www.facebook.com/">
                  <img className="icon" src={google} />
                </a>

                <a href="https://www.facebook.com/">
                  <img className="icon" src={instagram} />
                </a>
                <a href="https://www.facebook.com/">
                  <img className="icon" src={linkedin} />
                </a>
                <a href="https://www.facebook.com/">
                  <img className="icon" src={github} />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: " rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="https://ebooks4u.netlify.app/" style={{ "marginLeft": "10px" }}>
            Ebooks4u.netlify.app
          </a>
        </div>
      </div>
    </>
  );
}

const profile = () => {
  // logout()
  let jwts = jwt()
  if (jwts == "{}") window.location.href = "/login"
  else window.location.href = "/user"
}
export default Footer;
