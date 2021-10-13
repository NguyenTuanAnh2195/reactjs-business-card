import React, { Component } from 'react';
import Nav from './components/auth/Nav';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import APIV1 from './api/v1/config';

const apiInterface = new APIV1({});

class App extends Component {
  state: {
    email: string,
    loggedIn: boolean,
    displayedForm: string,
  }
  constructor(props: Object) {
    super(props);
    this.state = {
      displayedForm: '',
      loggedIn: localStorage.getItem('token') ? true : false,
      email: ''
    };
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      fetch('http://localhost:8000/accounts/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ email: json.email });
        });
    }
  }

  handleLogin = ( email: string, password: string) => {
    apiInterface.client.post('http://127.0.0.1:8000/accounts/token-auth', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'email': email,
        'password': password
      }
    })
      .then(res => console.log(res))
      // .then(res => res.json())
      // .then(json => {
      //   localStorage.setItem('token', json.data.token);
      //   this.setState({
      //     loggedIn: true,
      //     displayedForm: '',
      //     email: json.user.email
      //   });
      // });
  };

  handleSignup = (e: Event, data: Object) => {
    e.preventDefault();
    fetch('http://localhost:8000/accounts/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          loggedIn: true,
          displayedForm: '',
          email: json.email
        });
      });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, email: '' });
  };

  displayForm = (form: string) => {
    this.setState({
      displayedForm: form
    });
  };

  render() {
    let form;
    switch (this.state.displayedForm) {
      case 'login':
        form = <Login handleLogin={this.handleLogin} />;
        break;
      case 'signup':
        form = <Signup handleSignup={this.handleSignup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          loggedIn={this.state.loggedIn}
          displayForm={this.displayForm}
          handleLogout={this.handleLogout}
        />
        {form}
        <h3>
          {this.state.loggedIn
            ? `Hello, ${this.state.email}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

export default App;
