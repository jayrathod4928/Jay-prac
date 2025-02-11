import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddEditForm from './components/AddEditForm';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEditForm />} />
            <Route path="/edit/:id" element={<AddEditForm />} />
        </Routes>
    );
};

export default App;
