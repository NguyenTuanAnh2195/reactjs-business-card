import React from 'react';
import SortingButton from './SortingButton';

interface Props {
  userData: Array<{
    name: String,
    email: String,
    age: Number,
    job_title: String,
    employer: String,
    city: String,
    birth_day: Date,
    phone_number: String,
  }>
};

const UserTable = (props: Props) => {
  const { userData } = props;

  const sortByArgument = (arg: String) => {
    //
  }


  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>
          <SortingButton title='Age' handleClick={() => sortByArgument('age')} />
        </th>
        <th>
          <SortingButton title='Job Title' handleClick={() => sortByArgument('job_title')} />
        </th>
        <th>
          <SortingButton title='Employer' handleClick={() => sortByArgument('employer')} />
        </th>
        <th>
          <SortingButton title='City' handleClick={() => sortByArgument('city')} />
        </th>
        <th>Birthday</th>
        <th>Phone Number</th>
      </tr>
      {
        userData.map(user => {
          const {
            name,
            email,
            age,
            job_title: jobTitle,
            employer,
            city,
            birth_day: birthDay,
            phone_number: phoneNumber,
          } = user;
          return (
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{age}</td>
              <td>{jobTitle}</td>
              <td>{employer}</td>
              <td>{city}</td>
              <td>{birthDay}</td>
              <td>{phoneNumber}</td>
            </tr>
          )
        })
      }

    </table>
  )
};

export default UserTable;
