import React, { useState, useEffect } from 'react';
import moment from 'moment';

import APIV1 from '../../api/v1/config';



const apiInterface = new APIV1({});

const UserProfile = (props) => {
  const { editingAnother, toggleComponent } = props;
  const [currentUser, setCurrentUser] = useState(props.user)
  
  useEffect(() => {
    apiInterface.client.request({
      method: 'get',
      url: `/accounts/${id}`,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setCurrentUser(response.data);
      })
  }, [])

  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    age,
    job_title: jobTitle,
    employer,
    city,
    birth_day: birthDay,
    phone_number: phoneNumber,
    profile_picture: profilePicture,
  } = currentUser;

  
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formEmail, setFormEmail] = useState(email);
  const [formAge, setFormAge] = useState(age);
  const [formJobTitle, setFormJobTitle] = useState(jobTitle);
  const [formEmployer, setFormEmployer] = useState(employer);
  const [formCity, setFormCity] = useState(city);
  const [formBirthDay, setFormBirthday] = useState(birthDay);
  const [formPhoneNumber, setFormPhoneNumber] = useState(phoneNumber);
  const [formProfilePicture, setFormProfilePicture] = useState(null);

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', formFirstName);
    formData.append('last_name', formLastName);
    formData.append('email', formEmail);
    if (formAge !== null) {
      formData.append('age', formAge);
    }
    formData.append('job_title', formJobTitle);
    formData.append('employer', formEmployer);
    formData.append('city', formCity);
    if (formBirthDay !== null) {
      formData.append('birth_day', moment(formBirthDay).format('YYYY-MM-DD hh:mm:ss'));
    }
    formData.append('phone_number', formPhoneNumber)
    if (formProfilePicture !== null) {
      formData.append('profile_picture', (formProfilePicture))
    }
    
  
    apiInterface.client.request({
      method: 'put',
      url: `/accounts/${id}`,
      data: formData,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      },
    })
      .then((response) => {
        alert("Edit Success!");
        if (editingAnother) {
          toggleComponent('list'); 
        } else {
          toggleComponent('detail')
          setCurrentUser(response.data);
        }
      })
      .catch(() => {
        alert('Some thing went wrong. Check your submitted data')
      })
  }

  const handleDelete = () => {
    const deleteConfirmation = window.confirm("Are you sure you want to delete this user ?");
    if (!deleteConfirmation) return;
    apiInterface.client.request({
      method: 'delete',
      url: `/accounts/${id}`,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    })
      .then(response => {
        alert("Deletion Success!");
        toggleComponent('list');
      })
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>{editingAnother && `Currently editing the account of ${email}`}</p>
        <div className="user_detail profile_picture">
          <p>Profile Picture: <img src={`${profilePicture}`} alt='avatar' width="400" height="360"/></p>
          <label htmlFor="profilePicture">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            name="profilePicture"
            onChange={(e) => setFormProfilePicture(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <div className="user_detail first_name">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formFirstName}
            onChange={(e) => setFormFirstName(e.target.value)}
          />
        </div>
        <div className="user_detail last_name">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formLastName}
            onChange={(e) => setFormLastName(e.target.value)}
          />
        </div>
        <div className="user_detail email">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </div>
        <div className="user_detail age">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            value={formAge}
            onChange={(e) => setFormAge(Number.parseInt(e.target.value))}
          />
        </div>
        <div className="user_detail job_title">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formJobTitle}
            onChange={(e) => setFormJobTitle(e.target.value)}
          />
        </div>
        <div className="user_detail employer">
          <label htmlFor="jobTitle">Employer:</label>
          <input
            type="text"
            name="employer"
            value={formEmployer}
            onChange={(e) => setFormEmployer(e.target.value)}
          />
        </div>
        <div className="user_detail city">
          <label htmlFor="jobTitle">City:</label>
          <input
            type="text"
            name="city"
            value={formCity}
            onChange={(e) => setFormCity(e.target.value)}
          />
        </div>
        <div className="user_detail birthday">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={moment(formBirthDay).format('YYYY-MM-DD')}
            onChange={(e) => setFormBirthday(e.target.value)}
          />
        </div>
        <div className="user_detail phone_number">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formPhoneNumber}
            onChange={(e) => setFormPhoneNumber(e.target.value)}
          />
        </div>
        <input type="submit" value="Submit"/>
      </form>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </>
  )
};

export default UserProfile;
