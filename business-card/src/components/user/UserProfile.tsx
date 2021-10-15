import React, { useState } from 'react';
import moment from 'moment';

import APIV1 from '../../api/v1/config';
import { User } from '../../components/interfaces';

interface Props {
  user: User,
  editedUser: User,
  editingAnother: boolean,
  toggleComponent: Function,
};

interface LoginAPIResponse {
  data: Object
}

const apiInterface = new APIV1({});

const UserProfile = (props: Props) => {
  const { user, editingAnother, toggleComponent } = props;
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
    is_staff: isStaff
  } = user;

  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formEmail, setFormEmail] = useState(email);
  const [formAge, setFormAge] = useState(age);
  const [formJobTitle, setFormJobTitle] = useState(jobTitle);
  const [formEmployer, setFormEmployer] = useState(employer);
  const [formCity, setFormCity] = useState(city);
  const [formBirthDay, setFormBirthday] = useState(birthDay);
  const [formPhoneNumber, setFormPhoneNumber] = useState(phoneNumber);
  const [formProfilePicture, setFormProfilePicture] = useState(profilePicture);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiInterface.client.request<unknown, LoginAPIResponse>({
      method: 'put',
      url: `/accounts/${id}`,
      data: {
        'first_name': formFirstName,
        'last_name': formLastName,
        'email': formEmail,
        'age': formAge,
        'job_title': formJobTitle,
        'employer': formEmployer,
        'city': formCity,
        'birth_day': moment(formBirthDay, 'YYYY-MM-DD'),
        'phone_number': formPhoneNumber,
        'profile_picture': formProfilePicture
      },
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert("Edit Success!");
        if (editingAnother) {
          toggleComponent('list'); 
        } else {
          toggleComponent('detail')
        }
      })
      .catch(error => {
        alert(error.response.data)
      })
  }

  const handleDelete = () => {
    const deleteConfirmation = window.confirm("Are you sure you want to delete this user ?");
    if (!deleteConfirmation) return;
    apiInterface.client.request<unknown, LoginAPIResponse>({
      method: 'delete',
      url: `/accounts/${id}`,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
          <p>Profile Picture: <img src={`${formProfilePicture}`} alt='avatar' width="400" height="360"/></p>
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
            value={formBirthDay}
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
