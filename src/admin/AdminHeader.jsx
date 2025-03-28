import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {  faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminHeader() {
  return (
    <>
       <Navbar className=" p-3">
               <Container>
                 <Navbar.Brand className='text-gray-800'>
                   <img
                     alt=""
                     src="https://openclipart.org/download/275692/1489798288.svg"
                     width="30"
                     height="30"
                     className="d-inline-block align-top me-3"
                   />
                   BOOK STORE
                 </Navbar.Brand>
       
               </Container>
               <button className='btn btn-outline-dark'><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
             </Navbar>
             <marquee behavior="" direction="left" scrollamount={5} className="bg-gray-800 p-1">
               <p className='text-white'>Welcome,  Admin! <span className='ms-5'>You're all set to manage and monitor the system. Let’s get to work!</span>
       
               </p>
             </marquee> 
    </>
  )
}

export default AdminHeader