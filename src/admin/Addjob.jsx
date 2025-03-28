import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addJobApi } from '../services/allApi';
import { addJobStatusContext } from '../context/Contextshare';
import { ToastContainer, toast } from 'react-toastify';

function Addjob() {
  const [show, setShow] = useState(false);
  const [jobDetails, setjobDetails] = useState({
    jobId: "",
    title: "",
    location: "",
    type: "",
    salary: "",
    qualification: "",
    experience: "",
    description: ""

  })
  // console.log(jobDetails);
  const {addJobStatus , setAddJobStatus} = useContext(addJobStatusContext)


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to reset the form
  const handleJobReset = () => {
    setjobDetails({
      jobId: "",
      title: "",
      location: "",
      type: "",
      salary: "",
      qualification: "",
      experience: "",
      description: ""
    })
  }

  //function to add job
  const handleAddJob = async()=>{
    const { jobId ,title,location,type,salary,qualification,experience,description} = jobDetails
    if( !jobId || !title||  !location || !type || !salary || !qualification || !experience || !description){
      toast.info('Please fill the fields completely')
    }
    else{
      const result = await addJobApi(jobDetails)
      // console.log(result);
      if(result.status==200){
        setAddJobStatus(result.data)
        toast.success('Job Role Added successfully')
        handleJobReset()
        setShow(false)
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        handleJobReset()
      }
      else{
        toast.error('Something went wrong')
        handleJobReset()
      }
      
    }
  }
  return (
    <>
      <button className='btn btn-outline-primary rounded-0 ' onClick={handleShow} >Add Job</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='bg-gray-900 text-white'>
          <Modal.Title >Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=' p-3'>
            <div className="mb-3">
              <input type="text" value={jobDetails.jobId} placeholder='Job ID' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, jobId: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" value={jobDetails.title} placeholder='Job Title' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, title: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" value={jobDetails.location} placeholder='Location' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, location: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" value={jobDetails.type} placeholder='Job Type' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, type: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" value={jobDetails.salary} placeholder='Salary' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, salary: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" value={jobDetails.qualification} placeholder='Qualification' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, qualification: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" value={jobDetails.experience} placeholder='Experience' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, experience: e.target.value })} />
            </div>
            <div className="mb-3">
              <textarea type="text" value={jobDetails.description} placeholder='Description' className='form-control' onChange={(e) => setjobDetails({ ...jobDetails, description: e.target.value })} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleJobReset}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddJob}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Addjob