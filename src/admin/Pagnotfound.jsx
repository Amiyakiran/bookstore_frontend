import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Pagnotfound() {
    const [userMail , setUserMail] = useState("")
    useEffect(()=>{
        if(sessionStorage.getItem("userDetails")){
         const user = JSON.parse(sessionStorage.getItem("userDetails"))
         setUserMail(user.email)
        }

    },[])
  return (
    <div className='container-fluid flex justify-center items-center' style={{height:'100vh'}}>
        <div className="row w-100">
            <div className="col-md-4"></div>
            <div className="col-md-4 flex justify-center items-center flex-col">
                <img src="https://cdn.dribbble.com/userupload/24278108/file/original-78d5a175341b5698c5e82e902ff801a6.gif" alt="no image" className='w-100' />
                <h5>Oh No !</h5>
                <h1>Look Like You're Lost</h1>
                <p>The page you are looking for is not available</p>
                <Link to={userMail == "bookstoreadmin@gmail.com"?'/admin-home':'/'}><button className='btn btn-primary py-3 px-5 mt-3'>BACK HOME</button></Link>
            </div>
            <div className="col-md-4"></div>
        </div>
        
    </div>
  )
}

export default Pagnotfound