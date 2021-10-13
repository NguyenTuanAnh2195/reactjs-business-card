import React from 'react';

interface Props {
  user: {
    name: String,
    email: String,
    age: Number,
    job_title: String,
    employer: String,
    city: String,
    birth_day: Date,
    phone_number: String,
    profile_picture: String,
  },
};

const UserProfile = (props: Props) => {
  const { user } = props;
  const {
    name,
    email,
    age,
    job_title: jobTitle,
    employer,
    city,
    birth_day: birthDay,
    phone_number: phoneNumber,
    profile_picture: profilePicture
  } = user;

  return (
    <div>
      <p>Profile Picture: <img src={`${profilePicture}`} alt={`avatar of ${name}`}/></p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Job Title: {jobTitle}</p>
      <p>Employer: {employer}</p>
      <p>City: {city}</p>
      <p>BirthDay: {birthDay}</p>
      <p>Phone Number: {phoneNumber}</p>
    </div>
  )
};

export default UserProfile;
