import React, { useState } from 'react';
import '../Style/register.css';
import logimg from '../Assets/4a903338c0e478248153bd8f3f6f6745-removebg-preview.png';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: ''
  });

  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, include a letter, a number, and a special character.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/add/user', formData);
      
      if (response.status === 200) {
        setFormData({ username: '', email: '', number: '', password: '' }); 
        navigate('/login'); 
      }
    } catch (err) {
      console.error('Registration Error:', err);
    }
  };

  return (
    <>    
      <div style={{ backgroundColor: "white", height: "950px" }}>

        <h1 className='rlh1'>Register your account</h1>

        <form className='regform' onSubmit={handleSubmit}>
          <label htmlFor="username" className='rl1'>Username</label>
          <input
            type="text"
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            className='reginput'
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <br />

          <label htmlFor="email" className='rl1'>Email</label>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='reginput'
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <br />

          <label htmlFor="number" className='rl1'>Number</label>
          <input
            type="text"
            name="number"
            placeholder='Number'
            value={formData.number}
            onChange={handleChange}
            className='reginput'
          /><br />

          <label htmlFor="password" className='rl1'>Password</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='reginput'
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <br /><br />
          
          <Button className='regbtn' type='submit'>Register</Button>
          <br />
          <h3>Already a User?</h3>
          <br />
          <Link to={'/login'}>
            <Button className='regbtn' type='button'>Login</Button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
