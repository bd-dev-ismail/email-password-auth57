import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';
const auth = getAuth(app)
const RegisterReactBootstrap = () => {
    const [passwordError , setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const handalRegister = (event)=>{
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        //validate password
        if (!/(?=.*[A-Z]).*[A-Z]/.test(password)) {
           return setPasswordError('Please provide at least Two Uppercase');
        }
        if(password.length < 6){
            return setPasswordError("Password should be provied at least 6 digits");
        }
        if (!/[!@#$%&*_]/.test(password)){
            return setPasswordError(
              "Password should be One need Specail Charectar"
            );
        }
        setPasswordError('')
          createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              setSuccess(true);
              form.reset();
              verifyemail();
              updateUserName(name);
            })
            .catch((error) => {
              console.error(error);
              setPasswordError(error.message);
            });
    }

    const verifyemail = ()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            return alert('please check your email! we send a verifycation Messege')
        })
        
    }
    const updateUserName = (name)=>{
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then(()=>{
            console.log('display name updated');
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
      <div className="w-50 mx-auto">
        <h3 className="text-primary my-5">Please Register</h3>
        <Form onSubmit={handalRegister}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <p className="text-danger">{passwordError}</p>
          {success && <p className="text-success">User Create Successfully</p>}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <small>
          <p>
            All ready have an account? Please <Link to="/login">LogIn</Link>
          </p>
        </small>
      </div>
    );
};

export default RegisterReactBootstrap;