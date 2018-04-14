import React, { Component } from 'react';
import firebase from 'firebase'
import { withRouter } from 'react-router-dom';
/*import { auth } from './firebase';*/

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignIn extends Component { 
    constructor(props) {
    super(props);
    this.state = {INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
      email,
      password,
  } = this.state;


    const {
      history,
    } = this.props;  

    firebase.auth().SignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/askq');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }
  
  render () {  
      const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === ''; 

      return (
        <div className='mainBox'>
          <h1>Sign in Here!</h1>
          <form className='formBox' onSubmit={this.onSubmit}>
            <input 
              className='inputField'
              type='text'
              placeholder='Email or Username'
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
            />
            <input
              className='inputField'
              type='password'
              placeholder='Password'
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
            />
            <p></p>
            <button
              disabled={isInvalid}
              className='submitButton'
              type='submit'
              onClick={() => this.signUp()}
            >
            Submit
            </button>
            { error && <p>{error.message}</p> } 
          </form>
        </div>  
      )
   }
}
export default withRouter(SignIn)
/*export default Signin*/



/*  render () {                                   
      return (
        <div>
             <div id='signinContainer'>
                  <form id='form' onSubmit={this.onSubmit}>       
                      <input className='input' type="text"   
                       placeholder="First Name"/>
                      <input className='input' type="text"  
                       placeholder="Last Name"/>          
                      <input className='input' type="text"  
                       placeholder="Email"/>          
                      <input className='input' type="password" 
                       placeholder="Password"/>
                      <button id='submit'>Sign Up</button>
                  </form>
             </div>
        </div>
      )
   }
}*/