import React, { useContext, useEffect } from 'react'
import { faBars, faBook, faBriefcase, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { serverUrl } from '../services/serverUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminProfileUpdateContext } from '../context/Contextshare';


function Adminsidebar() {
      const navigate = useNavigate()
    const [status, setStatus] = useState(false)
     const [existingAdminImage, setExistingAdminImage] = useState("")
     const [HomeCheck , setHomeCheck] = useState(true)
     const [careerCheck , setCareerCheck] = useState(false)
     const [bookCheck , setbookCheck] = useState(false)
     const [settingCheck , setSettingCheck] = useState(false)
     const location = useLocation()
     const {adminProfileStatus} = useContext(adminProfileUpdateContext)

    const filter = (data) => {
        if (data == 'allBooks') {
          navigate('/allbook-admin')
        }
        else if (data == 'Home') {
          navigate('/admin-home')

        }
       
        else if (data == 'Careers') {
          navigate('/careers-admin')

        }
        else if (data == 'settings') {
          navigate('/admin-setting')

        }
        else {
          console.log('*');
    
        }
      }

      useEffect(()=>{
        if (sessionStorage.getItem("userDetails")) {
           
            const user = JSON.parse(sessionStorage.getItem("userDetails"))
            console.log(user);
            
            setExistingAdminImage(user.photo)
          }
          console.log(existingAdminImage);
          
      
        /*   console.log(location.pathname); */
        if(location.pathname == '/admin-home'){
          setHomeCheck(true); setbookCheck(false);setCareerCheck(false);setSettingCheck(false)

        }
        else if(location.pathname == '/allbook-admin'){
          setHomeCheck(false); setbookCheck(true);setCareerCheck(false);setSettingCheck(false)

        }
        else if(location.pathname=='/careers-admin'){
          setHomeCheck(false); setbookCheck(false);setCareerCheck(true);setSettingCheck(false)

        }
        else if(location.pathname == '/admin-setting'){
          setHomeCheck(false); setbookCheck(false);setCareerCheck(false);setSettingCheck(true)

        }
        else{
          console.log('No page');
          
        }
          

      },[adminProfileStatus])
    return (
        <>

            <img src={existingAdminImage ? `${serverUrl}/upload/${existingAdminImage}` : "https://cdn-icons-png.freepik.com/512/8742/8742495.png"} alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} className='mt-5' />

            <h4 className='my-3'>Username</h4>
            <div className='mb-5'>
                <FontAwesomeIcon className='d-md-none fa-2x text-blue-900' icon={faBars} onClick={() => { setStatus(!status) }} />
                <div className={` ${status ? 'd-block mt-4' : 'mt-4 d-md-block d-none'}`} >
                    <div className='mb-3'>
                        <input type="radio" id='Home' name='filter' onClick={() => filter('Home')} checked={HomeCheck} readOnly />
                        <label htmlFor="Home" className='ms-3'><FontAwesomeIcon icon={faBook} className='me-3' />Home</label>
                    </div>
                    <div className='mb-3'>
                        <input type="radio" id='allBooks' name='filter' onClick={() => filter('allBooks')}  checked={bookCheck} readOnly />
                        <label htmlFor="allBooks" className='ms-3'><FontAwesomeIcon icon={faBook} className='me-3' />All Books</label>
                    </div>
                   
                    <div className='mb-3'>
                        <input type="radio" id='Careers' name='filter' onClick={() => filter('Careers')}  checked={careerCheck} readOnly />
                        <label htmlFor="Careers" className='ms-3'><FontAwesomeIcon icon={faBriefcase} className='me-3' />Careers</label>
                    </div>
                    <div className='mb-3'>
                        <input type="radio" id='settings' name='filter' onClick={() => filter('settings')} checked={settingCheck} readOnly />
                        <label htmlFor="settings" className='ms-3'><FontAwesomeIcon icon={faGear} className='me-3' />settings</label>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Adminsidebar