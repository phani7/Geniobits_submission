/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

// import * as Loader from "react-loader-spinner";
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function PIM() {
  const customerDetails = {
    id: '',
    name: '',
    country: '',
    logo_url: '',
  };
  const [url, setImage_url] = useState('');
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);

  const getCustomerId = (e) => {
    customerDetails.id = e.target.value;
  };
  const getCustomerName = (e) => {
    customerDetails.name = e.target.value;
  };
  const getCustomerCountry = (e) => {
    customerDetails.country = e.target.value;
  };

  const uploadImage = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Achyuth');
    data.append('cloud_name', 'di01osmzz');
    setLoading(true);
    const imgurl = 'https://api.cloudinary.com/v1_1/di01osmzz/image/upload';
    const config = {
      method: 'POST',
      body: data,
    };
    const res = await fetch(imgurl, config);
    const file = await res.json();
    setImage_url(file.url);
    setLoading(false);
    customerDetails.logo_url = file.url;
    setDetails([...details, customerDetails]);
  };
  const DeleteLogo = () => {
    setImage_url(null);
  };

  const SaveProfile = () => {
    alert('Profile Saved');
  };
  console.log(details);
  return (
    <div className="main-container">
      <div className="App">
        <h1 className="main-heading">Add Employee</h1>
        <p className="content">
          We're absolutely thrilled to have you in on board
        </p>
        <div className="inner-container">
          <h2 className="organization-heading">Employee Details *</h2>
          <div className="box-order">
            <div className="profile-box">
              <div className="profile-container">
                <h2 className="logo-heading">Add logo*</h2>
                <div className="profile">
                  {url ? false
                    : (
                      <img alt="" src="https://res.cloudinary.com/di01osmzz/image/upload/v1649318682/bx_bxs-image-add_is04eg.png" />
                    )}
                </div>
                <h6 className="resolution"> Accepts .jpg, .png, .gif upto 1Mb. Recomende Resolution 200x200 px</h6>
              </div>
              <div className="button-container">
                <div className="button-container">
                  <button className="delete" type="button" onClick={DeleteLogo}>
                    <img alt="" src="https://res.cloudinary.com/di01osmzz/image/upload/v1649399143/delete_pp824j.png" className="delete-icon" />
                    Delete
                  </button>
                  <input
                    id="logo"
                    type="file"
                    onChange={uploadImage}
                    style={{ display: 'none' }}
                  />
                  <button type="button" className="browse">
                    <label htmlFor="logo">
                      <img alt="" src="https://res.cloudinary.com/di01osmzz/image/upload/v1649396968/Group_13135_xjem2h.png" className="icon" />
                      Browse
                    </label>
                  </button>
                </div>
              </div>
              <p>* Required</p>
            </div>
            <div className="details-box">
              <h2 className="logo-heading">Add details</h2>
              <input type="text" className="input" placeholder="Employee ID" onChange={getCustomerId} />
              <input type="text" className="input" placeholder="Employee Name" onChange={getCustomerName} />
              <input list="countries-drop-down" type="text" className="input" placeholder="Country" onChange={getCustomerCountry} />
              <datalist className="input" id="countries-drop-down">
                <option value="America">America</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
              </datalist>
            </div>
          </div>
          <button type="button" onClick={SaveProfile}>Save Profile </button>
        </div>
      </div>
    </div>
  );
}

export default PIM;
