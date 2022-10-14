import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app)
const LoginBootstarp = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const handalLogin = (e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
        })
        .catch(error=>{
            console.error(error);
        })
    }
    const handalEmailBlur = (event)=>{
        const email= event.target.value;
        setUserEmail(email);
        console.log(email);
    }
    const handalForgetPassword = ()=>{
        if(!userEmail){
            return alert('Please enter your Email address!')
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(()=>{
            return alert('Reset Password Email Sent! Please check your Email');
        })
        .then(error=>{
            console.error(error);
        })
    }
    return (
      <div className="w-50 mx-auto">
        <h3 className="text-success">Please Login: </h3>
        <form onSubmit={handalLogin}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Email
            </label>
            <input
            
              type="email"
              onBlur={handalEmailBlur}
              name="email"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Your Email"
              required
            />
          </div>
          {success && <p className='text-success'>Successfully Login Your Account</p>}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <small>
          <p>
            New to this website? Please <Link to="/register">Register</Link>
          </p>
          <p>Forget Password? <button type='button' onClick={handalForgetPassword} className='btn btn-link'> Reset Password</button></p>
        </small>
      </div>
    );
};

export default LoginBootstarp;