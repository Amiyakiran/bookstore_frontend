import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff, faUserTie, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { serverUrl } from '../services/serverUrl';
import { updateUserDetailsContext } from '../context/Contextshare';


function Header() {

  const [token, setToken] = useState("")
  const navigate = useNavigate()
  /* console.log(token); */
  const [existingImage, setexistingImage] = useState("")
  const { editProfile } = useContext(updateUserDetailsContext)


  const handlelogout = ()=>{
    sessionStorage.removeItem("userDetails")
    sessionStorage.removeItem("token")
    navigate('/')
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("userDetails"))
      
        setexistingImage(user.photo)
      
      
    }
  }, [editProfile])

  return (
    <div className='fixed-top'>
      <div className='container-fluid p-md-2 p-4 bg-white'>
        <div className='row '>
          <div className="col-md-4 flex items-center">
            <img src="https://openclipart.org/download/275692/1489798288.svg" alt="logo" style={{ width: '50px', height: '50px' }} className='ms-5' />
            <h1 className='d-md-none ms-3 fs-1' >BOOK STORE</h1>
          </div>
          <div className="col-md-4 d-flex items-center justify-center">
            <h1 className='d-none d-md-flex'>BOOK STORE</h1>
          </div>
          <div className="col-md-4 d-md-flex justify-content-center justify-content-md-end align-items-center d-none ">
            <FontAwesomeIcon icon={faInstagram} className='mx-3' />
            <FontAwesomeIcon icon={faXTwitter} className='mx-3' />
            <FontAwesomeIcon icon={faFacebook} className='mx-3' />
            {!token ? <Link to={'/login'}> <button className='btn btn-outline-dark ms-3'> <FontAwesomeIcon icon={faUserTie} /> Login</button></Link> :

              <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='d-flex justify-content-center align-items-center  border-0 text-white'>
                  <img src={existingImage ? existingImage.startsWith('http')?`${existingImage}`: `${serverUrl}/upload/${existingImage}` : 'https://cdn-icons-png.freepik.com/512/8742/8742495.png'} alt="profile photo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} className='me-2' />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {/* <Link to={'/profile'} style={{ textDecoration: 'none' }} > */}
                    <Dropdown.Item onClick={()=>navigate('/profile')} >
                      <FontAwesomeIcon icon={faAddressCard} className='mx-3 ' /> Profile
                    </Dropdown.Item>
                  {/* </Link> */}
                  <Dropdown.Item onClick={handlelogout}>
                    <FontAwesomeIcon icon={faPowerOff} className='mx-3 ' /> Logout
                  </Dropdown.Item>
                  {/* <Dropdown.Item  to={'/profile'} >
                  <FontAwesomeIcon icon={faAddressCard} className='mx-3 ' /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item   >
                  <FontAwesomeIcon icon={faPowerOff} className='mx-3 ' /> Logout
                  </Dropdown.Item> */}

                </Dropdown.Menu>
              </Dropdown>}


          </div>



        </div>
      </div>
      <Nav className="justify-content-center bg-gray-800 p-md-3 text-white" >
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Nav.Item>
            <p className='text-white pt-2 mx-4'>Home</p>
          </Nav.Item>
        </Link >
        <Link to={'/all-books'} style={{ textDecoration: 'none' }}>
          <Nav.Item>
            <p className='text-white  pt-2  mx-4'>Books</p>
          </Nav.Item>
        </Link>


       
        <Link to={'/careers'} style={{ textDecoration: 'none' }}>
          <Nav.Item>
            <p className='text-white  pt-2  mx-4'>Careers</p>
          </Nav.Item>
        </Link >
        <Link to={'/contact'} style={{ textDecoration: 'none' }}>
          <Nav.Item>
            <p className='text-white pt-2  mx-4'>
              Contact
            </p>
          </Nav.Item>
        </Link>
      </Nav>
    </div>
  )
}

export default Header