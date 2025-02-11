import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addUser, updateUser } from '../redux/userSlice';
import { Form, Button, Container } from 'react-bootstrap';

const AddEditForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users.users);

    const existingUser = users.find((user) => user.id === id);
    const [formData, setFormData] = useState({
        name: existingUser ? existingUser.name : '',
        email: existingUser ? existingUser.email : '',
    });

    useEffect(() => {
        if (existingUser) {
            setFormData(existingUser);
        }
    }, [existingUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert("All fields are required!");
            return;
        }
        if (!id) {
            dispatch(addUser({ id: Date.now().toString(), ...formData }));
        } else {
            dispatch(updateUser({ id, ...formData }));
        }
        navigate('/');
    };

    return (
        <Container className="mt-5">
            <h2>{id ? 'Edit User' : 'Add User'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">{id ? 'Update' : 'Submit'}</Button>
            </Form>
        </Container>
    );
};

export default AddEditForm;
