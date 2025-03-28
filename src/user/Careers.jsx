import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { applyJobApi, getAllJobsApi } from '../services/allApi';




function Careers() {

    const [show, setShow] = useState(false);
    const [allJobs, setallJobs] = useState([])
    const [searchKey, setsearchKey] = useState("")
    const [applicationDetails, setapplicationDetails] = useState({
        fullname: "",
        qualification: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: ""
    })
    console.log(applicationDetails);
    const [token, settoken] = useState("")
    const [jobTitle, setJobTitle] = useState("")

    const handleClose = () => {setShow(false);
        handleReset()
    }
    const handleShow = (title) =>{ setShow(true);
        setJobTitle(title);
     
    }
    const handleReset = () => {
        setapplicationDetails({
            fullname: "",
            qualification: "",
            email: "",
            phone: "",
            coverLetter: "",
            resume: ""
        })
        //modern browsers are not allowing to set a value attribute to type file for input tag , so they are manually changed
        //The reason for this error is that, for security reasons, modern browsers do not allow setting a file input's value to anything other than the empty string ("") via JavaScript. This prevents potential abuse where a script could change the file selection without the user's consent.
        document.getElementById('fileInput').value = ""
    }

    const getAllJobs = async () => {
        const result = await getAllJobsApi(searchKey)
        setallJobs(result.data)
    }
    // console.log(allJobs);

    const handleApply = async () => {
         console.log(jobTitle);
        const { fullname, qualification, email, phone, coverLetter, resume } = applicationDetails
        console.log(fullname, qualification, email, phone, coverLetter, resume);
        if (!fullname || !qualification || !email || !phone || !coverLetter || !resume) {
            alert('Please fill the form completely')
        }
        else {

            const reqBody = new FormData()
            /* for(let key in applicationDetails){
                reqBody.append(key, applicationDetails[key])
            } */
            reqBody.append("fullname", fullname)
            reqBody.append("qualification", qualification)
            reqBody.append("email", email)
            reqBody.append("phone", phone)
            reqBody.append("resume", resume)
            reqBody.append("coverLetter", coverLetter)
            reqBody.append("jobTitle", jobTitle)
            


         


                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
               


                const result = await applyJobApi(reqBody, reqHeader)
                console.log(result);
                if(result.status==200){
                    alert('Congratulation! Your Application is Submited')
                    handleClose()
                }
                else if(result.status==406){
                    alert(result.response.data)
                    handleReset()
                }
                else{
                    alert('Something went wrong')
                    handleReset()
                }
            

        }



    }


    useEffect(() => {
        getAllJobs()
    }, [searchKey])


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            settoken(sessionStorage.getItem("token"))
        }

    }, [])

    return (
        <>
            <Header />

            <div style={{ marginTop: '200px' }} className='container'>
                <h1 className='text-center'>Careers</h1>
                <p className='mt-5 text-justify'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem ratione earum distinctio ducimus architecto non natus culpa ullam modi, totam officiis autem hic nulla debitis id quaerat pariatur illum placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium aperiam repellat incidunt placeat commodi repudiandae debitis earum dolore? Inventore voluptate natus ipsam quo alias? Qui minima earum deserunt cupiditate ipsam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur perspiciatis similique provident eos sed voluptatum ab totam nemo, aspernatur impedit odio ea vitae, accusantium commodi laudantium repellat, praesentium repellendus! Ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi minus rerum quis accusamus fugit animi totam saepe obcaecati nemo error odit porro, iusto maxime nesciunt ipsa sequi corporis deserunt.
                </p>
            </div>
            <div className="container mt-5">
                <h3>Current Openings</h3>

                <div className='d-flex mt-5 container px-5 justify-center'>
                    <input type="text" placeholder='Job Title' className='form-control rounded-0 w-50' onChange={(e) => setsearchKey(e.target.value)} />
                    <button className='btn btn-success rounded-0'>Search</button>
                </div>

                <div className="row my-4" >
                    {
                        allJobs?.length > 0 ?
                            allJobs.map((item, index) => (
                                <div className="col-12 mt-4" id='career' key={index}>
                                    <Card style={{ width: '100%' }} className='shadow rounded-0 border-0 p-4'>
                                        <Card.Body>
                                            <div className="row">
                                                <div className="col-9">
                                                    <h5>{item?.title}</h5>
                                                    <hr />
                                                    <p><FontAwesomeIcon icon={faLocationDot} className='text-primary me-3' />{item?.location}</p>

                                                    <p>Job Type: {item?.type} </p>
                                                    <p>Salary: {item?.salary} </p>
                                                    <p>Qualification: {item?.qualification} </p>
                                                    <p>Experience: {item?.experience} </p>
                                                </div>
                                                <div className="col-3 text-center">
                                                    <button className='btn btn-primary' onClick={()=>handleShow(item?.title)}>Apply<FontAwesomeIcon icon={faArrowUpRightFromSquare} className='ms-2' /></button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p>Description : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, officiis voluptate ullam laboriosam possimus voluptatibus excepturi minus consequuntur architecto esse animi quo recusandae culpa ut rerum nemo libero, odit alias.</p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    {/* modal */}
                                    <Modal show={show} onHide={handleClose} size='md' centered >
                                        <Modal.Header closeButton className='bg-gray-900 text-white'>
                                            <Modal.Title>Application form</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className='mb-3'>
                                                            <input type="text" value={applicationDetails.fullname} placeholder='Full name' className='form-control' onChange={(e) => setapplicationDetails({ ...applicationDetails, fullname: e.target.value })} />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <input type="text" value={applicationDetails.email} placeholder='Email Id' className='form-control' onChange={(e) => setapplicationDetails({ ...applicationDetails, email: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className='mb-3'>
                                                            <input type="text" value={applicationDetails.qualification} placeholder='Qualification' className='form-control' onChange={(e) => setapplicationDetails({ ...applicationDetails, qualification: e.target.value })} />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <input type="text" value={applicationDetails.phone} placeholder='Phone' className='form-control' onChange={(e) => setapplicationDetails({ ...applicationDetails, phone: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className='mb-3'>
                                                        <textarea value={applicationDetails.coverLetter} placeholder='cover letter' className='form-control' onChange={(e) => setapplicationDetails({ ...applicationDetails, coverLetter: e.target.value })}></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        {/* <label htmlFor="">Resume</label> <br />  */}
                                                        <input type="file" className='form-control' id='fileInput' onChange={(e) => setapplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleReset}>
                                                Reset
                                            </Button>
                                            <Button variant="primary" onClick={handleApply}>
                                                Submit
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            )) :
                            <p>No Job Opening Right Now</p>




                    }
                </div>




            </div>

            <Footer />


        </>
    )
}

export default Careers