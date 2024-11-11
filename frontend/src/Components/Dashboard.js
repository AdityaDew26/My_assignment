import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Import the Navbar component

const Dashboard = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage if the user is authenticated
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUsername(parsedUser.name);
        } else {
            // If user is not logged in, redirect to login page
            window.location.href = '/';
        }
    }, []);

    return ( <
        div className = "dashboard" >
        <
        Navbar / > <
        h1 > Welcome to your Dashboard < /h1> {
        username && < p > Hello, { username }! < /p>} < /
        div >
    );
};

export default Dashboard;