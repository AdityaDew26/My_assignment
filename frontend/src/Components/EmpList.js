import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/emplist.css'; // Custom CSS for styling
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch employee data from the backend when the component mounts
    useEffect(() => {
        axios.get('/api/employees') // Endpoint to fetch employee list
            .then((response) => {
                setEmployees(response.data); // Assuming response.data contains the list of employees
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    // Handle delete employee
    const handleDelete = (id) => {
        // Send delete request to backend
        axios.delete(`/api/employees/${id}`)
            .then(() => {
                setEmployees(employees.filter((employee) => employee._id !== id)); // Use _id if backend sends it
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
            });
    };

    // Handle edit employee (you can redirect to an edit page or open a modal)
    const handleEdit = (id) => {
        console.log('Edit employee with ID:', id);
        // Optionally redirect or open modal to edit employee
    };

    return ( <
        div >
        <
        Navbar / >

        <
        div className = "employee-list-container" >
        <
        Link to = "/createEmp" >
        <
        button > +Create < /button> < /
        Link > <
        h1 > Employee List < /h1> <
        table className = "employee-table" >
        <
        thead >
        <
        tr >
        <
        th > ID < /th> <
        th > Image < /th> <
        th > Name < /th> <
        th > Email < /th> <
        th > Mobile No. < /th> <
        th > Designation < /th> <
        th > Gender < /th> <
        th > Course < /th> <
        th > Create Date < /th> <
        th > Actions < /th> < /
        tr > <
        /thead> <
        tbody > {
            employees.map((employee) => ( <
                tr key = { employee._id } > <
                td > { employee._id } < /td>  <
                td >
                <
                img src = { employee.image || 'default-avatar.jpg' }
                alt = { employee.name }
                className = "employee-image" /
                >
                <
                /td> <
                td > { employee.name } < /td> <
                td > { employee.email } < /td> <
                td > { employee.mobileNo } < /td> <
                td > { employee.designation } < /td> <
                td > { employee.gender } < /td> <
                td > { employee.course } < /td> <
                td > { new Date(employee.createDate).toLocaleDateString() } < /td> <
                td >
                <
                button className = "edit-button"
                onClick = {
                    () => handleEdit(employee._id)
                } // Use _id for edit
                >
                Edit <
                /button> <
                button className = "delete-button"
                onClick = {
                    () => handleDelete(employee._id)
                } // Use _id for delete
                >
                Delete <
                /button> < /
                td > <
                /tr>
            ))
        } <
        /tbody> < /
        table > <
        /div> < /
        div >
    );
};

export default EmployeeList;