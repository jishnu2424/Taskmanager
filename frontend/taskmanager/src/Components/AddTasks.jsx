import React, { useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/addtask.css'
 
function AddTasks() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to submit a task.');
      navigate('/login');
      return;
    }

    const isTokenExpired = (token) => {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    };

    if (isTokenExpired(token)) {
      alert('Session expired. Please log in again.');
      navigate('/login');
      return;
    }

    const owner = JSON.parse(localStorage.getItem('userId')); 
    const taskData = {
      img: image,
      title,
      task,
      owner,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/task/add/', taskData, config);

      if (response.status === 200) {
        alert('Task added successfully!');
        navigate('/user');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <Form className="daform" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formImageLink">
          <Form.Label className="daff1">Add Image Link</Form.Label>
          <Form.Control
            className="dadf2"
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={handleImageChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTaskTitle">
            <Form.Label className="daff1">Task Title</Form.Label>
            <Form.Control
              className="daf2"
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTaskContent">
            <Form.Label className="ddaff1">Task Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Task Description"
              className="ddfa"
              rows={6}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" className="dab1" type="submit">
          Add Task
        </Button>
        <Link to={'/user'}>
          <Button className="dab1">Back to Home</Button>
        </Link>
      </Form>
    </div>
  );
}

export default AddTasks;
