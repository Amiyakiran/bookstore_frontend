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


                  <ResponsiveContainer width="100%" height="100%" >//This component makes the chart responsive, meaning it automatically adjusts to the size of its parent container.
                    <BarChart width={700} height={250} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />//Adds a grid to the chart background.strokeDasharray="3 3" makes dashed grid lines (3px dash, 3px gap).
                      <XAxis dataKey="name" />//Defines the X-axis of the chart. dataKey="name" tells the chart to use the name field from each data object for X-axis labels.
                      <YAxis />//Adds a Y-axis that automatically scales based on the data.
                      <Tooltip />//Adds a hover tooltip to display data values interactively.
                      <Legend />//Adds a legend to identify each data series (in this case, pv and uv).
                      <Bar dataKey="pv" fill="#8884d8" />//Renders bars for the pv data field using a purple color (#8884d8).
                      <Bar dataKey="uv" fill="#82ca9d" />//Renders bars for the uv data field using a green color (#82ca9d).
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
                      //data={data01}: Uses data01 array as the source for this pie.

                      {/* dataKey="value": Uses the value field from each object as the slice size.
                      
                      nameKey="name": Uses the name field as the label.
                      
                      cx="50%" cy="50%": Centers the pie chart horizontally and vertically.
                      
                      outerRadius={50}: Sets how big the pie slices will be (radius).
                      
                      fill="#8884d8": Purple color fill for the pie slices. */}
                      <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />

                            {/*                       innerRadius={60} and outerRadius={80} makes this a ring (donut).
                            
                            data={data02} pulls from a different dataset.
                            
                            label: Enables text labels for each slice.
                            
                            Fill is green (#82ca9d). */}
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
