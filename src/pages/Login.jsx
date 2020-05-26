import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout, signup } from '../store/actions/userActions.js'

class Login extends Component {
  state = {
    msg: '',
    loginCred: {
      userName: '',
      password: ''
    },
    signupCred: {
      userName: '',
      password: '',
      fullName: ''
    },
    showSignupSection: false,
    imgUrl: ''
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { userName, password } = this.state.loginCred;
    if (!userName || !password) {
      return this.setState({ msg: 'Please enter both User-Name and Password' });
    }
    const userCreds = { userName, password };
    this.props.login(userCreds)
      .then(res => {
        const { loggedInUser } = this.props;
        // console.log('loggedInUser', loggedInUser);
<<<<<<< HEAD
        if (loggedInUser.userName !== "Guest") {
=======
        if (loggedInUser.userName !== 'Guest') {
>>>>>>> or
          this.props.history.push(`/`)
        }
        else this.setState({ msg: 'User-Name / Password is incorrect' })
      })

     // 5ecaec6c25278e479037e6cd
    // this.setState({ loginCred: { userName: '', password: '' } }, () => {
    // const { loggedInUser } = this.props;
    // console.log('loggedInUser', loggedInUser);
    // if (loggedInUser._id !== "5ecaec6c25278e479037e6cd" ) {
    //   this.props.history.push(`/`)
    // }
    // else this.setState({ msg: 'User-Name / Password is incorrect' })
    // })
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { userName, password, fullName } = this.state.signupCred;
    const { imgUrl } = this.state;
    if (!userName || !password || !fullName) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    const signupCreds = { userName, password, fullName, imgUrl };
    const userCreds = { userName, password };
    this.props.signup(signupCreds);
    this.props.login(userCreds);
    this.setState({ signupCred: { userName: '', password: '', fullName: '' } }, () => {
      this.props.history.push(`/`);
    })
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  // doSignup = async ev => {
  //   ev.preventDefault();

  showWidget = (ev, widget) => {
    ev.preventDefault();
    widget.open()
  }

  checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      this.setState((prevState) => {
        return {
          imgUrl: resultEvent.info.secure_url
        }
      })
    }
  }

  render() {
    console.log('hello')
    let signupSection = (
      <form onSubmit={this.doSignup}>
        <input
          type="text"
          name="userName"
          value={this.state.signupCred.userName}
          onChange={this.signupHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <br />
        <input
          type="text"
          name="fullName"
          value={this.state.signupCred.fullName}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <br />
        <button className="save-button" variant="contained" color="primary" onClick={(ev) => {

          this.showWidget(ev, widget);
        }
        }>Upload Profile image</button>
        {this.state.imgUrl && <img className="profile-img" alt="" src={this.state.imgUrl} />}
        <button>Signup</button>
      </form>
    );
    let loginSection = (
      <form onSubmit={this.doLogin}>
        <input
          type="text"
          name="userName"
          value={this.state.loginCred.userName}
          onChange={this.loginHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    );

    const { loggedInUser } = this.props;

    // console.log('loggedInUser', loggedInUser);
    // console.log(this.state.imgUrl)

    let widget = window.cloudinary.createUploadWidget({
      cloudName: 'dsqh7qhpg',
      uploadPreset: 'lh8fyiqe',
      // cropping: true,
      // croppingCoordinatesMode: 'custom',
      // gravity: 'custom',
      croppingAspectRatio: 1,
      maxFiles: 1
    }, (error, result) => { this.checkUploadResult(result) })


    return (
      <div className="test">
        <h1>
          Log-in
        </h1>
        <h2>{this.state.msg}</h2>
        {(loggedInUser && loggedInUser.userName === "Guest") && (
          <div>
            <h2>Welcome: {loggedInUser.fullName} </h2>
          </div>
        )}

        {(loggedInUser && loggedInUser.userName !== "Guest") &&
          <button onClick={() => { this.props.login({ userName: "Guest", password: "1" }) }}>Log-Out</button>}

        {(loggedInUser && loggedInUser.userName === "Guest") && loginSection}

        {(loggedInUser && loggedInUser.userName === "Guest") &&
          <button onClick={() => { this.props.login({ userName: "Guest", password: "1" }); this.props.history.push(`/`) }}>Continue as Guest</button>}

        {!this.state.showSignupSection &&
          (loggedInUser &&
            loggedInUser.userName === "Guest") &&
          <button onClick={() => { this.setState({ showSignupSection: true }); }}>Signup</button>}


        {this.state.showSignupSection && signupSection}




        {/* <h2>Login</h2>
        <form>div</form>

        <h2>Signup</h2>
        <form></form> */}

        <hr />
        {/* <button onClick={this.props.loadUsers}>Get All Users</button>
        {this.props.isLoading && 'Loading...' }
        {this.props.users && <ul>

          {this.props.users.map(user => (
            <li key={user._id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <button
                onClick={() => {
                  this.removeUser(user._id);
                }}
              >
                Remove {user.fullName}
              </button>
            </li>
          ))}
        </ul>} */}
      </div>
    );
  }




  //   showWidget = (widget) => {
  //     widget.open()
  // }

  // checkUploadResult = (resultEvent) => {
  //     if (resultEvent.event === 'success') {
  //         this.setState((prevState) => {
  //             return {
  //                 imgUrl: [...prevState.imgUrls,resultEvent.info.secure_url]
  //             }
  //         })
  //     }
  // }

  // render() {
  //     // console.log(this.state.imgUrls)
  //     let widget = window.cloudinary.createUploadWidget({
  //         cloudName: 'dsqh7qhpg',
  //         uploadPreset: 'lh8fyiqe' ,
  //         //cropping:true
  //         // maxFiles:1
  //     }, (error, result) => { this.checkUploadResult(result) })\

  // <Button className="save-button" variant="contained" color="primary" onClick={() => this.showWidget(widget)}>Upload Profile image</Button> */}


}

const mapStateToProps = state => {
  return {
    // users: state.user.users,
    loggedInUser: state.userStore.loggedInUser,
    // isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  signup,
  logout,
  //   removeUser,
  //   loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
