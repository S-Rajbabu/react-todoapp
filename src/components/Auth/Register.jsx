import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';

// Register component
const Register = () => {
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);  // Debugging the form values
      console.log("Form errors:", formik.errors); // Check for validation errors

      if (Object.keys(formik.errors).length === 0) {
        login(values);  // Assuming login method works fine
        setMessage('Successfully registered!');
        setTimeout(() => {
          navigate('/login');  // Redirect to login page after 1 seconds
        }, 1000); // 1-second delay before navigation
      } else {
        setMessage('Please correct the errors in the form.');
      }
    }
  });

  return (
    <div className="auth-container">
      <div className="auth-right">
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <h2>Registration Form</h2>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            placeholder="Insert your name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            placeholder="Insert your email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
            placeholder="Insert your password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <button type="submit" className="auth-button">Register</button>

          {message && <div className={message.includes('successfully') ? "success" : "error"}>{message}</div>}
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
