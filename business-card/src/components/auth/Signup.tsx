import React, { useState } from 'react';

interface Props {
  handleSignup: Function;
}

interface Event {
  target: EventTarget;
}

interface EventTarget {
  name: string;
  value: string;
}

const Signup = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e: Event) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  return (
    <form onSubmit={(e) => {props.handleSignup(e, email, password)}}>
      <h3>Sign Up</h3>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
}

export default Signup;
