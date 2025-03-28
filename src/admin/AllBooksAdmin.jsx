import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from '../user/Footer';
import AdminHeader from './AdminHeader';
import { approveBook, getABookApi, getAllBooksApi, getAllUsersApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import Adminsidebar from './Adminsidebar';



function AllBooksAdmin() {
  const [status, setStatus] = useState(false)
  const [tabStatus, setTabStatus] = useState(1)
  const [key, setKey] = useState('tab1');
  const [allBooks , setAllBooks]= useState([])
  const [allUsers , setAllUsers]= useState([])

  const handleApprove = async(book)=>{
    const result = await approveBook(book)
    console.log(result);
    if(result.status==200){
      setStatus(!status)
    }
    
  }

  const handleTabSelect = (key) => {
    setKey(key);
    if (key == 'Book_List') {
      setTabStatus(1)
    }
    else {
      setTabStatus(2)
      getAllUsers()
    }
  }

  const getAllBooks = async()=>{
    const result = await getAllBooksApi("")
    // console.log(result);
    
    setAllBooks(result.data);
    
  }
  // console.log(allBooks);

  const getAllUsers = async()=>{
    const result = await getAllUsersApi()
    setAllUsers(result.data)
  }
  console.log(allUsers);
  
  
  useEffect(()=>{
    getAllBooks()
   
  },[status])
 
  return (
    <>
      <AdminHeader />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-blue-50 flex  flex-col items-center">
            
            <Adminsidebar/>

          </div>
          <div className="col-md-9">
            <h4 className='text-center mt-3'>All Books</h4>

            <div className='mt-5 flex justify-center items-center '>
              <Tabs
                defaultActiveKey="Book_List"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleTabSelect}
              >
                <Tab eventKey="Book_List" title="Book List" ></Tab>
                <Tab eventKey="Users" title="Users" ></Tab>

              </Tabs>
            </div>

            {/* all books */}
            {tabStatus == 1 && <div className="row">

              {
                allBooks?.length>0?
                allBooks?.map((book , index)=>(
                  <div className="col-md-3 mt-4 p-4" key={index} >
                <div className={book.status=='sold'?'p-3 card shadow rounded-0 border-0 opacity-25  text-center':'p-3 card shadow rounded-0 border-0  text-center'}>
                  <img src={book?.imageurl} alt="no image" className='w-100' style={{ height: '200px' }} />
                  <span className='text-primary'>{book?.author.slice(0, 15)}</span>
                  <h5>{ book?.title.length > 20 ? (`${book?.title.slice(0, 20)}...`) : (book?.title)}</h5>
                  <p className='text-warning' style={{fontSize:'12px'}}>{book?.userMail}</p>
                  {book?.status == 'active'?<button className='btn btn-success rounded-0' onClick={()=>handleApprove(book)} >Approve</button>:
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/025/210/773/small_2x/check-mark-icon-transparent-background-checkmark-icon-approved-symbol-confirmation-sign-design-elements-checklist-positive-thinking-sign-correct-answer-verified-badge-flat-icon-png.png" alt="no image" style={{width:'40px', height:'40px'}} className='ms-auto' />}
                </div>
              </div>
                ))
                :
                <p className='text-danger'>No Book in the database</p>
              }


            </div>}
            {/* users */}
            {tabStatus == 2 &&
            <div className='container'>
              <div className="row">
               {allUsers?.length>0? 
               allUsers.map((item,index)=>(
                <div className="col-md-4 p-3" key={index} hidden={item?.email=='bookstoreadmin@gmail.com'}>
                <div className='bg-gray-100 p-3 shadow'>
                  <div className="row">
                  <p className='text-danger' style={{fontSize:'14px'}}>ID: {item?._id}</p>
                    <div className="col-3 flex justify-center items-center">
                      <img src={item?.photo==""?"https://cdn-icons-png.freepik.com/512/8742/8742495.png": item?.photo.startsWith('http')?`${item.photo}`:`${serverUrl}/upload/${item?.photo}`} alt="NO IMAGE" style={{width:'70px', height:'70px', borderRadius:'50%'}} />
                    </div>
                    <div className="col-9">
                        <h5 className='text-primary mt-3'>{item?.username}</h5>
                        <p style={{fontSize:'14px'}}>{item?.email}</p>
                        
                    </div>
                  </div>

                </div>
              </div>
               ))
               :
               <p>No Users Added Yet</p>
              }
               
               
                
              </div>

            </div>}


          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default AllBooksAdmin