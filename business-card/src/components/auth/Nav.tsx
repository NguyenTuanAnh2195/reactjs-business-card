import React from 'react';

interface Props {
    displayForm: Function,
    handleLogout: Function
    loggedIn: Boolean,
}

const Nav = (props: Props)  => {
  const {
    loggedIn,
    displayForm,
    handleLogout
  } = props;
  const loggedOutNav = (
    <ul>
      <li onClick={() => displayForm('login')}>Login</li>
      <li onClick={() => displayForm('signup')}>Signup</li>
    </ul>
  );

  const loggedInNav = (
    <ul>
      <li onClick={() => handleLogout}>Logout</li>
    </ul>
  );
  return <div>{loggedIn ? loggedInNav : loggedOutNav}</div>;
}

export default Nav;
