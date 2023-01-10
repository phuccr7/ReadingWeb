import React from "react";
import "./aboutus.css"
import Header from "../header/HeaderUser";
import Footer from "../footer/Footer";


function AboutUs() {
  return (
    <div>
        <Header/>
    <div>
        <div className="about-section">
          <h1>About Us</h1>
          <p>We are Group 8 and we develope reading books website.</p>
        </div>
        <h2 style={{textAlign: 'center'}}>Our Team</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="container">
                <h2 style={{height:"75px", marginTop:"10px"}}>Triệu Quốc Thái</h2>
                
                <p className="title">Developer</p>
                <p>Email:  <br/> tqthai1852@gmail.com</p>

                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="container">
                <h2 style={{ marginTop:"10px"}}>Lê Trương Kinh Thành</h2>
                <p className="title">Developer</p>
                <p>Email: letruongkinhthanh@gmail.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="container">
                <h2 style={{height:"75px", marginTop:"10px"}}>Vũ Hoàng Phúc</h2>
                <p className="title">Leader &amp; Designer</p>
                <p>Email: <br/>phuc9a134@gmail.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="container">
                <h2 style={{height:"75px", marginTop:"10px"}}>Trương Văn Hào</h2>
                <p className="title">Developer</p>
                <p>Email: truongvanhao159@gmail.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="container">
                <h2 style={{height:"75px", marginTop:"10px"}}>Trần Văn Thật</h2>
                <p className="title">Developer</p>
                <p>Email: <br/> thathnt16@gmail.com</p>
                <p><button className="button">Contact</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default AboutUs;
