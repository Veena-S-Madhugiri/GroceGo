import React from 'react'
import { Link } from 'react-router-dom';
import "./Mainpage.css"



const Mainpage = () => {
  
  return (
    <div>
      <div className="home-container">
        <h1 className="app-namee">GroceGO</h1>
        <p className="taglinee">Shop Smart, Eat Fresh</p>
        
        <p className="descriptionn">Experience the convenience of grocery shopping from the comfort of your own home</p>
       
      </div>
      <div className='imgHome'>
        <img src={'https://www.pngmart.com/files/7/Groceries-PNG-Photo.png'}/>
      </div>
      <footer className="footer">
        <div className="copy-right">© 2023 GroceGO. All Rights Reserved</div>
        <div className="contact-us"><Link to="/contact">Contact Us</Link></div>
      </footer>
    </div>
    
  )
}

export default Mainpage
