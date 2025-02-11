import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/userSlice';
import { Table, Button, Container, Modal } from 'react-bootstrap';

const Home = () => {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelectedUserId(id);
        setShow(true);
    };

    const handleDelete = () => {
        if (selectedUserId !== null) {
            dispatch(deleteUser(selectedUserId));
            setShow(false);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">User List</h2>
            <Link to="/add">
                <Button variant="primary" className="mb-3">Add User</Button>
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`}>
                                    <Button variant="warning" size="sm" className="me-2">Update</Button>
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleShow(user.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No users available</td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Home;
