import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';



function Footer() {
    return (
        <>
            <div className='container-fluid bg-gray-800 text-white p-5'>
                <div className="row">
                    <div className="col-md-4">
                        <h4>ABOUT US</h4>
                        <p style={{ textAlign: 'justify' }} className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo itaque necessitatibus quas nobis, illum voluptate, pariatur recusandae alias harum!</p>
                    </div>
                    <div className="col-md-4 d-flex justify-center">
                        <div >
                            <h4>NEWSLETTER</h4>
                            <p className='mt-4'>Stay updated with our latest trends</p>
                            <div className="d-flex">
                                <input type="text" className='form-control rounded-0 w-100' placeholder='Email' />
                                <button className='btn rounded-0 btn-warning'><FontAwesomeIcon icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4>FOLLOW US</h4>
                        <p className='mt-3'>Let us be social</p>
                        <div>
                            <FontAwesomeIcon icon={faInstagram} className='me-3' />
                            <FontAwesomeIcon icon={faXTwitter} className='mx-3' />
                            <FontAwesomeIcon icon={faFacebook} className='mx-3' />
                            <FontAwesomeIcon icon={faLinkedin} className='mx-3' />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-fluid bg-black flex items-center justify-center p-4">
           
            <p className='text-amber-100'> Copyright ©  2023 All rights reserved   |   This website is made with <FontAwesomeIcon icon={faHeart} className='text-warning' />   by Amiya kiran </p>
            </div>
        </>
    )
}

export default Footer