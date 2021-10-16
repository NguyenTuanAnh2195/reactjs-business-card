import React, { useState, useEffect } from 'react';
import moment from 'moment';

import APIV1 from '../../api/v1/config';
import { User } from '../interfaces';
import SortingButton from './SortingButton';

interface LoginAPIResponse {
  data: Array<User>
}

interface Props {
  showComponent: string
  toggleComponent: Function,
  showUserProfile: Function,
}

const apiInterface = new APIV1({});

const UserTable = (props: Props) => {
  const [userList, setUserList] = useState<Array<User>>([]);

  const sortByArgument = (orderCriteria: String) => {
    apiInterface.client.request<unknown, LoginAPIResponse>({
      method: 'get',
      url: `/accounts?ordering=${orderCriteria}`,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setUserList(response.data);
      })
  }

  const getUserList = () => {
    apiInterface.client.request<unknown, LoginAPIResponse>({
      method: 'get',
      url: '/accounts/',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setUserList(response.data);
      })
  };

  useEffect(() => {
    getUserList();
  }, [])

  return (
    <table className="user-list">
      <thead>
        <th>First Name</th>
        <th>Last Name</th>
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
      </thead>
      <tbody>
        {
          userList.map(user => {
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
            } = user;

            return (
              <tr key={id}>
                <td>
                  <p>{firstName}</p><span><button onClick={() => props.toggleComponent('detail', user)}>Edit</button></span>
                </td>
                <td><p>{lastName}</p></td>
                <td>{email}</td>
                <td>{age}</td>
                <td>{jobTitle}</td>
                <td>{employer}</td>
                <td>{city}</td>
                <td>{birthDay ? moment(birthDay).format('DD-MM-YYYY') : ''}</td>
                <td>{phoneNumber}</td>
              </tr>
            )
          })
        }
      </tbody>

    </table>
  )
};

export default UserTable;
