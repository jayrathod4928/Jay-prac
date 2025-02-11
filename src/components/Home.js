import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/userSlice';
import { Table, Button, Container } from 'react-bootstrap';

const Home = () => {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

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
                                <Button variant="danger" size="sm" onClick={() => dispatch(deleteUser(user.id))}>
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
        </Container>
    );
};

export default Home;
