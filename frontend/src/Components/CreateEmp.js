import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/emplist.css'; // Custom CSS for styling

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
        image: '',
        id: '', // Make sure we also track the employee's ID for updating
    });

    // Fetch employee data from the backend when the component mounts
    useEffect(() => {
        axios.get('/api/employees')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    // Handle delete employee
    const handleDelete = (id) => {
        axios.delete(`/api/employees/${id}`)
            .then(() => {
                setEmployees(employees.filter((employee) => employee._id !== id)); // Fixed to match with MongoDB's default _id
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
            });
    };

    // Handle edit employee (open input fields for updating)
    const handleEdit = (id) => {
        const employee = employees.find((emp) => emp._id === id); // Fixed to match with MongoDB's default _id
        if (employee) {
            setNewEmployee({...employee }); // Populate the input fields for editing
        }
    };

    // Handle change in input fields
    const handleChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value,
        });
    };

    // Handle adding new employee
    const handleAddEmployee = () => {
        axios.post('/api/employees', newEmployee)
            .then((response) => {
                setEmployees([...employees, response.data]);
                setNewEmployee({
                    name: '',
                    email: '',
                    mobileNo: '',
                    designation: '',
                    gender: '',
                    course: '',
                    image: '',
                    id: '', // Reset ID after adding
                });
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
            });
    };

    // Handle updating employee
    const handleUpdateEmployee = () => {
        axios.put(`/api/employees/${newEmployee._id}`, newEmployee) // Use _id for updating
            .then((response) => {
                setEmployees(employees.map((emp) => emp._id === response.data._id ? response.data : emp));
                setNewEmployee({
                    name: '',
                    email: '',
                    mobileNo: '',
                    designation: '',
                    gender: '',
                    course: '',
                    image: '',
                    id: '', // Reset ID after updating
                });
            })
            .catch((error) => {
                console.error('Error updating employee:', error);
            });
    };

    return ( <
        div className = "employee-list-container" >
        <
        h1 > Employee List < /h1>

        { /* Form for Add/Edit Employee */ } <
        div className = "employee-form" >
        <
        input type = "text"
        name = "name"
        value = { newEmployee.name }
        onChange = { handleChange }
        placeholder = "Name" /
        >
        <
        input type = "email"
        name = "email"
        value = { newEmployee.email }
        onChange = { handleChange }
        placeholder = "Email" /
        >
        <
        input type = "text"
        name = "mobileNo"
        value = { newEmployee.mobileNo }
        onChange = { handleChange }
        placeholder = "Mobile No." /
        >
        <
        input type = "text"
        name = "designation"
        value = { newEmployee.designation }
        onChange = { handleChange }
        placeholder = "Designation" /
        >
        <
        input type = "text"
        name = "gender"
        value = { newEmployee.gender }
        onChange = { handleChange }
        placeholder = "Gender" /
        >
        <
        input type = "text"
        name = "course"
        value = { newEmployee.course }
        onChange = { handleChange }
        placeholder = "Course" /
        >
        <
        input type = "file"
        name = "image"
        value = { newEmployee.image }
        onChange = { handleChange }
        placeholder = "Image URL" /
        >
        <
        button onClick = { newEmployee.id ? handleUpdateEmployee : handleAddEmployee } > { newEmployee.id ? 'Update Employee' : 'Add Employee' } <
        /button> < /
        div >

        { /* Employee list display */ } <
        div className = "employee-list" > {
            employees.map((employee) => ( <
                div key = { employee._id }
                className = "employee-item" >
                <
                h3 > { employee.name } < /h3> <
                p > { employee.email } < /p> <
                button onClick = {
                    () => handleEdit(employee._id)
                } > Edit < /button> <
                button onClick = {
                    () => handleDelete(employee._id)
                } > Delete < /button> < /
                div >
            ))
        } <
        /div> < /
        div >
    );
};

export default EmployeeList;