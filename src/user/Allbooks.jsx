import React, { useState, useEffect, useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { getAllUserBooksApi, makepaymentApi } from '../services/allApi'
import { searchKeyContext } from '../context/Contextshare'
import { loadStripe } from '@stripe/stripe-js';


function Allbooks() {
   const [status, setStatus] = useState(false)
   const [token, setToken] = useState("")
   const [allBooks, setAllBooks] = useState([])
   const { searchKey, setsearchKey } = useContext(searchKeyContext)
   const [tempArray, setTempArray] = useState([])





   const getAllBooks = async (searchKey, tok) => {
      console.log('inside getall book');
      //  console.log(tok);

      const reqHeader = {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${tok}`
      }
      console.log(reqHeader);

      const result = await getAllUserBooksApi(searchKey, reqHeader)
      //  console.log(result); 
      if (result.status == 200) {
         setAllBooks(result.data)
         setTempArray(result.data)
      }
   }

   /*  console.log(allBooks);
     */

   const filter = (data) => {
      // console.log(data);
      setAllBooks(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))

   }


   //make payment
   const makepayment = async (book) => {
      const stripe = await loadStripe('pk_test_51R7KVH4ThNmb9j6tPJw9GmtjgfG4DMBPAmaTm5ryOCehOg7zFDMIv1GgdMIdOasG6rhW3xhirEuiufSCoINhRmgR00rcjVSwyj');
      const reqbody = {
         bookDetails: book
      }
      const reqHeader = {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      }
      const response = await makepaymentApi(reqbody, reqHeader)
      const sessionId = response.data.sessionId;

      const result = stripe.redirectToCheckout({
         sessionId:sessionId
      })

      if (result.error) {
         // Handle any errors (e.g., show an error message to the user)
         alert(result.error.message);
       }

   }

   useEffect(() => {

      const tok = sessionStorage.getItem("token")
      console.log(tok);//

      setToken(tok)//

      getAllBooks(searchKey, tok)



   }, [searchKey])

   console.log(token);//

   return (
      <>
         <Header />
         {!token ? <div className="container mb-5" style={{ marginTop: '200px' }}>
            <div className="row">
               <div className="col-4"></div>
               <div className="col-4 flex justify-center items-center flex-col">
                  <img src="https://media1.giphy.com/media/gHPOb1fEVWu5GHL2tk/giphy.gif?cid=6c09b952tt091lqbi5ppy58cenphal461we78lo4jomwnkzi&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" alt="no image" className='w-50' />
                  <p className='mt-3 text-danger'>Please<Link to={'/login'}> Login </Link>to Explore</p>
               </div>
               <div className="col-4"></div>
            </div>
         </div>
            :
            <div className="container mb-5" style={{ marginTop: '200px' }}>
               <h1 className='text-center'>Collections</h1>
               <div className='d-flex my-4 justify-center'>
                  <input type="text" value={searchKey} placeholder='Search by Title' className='form-control w-50 rounded-0 ' onChange={(e) => setsearchKey(e.target.value)} />
                  <button className='btn btn-primary rounded-0'>Search</button>
               </div>
               <div className="row">

                  <div className="col-md-2">
                     <div className='d-flex justify-between mt-5 mx-4 mx-md-0'>
                        <h5>Filters</h5>
                        <FontAwesomeIcon className='d-md-none' icon={faBars} onClick={() => { setStatus(!status) }} />
                     </div>

                     <div className={` ${status ? 'd-block mt-4' : 'mt-4 d-md-block d-none'}`} >
                        <div className='mb-3'>
                           <input type="radio" id='Friction' name='filter' onClick={() => filter('Friction')} />
                           <label htmlFor="Friction" className='ms-3'>Literary Fiction</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Philosophy' name='filter' onClick={() => filter('Philosophy')} />
                           <label htmlFor="Philosophy" className='ms-3'>Philosophy</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Mystery/Thriller' name='filter' onClick={() => filter('Mystery/Thriller')} />
                           <label htmlFor="Mystery/Thriller:" className='ms-3'>Mystery/Thriller</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Romance' name='filter' onClick={() => filter('Romance')} />
                           <label htmlFor="Romance" className='ms-3'>Romance</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Horror' name='filter' onClick={() => filter('Horror')} />
                           <label htmlFor="Horror" className='ms-3'>Horror</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Biography/Autobiography' name='filter' onClick={() => filter('Auto/biography')} />
                           <label htmlFor="Biography/Autobiography" className='ms-3'>Auto/Biography</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Self-Help' name='filter' onClick={() => filter('Self-Help')} />
                           <label htmlFor="Self-Help" className='ms-3'>Self-Help</label>
                        </div>
                        <div className='mb-3'>
                           <input type="radio" id='Politics' name='filter' onClick={() => filter('Politics')} />
                           <label htmlFor="Politics" className='ms-3'>Politics</label>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-10">

                     <div className="row" id="allB" >
                        {allBooks?.map((book, index) => (
                           <div className="col-md-3 mt-4" key={index} hidden={book?.status == 'active' || book?.status == 'sold'}>
                              <div className=' p-3 card shadow rounded-0 border-0  text-center'>
                                 <Link to={`/view-book/${book?._id}`}> <img src={book?.imageurl} alt="no image" className='w-100' style={{ height: '300px' }} /></Link>
                                 <span className='text-primary'>{book?.author.slice(0, 15)}</span>
                                 <h5>{book?.title.length > 20 ? (`${book?.title.slice(0, 20)}...`) : (book?.title)}</h5>
                                 <button onClick={() => makepayment(book)} className='btn btn-primary mt-2 rounded-0'>Buy - $ {book?.discountPrice}</button>
                              </div>
                           </div>
                        ))}

                     </div>
                  </div>
               </div>
            </div>
         }
         <Footer />

      </>
   )
}

export default Allbooks