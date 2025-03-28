import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEye, faBackward } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from 'react-router-dom'
import { getABookApi } from '../services/allApi'
import { serverUrl } from '../services/serverUrl'



function View() {
  const [show, setShow] = useState(false);
  const { id } = useParams()
/*   console.log(id); */
  const [bookDetails, setBookDetails] = useState([])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getABook = async (id) => {
    const result = await getABookApi(id)
//  console.log(result); 
   setBookDetails(result.data)

  }

  useEffect(() => {
    getABook(id)
  }, [])


  return (
    <>
      <Header />

      <div className='container mb-5 p-4 rounded-1 shadow' style={{ marginTop: '200px' }}>
        <div className="row">
          <div className="col-md-4">
            <img src= {bookDetails?.imageurl} alt="no image" className='w-100' style={{height:'500px'}} />
          </div>
          <div className="col-md-8 mt-5 mt-md-0 d-flex justify-content-center align-items-center flex-column px-5">
            <FontAwesomeIcon icon={faEye} onClick={handleShow} className='mb-3 mb-md-0 text-secondary ms-auto' />

            <Modal show={show} onHide={handleClose} size='md' centered>
              <Modal.Header closeButton className='bg-gray-900 text-white'>
                <Modal.Title>Book Photos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className='text-primary'><FontAwesomeIcon icon={faCamera} className='me-2' /> Camera click of the book in the hand of seller</p>
                <Carousel className='my-2 text-center' fade indicators={false} >
                 {
                  bookDetails?.uploadImages?.length>0? 
                  bookDetails?.uploadImages?.map((item , index)=>(
                    <Carousel.Item interval={1000} key={index} >
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                      <img src={`${serverUrl}/upload/${item}`} style={{ width: '100%', height: '450px' }} />

                    </div>
                  </Carousel.Item>
                  ))
                  
                  : <p>No image to dsiplay</p>
                 }
                
                </Carousel>
              </Modal.Body>

            </Modal>

            <h3 className='text-center'>{bookDetails?.title}</h3>
            <span className='text-primary mb-3'>- {bookDetails?.author}</span>

            <div className='d-md-flex justify-content-between w-100 my-md-3'>
              <p><b>Publisher</b> : {bookDetails?.publisher} </p>
              <p><b>Language</b> : {bookDetails?.language} </p>
              <p><b>No. of pages</b> : {bookDetails?.noOfPage} </p>
            </div>
            <div className='d-md-flex justify-content-between w-100 mb-3'>
              <p><b>Seller Mail</b> : {bookDetails?.userMail} </p>
              <p><b>Real Price</b> : $ {bookDetails?.price} </p>
              <p><b>ISBN</b> : {bookDetails?.isbn} </p>
            </div>

            <p className='text-justify'> {bookDetails?.abstract} </p>


            <div className=' mt-5 w-100 d-flex justify-end'>
              <button className='btn btn-primary '><FontAwesomeIcon icon={faBackward} className='me-2' /><Link to={'/all-books'} style={{ textDecoration: 'none', color: 'white' }}> Back </Link></button>
              <button className='btn btn-success  ms-3'>Buy $ {bookDetails?.discountPrice} </button>
            </div>

          </div>
        </div>

      </div>


      <Footer />
    </>
  )
}

export default View