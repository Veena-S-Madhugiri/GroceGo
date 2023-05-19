
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/homepage/homepage';
import Profile from './components/Profile/Profile';
import Mainpage from './components/Mainpage/Mainpage';
import Address from './components/AddressForm/AddressForm';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';







function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Mainpage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/address" element={< Address/>} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/Navbar" element={<Navbar />} />
          <Route exact path="/order" element={<Order />} />


          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
