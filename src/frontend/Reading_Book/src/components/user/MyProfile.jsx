import React, { useState, useEffect } from 'react'
import SidebarAdmin from '../sidebar/SidebarAdmin'
import UserPage from '../userPage/UserPage';
import moment from 'moment';
import UserService from '../../service/UserService';

import "../sidebar/sidebar.css"
import "./styleUser.css"
import HeaderUser from '../../components/header/HeaderUser'

import { Outlet } from 'react-router-dom'
import axios from 'axios';

const url = 'https://ebook4u-server.onrender.com/user/me'


function Content(props) {
  const [listAccount, setList] = useState([]);


  useEffect(() => {


    UserService.getProfileUser().
      then(response => {
        setList(response.data.data)

      }).catch(err => {
      })


  }, [])

  return (
    <>
      <div>
        <div className="cardInfo">
          <div className="mainContentUser"  >
            <p className="text-sm mb-0 text-capitalize font-weight-bold text-center " style={{ marginLeft: "10px", fontSize: "30px", fontWeight: "bold" }}>
              My Profile
            </p>
            <div className="contentUserMain">
              <div>
                <img src={listAccount.avatar} alt="" height="250" width="200" style={{ marginTop: "5px", marginLeft: "50px", marginRight: "50px" }} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "15px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark" >
                    Username: {listAccount.fullname}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "15px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Address: {listAccount.address}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "15px" }} >
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Email: {listAccount.email}
                  </span>
                  <br />

                </h5>

                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "15px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Date of birth: {moment.utc(listAccount.dateOfBirth).format('DD/MM/YYYY')
                    }
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "15px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Phone: {listAccount.phone}
                  </span>
                  <br />

                </h5>
                <h5 className="font-weight-bolder mb-0" style={{ paddingBottom: "15px" }}>
                  <span className=" text-sm font-weight-bolder .text-dark">
                    Status: {listAccount.status}
                  </span>
                  <br />

                </h5>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

function MyProfile() {
  return (

    <div className="contentUser">
      <Content />

    </div>

  )
}

export default MyProfile
