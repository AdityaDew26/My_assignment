import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/signup.css'

const Signup = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [error, setError] = useState('');

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const handleSignup = async(e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password });
                localStorage.setItem('token', response.data.token);
                window.location.href = '/'; // Redirect to login after successful signup
            } catch (err) {
                setError('Signup failed. Please try again.');
            }
        };

        return ( <
            div className = "Signup-container" >
            <
            h3 > Signup < /h3> <
            form onSubmit = { handleSignup } >
            <
            input type = "text"
            name = "name"
            id = "name"
            placeholder = "Enter your name"
            value = { name }
            onChange = {
                (e) => setName(e.target.value)
            }
            /> <
            input type = "email"
            name = "email"
            id = "email"
            placeholder = "Enter your email"
            value = { email }
            onChange = {
                (e) => setEmail(e.target.value)
            }
            /> <
            div style = {
                { position: 'relative' }
            } >
            <
            input type = { showPassword ? 'text' : 'password' }
            name = "password"
            id = "password"
            placeholder = "Enter your password"
            value = { password }
            onChange = {
                (e) => setPassword(e.target.value)
            }
            style = {
                { paddingRight: '40px' }
            } // Space for the icon
            /> <
            FontAwesomeIcon icon = { showPassword ? faEyeSlash : faEye }
            onClick = { togglePasswordVisibility }
            style = {
                {
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                }
            }
            /> < /
            div > {
                error && < p style = {
                    { color: 'red' }
                } > { error } < /p>} <
                button type = "submit" > Signup < /button> < /
                form > <
                p >
                Already have an account ? < Link to = "/login" > Login < /Link> here. < /
                p > <
                /div>
            );
        };

        export default Signup;