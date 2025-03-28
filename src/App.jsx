import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './user/Home'
import Login from './user/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import Preloader from './user/Preloader'
import View from './user/View'
import Allbooks from './user/Allbooks';
import Contact from './user/Contact';
import Careers from './user/Careers';
import Profile from './user/Profile';
import Adhome from './admin/Adhome';

import AllBooksAdmin from './admin/AllBooksAdmin'
import AdminCareers from './admin/AdminCareers';
import Setting from './admin/Settings'
import Pagenotfound from './admin/Pagnotfound'
import Paymentsuccess from './user/Paymentsuccess';
import Paymenterror from './user/Paymenterror';


function App() {

 const [isLoading , setIsLoading] = useState(false)

  useEffect(()=>{
      setTimeout(()=>{
         setIsLoading(true)
      },7500)
  },[])
 

  return (
    <>
      <Routes>
        <Route path='/' element={isLoading ?<Home/>:<Preloader/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Login Register={true} />} />
        <Route path='/all-books' element={<Allbooks />} />
        <Route path='/view-book/:id' element={<View />} />
        <Route path='/careers' element={<Careers/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin-home' element={isLoading ?<Adhome />:<Preloader/>} />
        <Route path='/allbook-admin' element={<AllBooksAdmin/>} />
        <Route path='/careers-admin' element={<AdminCareers />} />
        <Route path='/admin-setting' element={<Setting />} />
        <Route path='/payment-success' element={<Paymentsuccess />} />
        <Route path='/payment-error' element={<Paymenterror />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App
