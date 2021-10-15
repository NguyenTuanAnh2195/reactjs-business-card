import React from 'react';
import { User } from '../interfaces';

interface Props {
    displayForm: Function,
    handleLogout: Function
    loggedIn: boolean,
    showComponent: string,
    toggleComponent: Function,
    user: User | null
}

const Nav = (props: Props)  => {
  const {
    loggedIn,
    displayForm,
    handleLogout,
    showComponent,
    toggleComponent,
    user
  } = props;
  const loggedOutNav = (
    <ul>
      <li onClick={() => displayForm('login')}>Login</li>
      <li onClick={() => displayForm('signup')}>Signup</li>
    </ul>
  );

  const loggedInNav = (
    <ul>
      <li onClick={() => handleLogout()}>Logout</li>
      {user && user.is_staff && (
        <li onClick={() => toggleComponent(showComponent === 'list' ? 'detail' : 'list')}>
          {showComponent === 'list' ? 'Show Detail' : 'Show User List'}
        </li>
      )}
    </ul>
  );
  return <div>{loggedIn ? loggedInNav : loggedOutNav}</div>;
}

export default Nav;
