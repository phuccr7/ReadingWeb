


import React from 'react'
import { Component } from 'react'
import style from "../../style/header.css"

import { jwt, logout } from '../../service/authHeader';

import "../../style/header.css"
import { Link } from 'react-router-dom';
import down from "../../assets/imgs/downButton.png"

const LogoutAccount = () => {
    logout()
    window.location.href = "/login"
}

const profile = () => {
    // logout()
    let jwts = jwt()
    if (jwts == "{}") window.location.href = "/login"
    else window.location.href = "/user"
}
function header() {
    return (
        <>

            <div className='headerNew'>
                <div className='headerItemHome'>
                    <a
                        className="navbar-brand"
                        href="/"
                        onClick={() => {
                            localStorage.setItem("searchName", "");
                            localStorage.setItem("searchCategoryPage", "");
                            localStorage.setItem("searchCountryPage", "");
                            localStorage.setItem("currentPage", "1");
                            localStorage.setItem("currentPageSearch", "1");
                        }}
                    >
                        Home
                    </a> </div>
                <div className='headerItemProfile'>
                    <a
                        className="nav-link mx-2 active"
                        aria-current="page"
                        onClick={profile}
                        style={{ cursor: "pointer" }}
                    >
                        Profile
                    </a></div>
                {/* <div className='headerItemAbout'> AboutUs</div> */}
                <div className='headerItemAccount'>
                    <div className="dropdown">

                        <div className="dropdown__trigger">
                            Account
                            <img src={down} alt="down" style={{ "marginLeft": "10px" }} />
                        </div>
                        <div className="dropdown__content">
                            <Link to="/login"> Login</Link>
                            <Link onClick={LogoutAccount}> Logout</Link>
                        </div>

                    </div>
                </div>


            </div>
            <div className={"background"} style={{ "zIndex": "2" }}>
                <img src="https://storyshares.blob.core.windows.net/media/staff_pick/biddyweb.jpg" alt="book" />
            </div>
        </>
    )
}

export default header