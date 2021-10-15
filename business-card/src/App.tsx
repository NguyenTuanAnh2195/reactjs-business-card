import React, { Component } from 'react';
import { AxiosResponse } from 'axios';

import APIV1 from './api/v1/config';
import { User } from './components/interfaces';
import Nav from './components/auth/Nav';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UserProfile from './components/user/UserProfile';
import UserTable from './components/user/UserTable';

interface LoginAPIResponse {
  data: {
    token: string,
    user: User
  },
}

interface SignupAPIResponse {
  data: {
    token: string,
    first_name: string,
    last_name: string,
    email: string,
    age: number,
    job_title: string,
    employer: string,
    city: string,
    birth_day: any,
    phone_number: string,
    profile_picture: File | null,
  },
}

interface CurrentUserAPIResponse {
  data: {
    first_name: string,
    last_name: string,
    email: string,
    age: number,
    job_title: string,
    employer: string,
    city: string,
    birth_day: any,
    phone_number: string,
    profile_picture: File | null,
  },
}

const apiInterface = new APIV1({});

class App extends Component {
  state: {
    email: string,
    loggedIn: boolean,
    displayedForm: string,
    user: User,
    editedUser: User,
    userList: Array<User>,
    showComponent: string,
    
  }

  constructor(props: Object) {
    super(props);
    this.state = {
      displayedForm: '',
      loggedIn: localStorage.getItem('token') ? true : false,
      email: '',
      user: {} as User,
      userList: [],
      showComponent: '',
      editedUser: {} as User,
    };
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      apiInterface.client.request<unknown, CurrentUserAPIResponse>({
        method: 'get',
        url: '/accounts/current-user',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.data.email) {
            this.setState({ user: response.data });
          }
        });
    }
  }

  handleLogin = (e: Event, email: string, password: string) => {
    e.preventDefault();
    apiInterface.client.request<unknown, LoginAPIResponse>({
      method: 'post',
      url: '/accounts/token-auth',
      data: {
        'email': email,
        'password': password
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.setState({
          loggedIn: true,
          displayedForm: '',
          user: response.data.user,
          showComponent: 'detail'
        });
      })
      .catch(() => {
        alert("Invalid Credentials")
      });

    
  };

  handleSignup = (e: Event, email: string, password: string) => {
    e.preventDefault();
    apiInterface.client.request<unknown, SignupAPIResponse>({
      method: 'post',
      url: '/accounts/signup',
      data: {
        'email': email,
        'password': password
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.setState({
          loggedIn: true,
          displayedForm: '',
          user: response.data,
          showComponent: 'detail'

        });
      })
      .catch(error => {
        alert(error.response.data.email);
      });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, user: {}, showUserList: false });
  };

  displayForm = (form: string) => {
    this.setState({
      displayedForm: form
    });
  };

  toggleComponent = (component: string, user: User | null = null) => {
    if (user) {
      this.setState({
        showComponent: component,
        editedUser: user
      });
    } else {
      this.setState({
        showComponent: component,
        editedUser: {} as User
      });
    }

    
  };

  showUserProfile = (user: User, editingAnother: boolean = false) => {
    return (
      <UserProfile
        user={user}
        editingAnother={editingAnother}
        toggleComponent={this.toggleComponent}
        editedUser={this.state.editedUser}
      />
    )
  }

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
          showComponent={this.state.showComponent}
          toggleComponent={this.toggleComponent}
          user={this.state.user}
        />
        {form}
        <h3>{this.state.loggedIn ? `Logged in as ${this.state.user.email}` : 'Please Log In'}</h3>
        {
          this.state.showComponent === 'detail' &&
          this.state.loggedIn &&
          !this.state.editedUser.email &&
          this.showUserProfile(this.state.user)
        }
        {
          this.state.showComponent === 'detail' &&
          this.state.loggedIn &&
          this.state.editedUser.email &&
          this.showUserProfile(this.state.editedUser, true)
        }
        {
          this.state.showComponent === 'list' &&
          this.state.loggedIn &&
          this.state.user.is_staff &&
          <UserTable
            showComponent={this.state.showComponent}
            toggleComponent={this.toggleComponent}
            showUserProfile={this.showUserProfile}
          />
        }
      </div>
    );
  }
}

export default App;
