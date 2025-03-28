import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../user/Footer';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { faLocationDot, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Addjob from './Addjob';
import { deleteJobApi, getAllApplicationApi, getAllJobsApi } from '../services/allApi';
import { addJobStatusContext } from '../context/Contextshare';
import Adminsidebar from './Adminsidebar';
import { serverUrl } from '../services/serverUrl';


function AdminCareers() {


  const [tabStatus, setTabStatus] = useState(1)
  const [key, setKey] = useState('tab1');
  const [allJob, setallJob] = useState([])
  const { addJobStatus } = useContext(addJobStatusContext)
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [searchKey , setSearchKey] = useState("")
  const [allApplication , setAllApplication]= useState([])




  const handleTabSelect = (key) => {
    setKey(key);
    if (key == 'Job_Post') {
      setTabStatus(1)
    }
    else {
      setTabStatus(2)
      getAllApplication()
    }

  };

  const getAllJobs = async () => {
    const result = await getAllJobsApi(searchKey)
    setallJob(result.data);


  }
  // console.log(allJob);

  const handleDeleteJob = async (id) => {
    const result = await deleteJobApi(id)
    console.log(result);
    if (result.status == 200) {
      setDeleteStatus(!deleteStatus)
    }

  }

  const getAllApplication = async()=>{
    const result = await getAllApplicationApi(searchKey)
    // console.log(result);
    setAllApplication(result.data)
    
  }


  useEffect(() => {
    getAllJobs()
    getAllApplication()
  }, [addJobStatus, deleteStatus ,searchKey])

  return (
    <>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-blue-50 flex  flex-col items-center">
          
            <Adminsidebar/>

          </div>
          <div className="col-md-9">

            <h4 className='text-center mt-3'>Careers</h4>


            <div className='my-5 flex justify-center items-center '>
              <Tabs
                defaultActiveKey="Job_Post"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleTabSelect}
              >
                <Tab eventKey="Job_Post" title="Job Post" ></Tab>
                <Tab eventKey="Applicant" title="View Applicant" ></Tab>

              </Tabs>
            </div>


            <div className='d-flex justify-between mt-4 px-md-5 px-3'>
              <div className='d-flex'>
                <input type="text" placeholder='Job Title' className='form-control rounded-0' onChange={(e)=>setSearchKey(e.target.value)} />
                <button className='btn btn-success rounded-0'>Search</button>
              </div>

              {tabStatus == 1 && <Addjob />}
            </div>


            {/* Job added */}
            {tabStatus == 1 && <div className='row mt-3 px-3 px-md-5'>
              {
                allJob?.length > 0 ?
                  allJob?.map((item, index) => (
                    <div className="col-12 my-4" key={index}>
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
                              <button className='btn btn-danger' onClick={() => handleDeleteJob(item?._id)}>Delete<FontAwesomeIcon icon={faTrashCan} className='ms-2' /></button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <p>Description : {item?.description} </p>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  )) :
                  <p className='text-danger'>No Job Added Yet</p>
              }

            </div>}
            {/* applicant */}
            {tabStatus == 2 && <div className='table-responsive p-md-5 px-3 py-4'>
              {
                allApplication?.length>0?
                <table className='table table-bordered my-3 shadow'>
                <thead>
                  <tr>
                    <th className='p-3 text-center bg-primary text-white'>Sl</th>
                    <th className='p-3 text-center bg-primary text-white'>Job Title</th>
                    <th className='p-3 text-center bg-primary text-white'>Name</th>
                    <th className='p-3 text-center bg-primary text-white'>Qualification</th>
                    <th className='p-3 text-center bg-primary text-white'>Email</th>
                    <th className='p-3 text-center bg-primary text-white'>Phone</th>
                    <th className='p-3 text-center bg-primary text-white'>Cover letter</th>
                    <th className='p-3 text-center bg-primary text-white'>Resume</th>
                  </tr>
                </thead>
                <tbody>
                 {
                  allApplication?.map((item, index)=>(
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item?.jobTitle}</td>
                    <td>{item?.fullname}</td>
                    <td>{item?.qualification}</td>
                    <td>{item?.email}</td>
                    <td>{item?.phone}</td>
                    <td>{item?.coverLetter}</td>
                    <td><Link to={`${serverUrl}/pdf-upload/${item?.resume}`} target='_blank'>resume</Link></td>
                  </tr>
                  ))
                 }
                </tbody>

              </table> :
              <p className='text-center text-danger'>No application Recieved</p>
              }
            </div>}



          </div>

        </div>
      </div>

      <Footer />

    </>
  )
}

export default AdminCareers