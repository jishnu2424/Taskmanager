import React, { useState, useContext } from 'react'; 
import { Button } from 'react-bootstrap';
import "../Style/login.css";
import logimg from '../Assets/4a903338c0e478248153bd8f3f6f6745-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { UserContext } from '../Context'; 

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      toast.error('Please enter your email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/auth/login/user', formData);
  
      if (response.status === 200) {
        const { token, data } = response.data;
  
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(data)); 
        setUser(data); 
        toast.success(`Welcome back, ${data.username}!`);
  
        navigate('/user');
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <>    
      <div style={{ backgroundColor: "white", height: "800px" }}>

        <h1 className='llh1'>Login to your account</h1>

        <form className='loginform' onSubmit={handleSubmit}>
          <label htmlFor="email" className='ll1'>Email</label>
          <input
            type="email"
            name="email"
            placeholder='Email'
            className='logininput'
            value={formData.email}
            onChange={handleChange}
          /><br />

          <label htmlFor="password" className='ll1'>Password</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            className='logininput'
            value={formData.password}
            onChange={handleChange}
          />
          <br /><br />

          <Button className='loginbtn' type='submit'>Login</Button>
          <br />

          <h3>New User?</h3>
          <br />
          <Link to={'/register'}>
            <Button className='loginbtn' type='button'>Register</Button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
