import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function Paymentsuccess() {
  return (
    <>
        <Header/>
        <div className="container" style={{marginTop:'200px'}}>
            <div className="row flex justify-center items-center">
                <div className="col-md-6">
                    <h2 className='text-success'>Congratulation ! Your Payment is Successfull</h2>
                    <h4>Thank you for shopping with BookStore. We Hope You had a Good time with Us </h4>
                    <Link to={'/all-books'}><button className='btn btn-success mt-5 rounded-0'>Explore More Books</button></Link>
                </div>
                <div className="col-md-6">
                <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="no image" />

                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Paymentsuccess