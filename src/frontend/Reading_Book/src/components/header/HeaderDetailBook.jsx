import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { jwt } from '../../service/authHeader'
import style from "../../style/header.css"

function header() {
    return (
        <>
            <div >




                <nav className="navbar navbar-expand-lg navbar-dark p-3 ">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Home</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ms-auto ">
                                <li className="nav-item">
                                    <Link onClick={profile} > My Favorite Book</Link>

                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>



            </div>
        </>
    )
}
const profile = () => {
    // logout()
    let jwts = jwt()
    if (jwts == "{}") window.location.href = "/login"
    else window.location.href = "/user/favorite"
}
export default header
