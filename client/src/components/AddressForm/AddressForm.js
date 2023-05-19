import React, { useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";
import "./AddressForm.css";

function Updateaddress() {
  const [houseNumber, sethouseNumber] = useState('');
  const [street, setstreet] = useState('');
  const [area, setarea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipcode] = useState('');

  const [success, setSuccess] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);
  const usertoken = Cookies.get('token');
  // console.log(usertoken)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    try {
      const response = await Axios.post("http://localhost:8000/api/address/addAddress", {

        street,
        area,
        city,
        state,
        country,
        zipCode,

      },
        {

          headers: { 'authentication-token': usertoken },
        }

      );

      console.log(response)
      if (response !== 400) {
        setSuccess(true);
        setUnsuccess(false);

      }


    }
    catch (errors) {
      console.log(errors);
      setSuccess(false);
      setUnsuccess(true);

    }
  }

  return (

    <div className="auth-form-container2">
      <form className="address-form" onSubmit={handleSubmit}>
        <h2>Update Your Address</h2>
        <div className="labels-left">
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
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div class="labels-right">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <label htmlFor="zipcode">ZipCode</label>
          <input
            type="text"
            id="zipcode"
            placeholder="Zipcode"
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
        {success && <b>Address updated successfully.</b>}
        {unsuccess && <b>Failed to update address.</b>}
      </form>
    </div>


  );
}
export default Updateaddress;