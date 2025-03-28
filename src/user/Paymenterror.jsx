import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function Paymenterror() {
  return (
    <>
         <Header/>
        <div className="container" style={{marginTop:'200px'}}>
            <div className="row flex justify-center items-center">
                <div className="col-md-6">
                    <h2 className='text-danger'>Sorry ! Your Payment is not Successfull</h2>
                    <h4>We apologize for any inconvenience caused and appreciate your visit to BookStore.  </h4>
                    <Link to={'/all-books'}><button className='btn btn-success mt-5 rounded-0'>Explore More Books</button></Link>
                </div>
                <div className="col-md-6">
                <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="no image" className='w-100' />

                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Paymenterror