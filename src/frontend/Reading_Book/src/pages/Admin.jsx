import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import SidebarAdmin from '../components/sidebar/SidebarAdmin'
import { ReactDOM } from 'react'
import Dashboard from '../components/admin/Dashboard'
import HomeAdmin from '../components/sidebar/HomeAdmin'
import ManagerAccount from '../components/admin/ManagerAccount'
import ManagerBook from '../components/admin/ManagerBook'
import AuthAdmin from '../service/auth'
function Admin() {

    const load = async () => await AuthAdmin()
    load()

    return (


        <Routes>

            <Route path='/' element={<HomeAdmin />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path='account/*' element={<ManagerAccount />} />
                <Route path='book/*' element={<ManagerBook />} />
            </Route>

        </Routes>
    )




}

export default Admin
