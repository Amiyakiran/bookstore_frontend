import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'




function Contact() {
  return (
    <>
    <Header/>
    <div style={{marginTop:'200px'}}>
         <div className="container my-5">
          <h2 className='text-center mb-5'>Contact Us</h2>
          <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione, officia delectus consequuntur, dicta libero magni omnis architecto voluptas culpa praesentium ipsum assumenda quae dolor, nihil rerum fugit expedita corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio maiores fuga, modi vel accusantium magnam ex, ratione saepe aliquam eius odit consequuntur earum, itaque nulla labore veritatis quis aut atque!</p>
            <div className="flex justify-between">
              <div className='d-flex align-items-center justify-content-center'>
                <div className="d-flex justify-content-center align-items-center bg-gray-200 text-gray-900" style={{width:'40px', height:'40px', borderRadius:'50%'}}>
                <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <p className='ms-3 mt-2'>123 Main Street, Apt 4B, <br /> Anytown, CA 91234</p>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <div className="d-flex justify-content-center align-items-center bg-gray-200 text-gray-900" style={{width:'40px', height:'40px', borderRadius:'50%'}}>
                <FontAwesomeIcon icon={faPhone} />
                </div>
                <p className='ms-3 mt-3'> +91 9874561230</p>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <div className="d-flex justify-content-center align-items-center bg-gray-200 text-gray-900" style={{width:'40px', height:'40px', borderRadius:'50%'}}>
                <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <p className='ms-3 mt-3'>Bookstore@gmail.com</p>
              </div>
            </div>

          <div className="row mt-5">
            <div className="col-md-6 px-5">

              <form className='p-4 shadow bg-gray-200'>
                <h4 className='text-center mb-4 text-gray-900'>Send me Message</h4>
                <div className="mb-3">
                  <input type="text" placeholder='Name' className='form-control' />
                </div>
                <div className="mb-3">
                <input type="text" placeholder='Email Id' className='form-control' />


                </div>
                <div className="mb-3">
                    <textarea name="" id="" className='form-control' placeholder='Message' rows={6} ></textarea>
                </div>
                <div className="mb-3">
                  <button className=' bg-gray-900 w-100 text-white p-3'>Send<FontAwesomeIcon icon={faPaperPlane} className="ms-3" /></button>
                </div>
              </form>

            </div>
            <div className="col-md-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.55832720463!2d76.30948095113635!3d10.008813464705796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1741808443236!5m2!1sen!2sin" width="100%" height="450" style={{border:0 }}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
         </div>
    </div>
    <Footer/>
        
    </>
  )
}

export default Contact