import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../Style/landing.css';

function Landing() {
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:5000/task/viewall/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <Container fluid="md">
        <Row noGutters className="justify-content-start">
          {tasks.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="Lcard">
                <Card.Img 
                  variant="top" 
                  src={item.img || 'default-image.jpg'} 
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.task}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {tasks.length === 0 && <p>No tasks available</p>}
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
