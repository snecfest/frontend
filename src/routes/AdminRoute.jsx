import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AdminHome from '../pages/admin/AdminHome'
const AdminRoute = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/admin' element={<AdminHome />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AdminRoute
