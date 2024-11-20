import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context';
import '../Style/user.css';

function User() {
  const { user, loading } = useContext(UserContext); 
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/task/view', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to fetch blogs. Please try again later.");
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); 
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  if (!user) {
    return <div className="no-user">No user found. Please log in.</div>;
  }

  return (
    <div className="user-page">
      <div className="user-info">
        <h1 className="home-title">Home Page</h1>
        <h2 className="user-name">User Name: {user?.username}</h2>
        <h4 className="user-email">Email: {user?.email}</h4>
        <h5 className="user-number">Number: {user?.number}</h5>
      </div>

      {error && <Alert className="error-alert" variant="danger">{error}</Alert>}

      <Container fluid="md" className="task-container">
        <Row className="task-row">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Col key={task._id} md={6} lg={4} className="task-col">
                <Link to={`/user/task/${task._id}`} className="task-link">
                  <Card className="task-card">
                    <Card.Img
                      variant="top"
                      src={task.img || 'defaultimg.jpg'}
                      className="task-image"
                    />
                    <Card.Body className="task-card-body">
                      <Card.Title className="task-title">Blog Title: {task.title}</Card.Title>
                      <Card.Text className="task-content">
                        Content: {task.task} <br />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <div className="no-tasks">No Tasks available</div>
          )}
        </Row>
      </Container>

      <Link to="/addtask" className="add-task-link">
        <Button className="add-task-button">Add Tasks</Button>
      </Link>
    </div>
  );
}

export default User;
