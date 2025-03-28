import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { gethomeBooksApi } from '../services/allApi';
import { searchKeyContext } from '../context/Contextshare';




function Home() {
  const [homeBooks , setHomeBooks] = useState([])
  const {searchKey, setsearchKey} = useContext(searchKeyContext)
  const navigate = useNavigate()
 

  const inputRef = useRef(null);
  let i = 0
  let placeholder = ""
  let txt = "Search Books"

  const type = () => {
    placeholder += txt.charAt(i)//Returns the character at the specified index.
    inputRef.current.placeholder = placeholder
    i++
    if (i > txt.length - 1) {
      placeholder = ""
      i = 0
    }
    setTimeout(type, 200)

  }
 

  const getHomeBooks = async()=>{
    const result = await gethomeBooksApi()
    // console.log(result);
    setHomeBooks(result.data) 
  }

  // console.log(homeBooks);

  const handleClick = ()=>{
    const token = sessionStorage.getItem("token")
    if(searchKey && token){
      navigate('/all-books')
    }
    else if(!token){
      alert('please login')
      setsearchKey("")
      navigate('/login')
    }
    else if(searchKey == ""){
      alert('Please enter title of the Book')
    }else{
      setsearchKey("")
      alert('Something went wrong')
    }
  }
  


  useEffect(() => {
    type()
    getHomeBooks()
  }, [])

  return (
    <>
      <Header />
      <header>
        <div className='mt-5' id='main'>
          <h1 className='mt-5'>Wonderful Gifts </h1>
          <p>Give your family and friends a book</p>

          <div className='d-flex mt-5 w-100 justify-center'>
            <input value={searchKey} type="text" ref={inputRef} placeholder='search Book' className='form-control   bg-amber-50 w-50 p-3  rounded-5' onChange={(e)=>setsearchKey(e.target.value)} />

            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClick} className='text-primary fs-5' style={{ marginLeft: '-40px', marginTop: '20px' }}  />
          </div>

        </div>
      </header>

      {/* new arrivals */}
      <section>
        <h6 id='newArrival' className='mt-5 text-center'>NEW ARRIVALS</h6>
        <h3 className='mb-5 text-center'>Explore Our Latest Collection</h3>
        <div className="container text-center">
          <div className="row mb-5" id="allB">
         { homeBooks?.length>0? 
           homeBooks?.map((item , index)=>(
            <div className="col-md-3 p-2" key={index}>
            <div className=' p-3 card shadow rounded-0  text-center'>
              <img src={item?.imageurl} alt="no image" className='w-100' style={{height:'400px'}} />
              <p className='text-primary mt-2' >{item?.author}</p>
              <h5>{item?.title.length>20?(`${item?.title.slice(0,20)}...`):(item?.title)}</h5>
              <h6>$ {item?.discountPrice}</h6>
            </div>
          </div>
           ))
         :
         
         <p>Loading</p>

         }
          



          </div>
          <Link to={'/all-books'}><button className=' text-white bg-gray-900 hover:bg-blue-950  mt-2 px-5 py-3 rounded-0 shadow'>Explore More </button></Link>
        </div>
      </section>


      {/* featured authors */}
      <section className='mt-5'>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 p-4">
              <h6 className='text-center mt-5'>FEATURED AUTHORS</h6>
              <h3 className='text-center'>Captivates with every word</h3>
              <p className='mt-5 text-justify'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds. </p>
              <p className='mt-4 text-justify'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>




            </div>
            <div className="col-md-6 p-4">
            <Carousel className='my-5 text-center' fade indicators={false} prevIcon={false} nextIcon={false}>
              <Carousel.Item interval={1000} >
               <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src='https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=' style={{width:'100%', height:'450px'}} />
                
               </div>
              </Carousel.Item>
              <Carousel.Item  interval={1000}>
               
              <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src='https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg' style={{width:'100%', height:'450px'}} />
                 
               </div>
              </Carousel.Item>
              <Carousel.Item  interval={1000}>
              <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src='https://t4.ftcdn.net/jpg/07/98/16/13/360_F_798161317_4zyCUubM3u07DzwAJPNEmn71ho6qU5rc.jpg' style={{width:'100%', height:'450px'}} />
              
               </div>
              </Carousel.Item>
            </Carousel>
              
            </div>


          </div>
        </div>
      </section>

      {/* Testominials */}
      <section>
        <div className="container mt-5">
          <div className="row">
            <h6 className='mt-5 text-center'>TESTIMONIALS</h6>
            <h3 className='text-center'>See What Others Are Saying</h3>

          <div className="col-md-1"></div>
          <div className="col-md-10">
          <Carousel className='my-5 text-center'>
              <Carousel.Item interval={1000} >
               <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src='https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=' style={{borderRadius:'50%', width:'170px', height:'170px'}} />
                  <h3> Treesa Joseph </h3>
                 <p className='my-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit distinctio similique ea voluptas. Optio fuga magni, enim, molestiae nemo molestias deserunt reprehenderit reiciendis qui cupiditate, velit similique mollitia! Expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
               </div>
              </Carousel.Item>
              <Carousel.Item  interval={1000}>
               
              <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src='https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg' style={{borderRadius:'50%', width:'170px', height:'170px'}} />
                  <h3>Jeniffer susen</h3>
                 <p className='my-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit distinctio similique ea voluptas. Optio fuga magni, enim, molestiae nemo molestias deserunt reprehenderit reiciendis qui cupiditate, velit similique mollitia! Expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
               </div>
              </Carousel.Item>
              <Carousel.Item  interval={1000}>
              <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src='https://t4.ftcdn.net/jpg/07/98/16/13/360_F_798161317_4zyCUubM3u07DzwAJPNEmn71ho6qU5rc.jpg' style={{borderRadius:'50%', width:'170px', height:'170px'}} />
                <h3>Ken Thomas</h3>
                 <p className='my-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit distinctio similique ea voluptas. Optio fuga magni, enim, molestiae nemo molestias deserunt reprehenderit reiciendis qui cupiditate, velit similique mollitia! Expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
               </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-1"></div>
          </div>
        </div>
      </section>
      {/*  <Row>
        <OwlCarousel items={5}  
          className="owl-theme"  
          loop='true'
          margin={0}
          responsive ={
                {0:{
                    items: 1,
                },
                600:{
                    items: 3,
                },
                1000:{
                  items: 5,
                }}
              }
          autoplay ={true}>  
           <div ><img  className="img" src= {'assets/img/villa.jpg'}/></div>  
           <div><img  className="img" src= {'assets/img/shoppingmall.jpg'}/></div>  
           <div><img  className="img" src= {'https://media.wired.co.uk/photos/606d9dd3751ea43ccd98882b/master/w_1600%2Cc_limit/1120wiredworldenvironment12.jpg'}/></div>  
           <div><img  className="img" src= {'assets/img/resort.jpg'}/></div>  
           <div><img  className="img" src= {'https://thediplomat.com/wp-content/uploads/2021/04/sizes/td-story-s-2/thediplomat-2021-04-12-3.jpg'}/></div>   

      </OwlCarousel> 
        </Row> */}
      <Footer />
    </>
  )
}

export default Home