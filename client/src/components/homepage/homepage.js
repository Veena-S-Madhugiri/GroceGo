import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Homepage() {

   
    return (
        <div className='homepage'>
           {/* <nav className='secondary-nav'>
        <ul className='secondary-nav-links'>
          <li><Link to='/fruits'>Fruits</Link></li>
          <li><Link to='/dairy'>Dairy</Link></li>
          <li><Link to='/vegetables'>Vegetables</Link></li>
          <li><Link to='/meat-seafood'>Meat &amp; Seafood</Link></li>
          <li><Link to='/grocery'>Grocery</Link></li>
          <li><Link to='/beverages'>Beverages</Link></li>
        </ul>
      </nav> */}
            
            <div className='homepage-container'>
                <h1 className='app-name1'>Welcome to GroceGO!!  </h1>
                <div><p className='tagline1'>Shop for your groceries online</p></div>
                <div><p className='description1'>With our easy-to-use online platform,<br /> you can shop from the comfort of your own home <br /> and have your groceries delivered right to your doorstep.</p>
                    <div></div>
                    <body>
                        <div class="slideshow">
                            <div class="slide"></div>
                            <div class="slide"></div>
                        </div>
                    </body>
                </div>

            </div>
        </div>
    );
}

export default Homepage;
