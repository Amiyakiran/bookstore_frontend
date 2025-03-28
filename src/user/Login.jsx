import { faEye, faUser, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { googleLoginApi, loginApi, registerApi } from '../services/allApi';
import { jwtDecode } from "jwt-decode";




function Login({ Register }) {

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [eyeStatus, seteyeStatus] = useState(false)
  const [type, setType] = useState('password')
  const navigate = useNavigate()

  console.log(userDetails);

  const changeEye = (x) => {
    if (x == true) {
      seteyeStatus(true)
      setType('text')
    }
    else {
      seteyeStatus(false)
      setType('password')
    }
  }

  const handleRegister = async () => {
    const { username, password, email } = userDetails
    console.log(username, password, email);
    if (!username || !email || !password) {
      alert('Please fill the form completely')
    }
    else {
      const result = await registerApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        alert(result.data)
        navigate('/login')
      }
      else if (result.status == 406) {
        alert(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        alert('Something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }


  }

  const handleLogin = async () => {
    const { email, password } = userDetails

    if (!email || !password) {
      alert('please fill the form completely')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        alert('login successfull')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        sessionStorage.setItem("userDetails", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
          navigate('/admin-home')
        }
        else {
          navigate('/')
        }

      }
      else if (result.status >= 400 && result.status < 500) {
        alert(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        alert('Something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }

  }
  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    console.log(jwtDecode(credentialResponse.credential));
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);
    const result = await googleLoginApi({ username: details.name, email: details.email, password: "googlepswd", photo: details.picture })
    console.log(result);
    if (result.status == 200) {
      alert('login successfull')
      
      sessionStorage.setItem("userDetails", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)

      if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
        navigate('/admin-home')
      }
      else {
        navigate('/')
      }

    }
    else{
      alert('Something went wrong')
    }


  }




  return (
    <div className='container-fluid flex justify-center items-center w-full min-h-screen' id='loginBg'>
      <div className="row w-full">
        <h1 className='text-center mb-4 text-gray-800'>BOOK STORE</h1>
        {/* <h6 className='text-center mb-4 text-primary'>Explore Us Collections</h6> */}
        <div className="col-md-4">

        </div>
        <div className="col-md-4 bg-gray-800  rounded-2xl py-5 px-5 flex justify-center items-center flex-col">
          <div className='border border-amber-50 p-4 rounded-circle'>
            <FontAwesomeIcon icon={faUser} className='fa-3x text-amber-50' />
          </div>
          {!Register ? <h3 className='text-white my-3' >Login</h3> :
            <h3 className='text-white my-3' >Register</h3>
          }
          {Register && <div className="my-3 w-100">
            <input type="text" placeholder='Username' value={userDetails.username} className='form-control' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
          </div>}
          <div className="mb-3 w-100">
            <input type="email" placeholder='Email ID' value={userDetails.email} className='form-control' onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
          </div>
          <div className="mb-3 w-100">
            <div className='d-flex'>
              <input type={type} placeholder='Password' value={userDetails.password} className='form-control' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
              <span style={{ marginLeft: '-30px', marginTop: '8px' }}>
                {!eyeStatus ? <FontAwesomeIcon icon={faEye} className='text-gray-600' onClick={() => changeEye(true)} /> :
                  <FontAwesomeIcon icon={faEyeSlash} className='text-gray-600' onClick={() => changeEye(false)} />}
              </span>
            </div>
            <div className='d-flex justify-between mt-1'>
              <span className='text-warning' style={{ fontSize: '12px' }}>* Never share the password with others</span>
              {!Register && <span style={{ fontSize: '12px', textDecoration: 'underline' }} className='text-white'>Forget Password</span>}
            </div>
          </div>
          <div className="mb-3 w-100">
            {!Register ? <button className='btn btn-success w-100' onClick={handleLogin}>Login</button> :
              <button className='btn btn-success w-100' onClick={handleRegister} >Register</button>}
          </div>
          {!Register && <p className='text-amber-50'>------------------ or ------------------</p>}

          {!Register && <div className="mb-3 w-full ">
            <GoogleLogin  width={'500px'}
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                handleGoogleLogin(credentialResponse)
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>}
          <div>
            {!Register ? <p className='text-amber-50'>Are you a New User? <Link to={'/register'}> Register</Link> </p>
              : <p className='text-amber-50'>Are you a Already User? <Link to={'/login'}> Login</Link> </p>}
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}

export default Login