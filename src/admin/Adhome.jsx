import {  faBook,  faUserTie,   faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Footer from '../user/Footer';
import AdminHeader from './AdminHeader';
import Adminsidebar from './Adminsidebar';
import { Bar, Doughnut } from 'react-chartjs-2';


function Adhome() {

  const options = {
    responsive: true,
    cutout: '0%' // Adjust this value to reduce or increase the hole size
  }
 
  return (
    <>
      <AdminHeader/>

      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-3 bg-blue-50 flex  flex-col items-center" >
         
            <Adminsidebar/>

          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4 p-3">

                <div className='bg-cyan-700 rounded p-3 flex justify-center items-center text-white'>

                  <FontAwesomeIcon icon={faBook} className='fa-4x me-4' />
                  <div className='flex justify-center items-center flex-col'>
                    <h6>Total number of Books</h6>
                    <h1>100 + </h1>
                  </div>

                </div>
              </div>
              <div className="col-md-4 p-3">
                <div className='bg-emerald-600 rounded p-3 flex justify-center items-center text-white'>

                  <FontAwesomeIcon icon={faUsers} className='fa-4x me-4' />
                  <div className=' flex justify-center items-center flex-col'>
                    <h6>Total Number of Users</h6>
                    <h1>100 + </h1>

                  </div>
                </div>
              </div>
              <div className="col-md-4 p-3">
                <div className='bg-amber-300 rounded p-3 flex justify-center items-center text-white'>
                  <FontAwesomeIcon icon={faUserTie} className='fa-4x me-4' />
                  <div className='flex justify-center items-center flex-col'>
                    <h6>Total number of Employee</h6>
                    <h1>100 + </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-5 px-3">
              <div className="col-md-6">
                <div className='shadow p-3'>
                  <p> Annual Turn Over</p>
                  <Bar data={{
                    labels:["2022","2023","2024"],
                    datasets:[{
                      label:'Revenue',
                      data:[200,300,400]
                    },{
                      label:'Loss',
                      data:[20,30,40]
                    }]
                  }}/>
  
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className='shadow p-4 flex justify-center items-center flex-col' >
                  <p>Annual Turn Over</p>
                 <div style={{width:'270px', height:'230px'}}>
                    <Doughnut data={{
                        labels:["2022","2023","2024","2025"],
                        datasets:[{
                          label:'Revenue',
                          data:[200,300,400,100]
                        }]
                      }}
  
                    options={options}
                   
                    
                      />
                 </div>
    
                   
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />

    </>
  )
}

export default Adhome