import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Profile.css';
import Navbar from '../Navbar/Navbar';
import EditAddress from '../AddressForm/EditAddress';


const Profile = () => {
  const [userData, setUserData] = useState({});
  // console.log(userData);
  const [addressList, setAddressList] = useState({});
  console.log(addressList)
  const usertoken = Cookies.get('token');
  const [street, setstreet] = useState("");
  const [area, setarea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [showEditAddressForm, setShowEditAddressForm] = useState(false);
  const [form, setform] = useState(false);
  const [update, setupdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);
  const [userAddressId, setUserAddressId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/get_user', {
          headers: { 'authentication-token': usertoken },
        });
        const resData = await response.json();
        setUserData(resData);
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchUserData();
  }, [usertoken]);

  const fetchAddressData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/address/getAddress', {
        headers: { 'authentication-token': usertoken },
      });
      const result = await response.json();
      console.log(result);
      setAddressList(result)
      setSuccess(true)
    } catch (error) {
      console.log('error in response');
    }
  };

  useEffect(() => {

    fetchAddressData();
  }, [usertoken]);

  const handleAddressDelete = async (addressId) => {

    const response = await fetch(
      `http://localhost:8000/api/address/deleteNote/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "authentication-token": `${usertoken}`,
        },
      }
    );
    const resData = await response.json();
    if (resData.Success === "Address deleted successfully!") {
      alert("Address deleted successfully!", "warning");
      fetchAddressData();
    } else {
      console.log("Error");
    }
  };

  const handleAddressEdit = () => {
    setShowEditAddressForm(true)
  }

  const handlePassAddressId = (addressId) => {
    setUserAddressId(addressId)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/address/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authentication-token': usertoken,
        },
        body: JSON.stringify({

          street,
          area,
          city,
          state,
          country,
          zipCode,
        }),
      });

      if (response.status === 400) {
        setupdate(true);
        setUnsuccess(false);
        console.log(response)
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    } catch (errors) {
      console.log(errors);
      setupdate(false);
      setUnsuccess(true);
    }
  };
  const handleCancel = async (e) => {
    setform(false)
  }
  const handleAddAddressClick = () => {
    setform(true);
  };

  return (
    <div className='profile'>

      <div className='profileContainer'>
        <div className='form1'>
          <h1 >User Details</h1>

          <p>First Name:{userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email:{userData.email}</p>
        </div>
        {success && (
          <div>
            <table>
              <thead>
                <tr>
            
                  <th>Street</th>
                  <th>Area</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Zip-Code</th>
              
                </tr>
              </thead>
              <tbody>
                {Array.isArray(addressList) &&
                  addressList.map((address, index) => (
                    <tr key={index}>
                      <td>{address.street}</td>
                      <td>{address.area}</td>
                      <td>{address.city}</td>
                      <td>{address.state}</td>
                      <td>{address.country}</td>
                      <td>{address.zipCode}</td>
                      <td><button onClick={() => handleAddressDelete(address._id)}><img
                      src={require("../Profile/delete.png")}
                      alt="Logo"
                      
                      className="DelteIcon"
                    /></button><button onClick={() => {
                        handleAddressEdit();
                        handlePassAddressId(address._id)
                      }}>Edit</button></td>

                    </tr>
                  ))}
              </tbody>


            </table>
          </div>
        )}

<div className='Addbtn'>
          <button onClick={handleAddAddressClick}>Add </button>
        </div>
       
      </div>
    
      <div className='addressContainer'>
  {showEditAddressForm && (
    <EditAddress fetchUserAddress={fetchAddressData} addressId={userAddressId} />
  )}
  {form && (
    <div className="auth-form-container">
      <form className="address-form" onSubmit={handleSubmit}>
        <h2>Add Address</h2>
        <div className="grid-container">
          <div className="left-column">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              placeholder="Street"
              onChange={(e) => setstreet(e.target.value)}
              required
            />

            <label htmlFor="area">Area</label>
            <input
              type="text"
              id="area"
              value={area}
              placeholder="Area"
              onChange={(e) => setarea(e.target.value)}
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="right-column">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              required
            />

            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="subbtn">
          <button type="submit">Submit</button>
          <div>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>

        {update && <b>Address updated successfully.</b>}
        {unsuccess && <b>Failed to update address.</b>}
      </form>
    </div>
  )}
</div>

</div>
  );
};
export default Profile;
