import { faBook, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Footer from '../user/Footer';
import AdminHeader from './AdminHeader';
import Adminsidebar from './Adminsidebar';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';




function Adhome() {

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]

  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
    {
      "name": "Group D",
      "value": 9800
    },
    {
      "name": "Group E",
      "value": 3908
    },
    {
      "name": "Group F",
      "value": 4800
    }
  ];


  return (
    <>
      <AdminHeader />

      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-3 bg-blue-50 flex  flex-col items-center" >

            <Adminsidebar />

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

            <div className="row py-5 px-3 w-full">
              <div className="col-md-6">
                <div className='shadow p-3 w-full' style={{ height: '350px' }}>
                  <p> Annual Turn Over</p>


                  <ResponsiveContainer width="100%" height="100%" >
                    <BarChart width={700} height={250} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>



                </div>
              </div>
              <div className="col-md-6">
                <div className='shadow p-4 flex justify-center items-center flex-col w-full' style={{ height: '350px' }}>
                  <p>Annual Turn Over</p>
                  <ResponsiveContainer width="100%" height="100%" >
                    <PieChart width={730} height={250}>
                      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                      <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                    </PieChart>
                  </ResponsiveContainer>


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