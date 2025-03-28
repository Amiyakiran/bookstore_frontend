import React from 'react'

function Preloader() {
  return (
    <div className="row w-100" style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}} >
        <div className="col-md-4"></div>
        <div className='col-md-4'>
        <img src="https://i.pinimg.com/originals/e1/59/25/e15925c931a81678a3c2e0c0a40db781.gif" className='w-100' />
         </div>
        <div className="col-md-4"></div>
    </div>
  )
}

export default Preloader