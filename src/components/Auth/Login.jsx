import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/Auth.css'; 

// Login component
const Login = () => {
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  // Initialize Formik with form values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    // Validation schema using Yup
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: values => {
      login(values);
      setMessage('Login successful!');
      navigate('/todos'); // Redirect to the todos page after login
    }
  });

  return (
    <div className="auth-container">

      <div className="auth-right">
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...formik.getFieldProps('email')} placeholder="Insert your email" />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...formik.getFieldProps('password')} placeholder="Insert your password" />
          {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}

          <button type="submit" className="auth-button">Sign In</button>
          {message && <div className="success">{message}</div>}
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
      </div>

    </div>
  );
};

export default Login;
