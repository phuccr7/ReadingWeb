import React from 'react'
import SidebarAdmin from './SidebarAdmin'
import "./homeAdmin.css"
import HeaderAdmin from '../../components/header/HeaderAdmin'
import HeaderUser from '../../components/header/HeaderUser'
import { Outlet } from 'react-router-dom'
function HomeAdmin() {
    return (
        <div className='homeAdminAll'>
            {/* <HeaderUser /> */}
            <HeaderAdmin />
            <div className='homeAdmin'>


                <div className='sidebarAdmin' >

                    <SidebarAdmin />
                </div>
                <div className="contentAdmin">

                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default HomeAdmin
