import React, { useState } from 'react';
import Cookies from "js-cookie";
import "./EditAddress.css";



const EditAddress = ({fetchUserAddress, addressId}) => {
  const [address, setAddress] = useState({
    street: '',
    area: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });
  const [validationMsg, setValidationMsg] = useState('');
  const [addressEdited, setAddressEdited] = useState(false); // Add state variable to track whether address was added or not
  const [showForm, setShowForm] = useState(true);


  const handleInputChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };

  const usertoken = Cookies.get('token');

  const handleAddressSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('User:Token');
    const response = await fetch(`http://localhost:8000/api/address/editAddress/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authentication-token': usertoken,
      },
      body: JSON.stringify({
        street: address.street,
        area: address.area,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
      }),
    });
    const resultData = await response.json();
    if (resultData.success) {
      setValidationMsg('Address added successfully.');
      setAddress({ street: '', area: '',city: '', state: '', country: '',zipCode: '' });
      setAddressEdited(true); // Set addressAdded state variable to true after successfully adding an address
      fetchUserAddress()
    } else {
      setValidationMsg(resultData.message);
    }
  };
  const handleCancel = () => {
    setShowForm(false);
  };


  
  const handleReset = () => {
    // Reset the form data to its initial state when Reset button is clicked
    setAddress({
        street: '',
        area: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    });
    setValidationMsg("");
    console.log("Reset button clicked");
  };
  return (
    <>
    {showForm && (
    <div className="addAddressContainerr">
    <h4>Update Address</h4>
      <div className="addAddress-card"> 
      {addressEdited ? ( // Conditionally render the form based on the addressAdded state variable
        <p>Address Updated successfully.</p>
      ) : (
        <div className="address-formm">
          <form onSubmit={handleAddressSubmit}>
            <div className="address-form-groupp">
              <div className="address-form-group-leftt">
                <div className="form-groupp">
                  <label htmlFor="street">Street:</label>
                  <input
                    type="text"
                    id="street"
                    className='texttCSS'
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-groupp">
                  <label htmlFor="area">Area:</label>
                  <input
                    type="text"
                    className='texttCSS'
                    id="area"
                    name="area"
                    value={address.area}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-groupp">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    className='texttCSS'
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="address-form-group-rightt">
                <div className="form-groupp">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    className='texttCSS'
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-groupp">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    className='texttCSS'
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-groupp">
                  <label htmlFor="zipCode">Zip Code:</label>
                  <input
                    type="text"
                    className='texttCSS'
                    id="zipCode"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          <div className="button-groupp">
          <button type="submit" className="Savebtn" >Save</button>
            <button type="button" className="Cancelbtn" onClick={handleCancel}>Cancel</button>
                  <button type="button" className="Resetbtn" onClick={handleReset}>Reset</button>
                  </div>
            {validationMsg && <p className="validation-msg">{validationMsg}</p>}
          </form>
        </div>)}
      </div></div>    )}
    </>
  );
};

export default EditAddress;