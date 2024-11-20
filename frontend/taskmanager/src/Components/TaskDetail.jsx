import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Modal, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../Style/taskdetail.css'

function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/task/viewbyid/${id}`);
                setTask(response.data);
                setTitle(response.data.title);
                setDescription(response.data.task);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the task:", error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/task/delete/${id}`);
                navigate("/user");
            } catch (error) {
                console.error("Error deleting the task:", error.response ? error.response.data : error.message);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedTask = { title, task: description };

        try {
            const response = await axios.patch(`http://localhost:5000/task/update/${id}`, updatedTask, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.status === 200) {
                alert("Task updated successfully!");
                setShowModal(false);
                setTask({ ...task, title, task: description });
            }
        } catch (error) {
            console.error("Error updating the task:", error.response ? error.response.data : error.message);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <Card.Img variant="top" src={task.img || "default-image.jpg"} />
                            <Card.Body>
                                <Card.Title><b>Title :</b>{task.title} </Card.Title>
                                <Card.Text><b>Task Detail :</b>{task.task}</Card.Text>

                                <Button variant="primar" onClick={handleShowModal} className="me-2">
                                    Update Task
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete Task
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Modal for Updating Task */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formTaskTitle">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaskContent" className="mt-3">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                required
                            />
                        </Form.Group>

                        <div className="mt-3">
                            <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TaskDetail;
