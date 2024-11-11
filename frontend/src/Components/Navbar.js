import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css'; // Make sure you have styles for the navbar
import axios from 'axios';

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    // Get the username from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername); // Set username if it exists in localStorage
        }
    }, []);

    const handleLogout = async() => {
        try {
            // Call the backend API to handle logout
            await axios.post('http://localhost:5000/api/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in Authorization header
                },
            });

            // Remove the username and token from localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('token');

            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return ( <
            nav className = "navbar" >
            <
            ul className = "nav-links" >
            <
            li >
            <
            Link to = "/dashboard"
            className = "nav-link" > Home < /Link> < /
            li > <
            li >
            <
            Link to = "/emplist"
            className = "nav-link" > Employee List < /Link> < /
            li > <
            /ul> {
            username && ( <
                ul className = "user-info" >
                <
                li >
                <
                span className = "welcome-message" > Welcome, { username } < /span> < /
                li > <
                li >
                <
                button className = "logout-button"
                onClick = { handleLogout } > Logout < /button> < /
                li > <
                /ul>
            )
        } <
        /nav>
);
};

export default Navbar;