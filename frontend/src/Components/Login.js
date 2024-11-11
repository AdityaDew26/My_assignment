import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login.css'

const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [showPassword, setShowPassword] = useState(false);

        const handleLogin = async(e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
                localStorage.setItem('token', response.data.token); // Save JWT token in localStorage
                window.location.href = '/dashboard'; // Redirect after successful login
            } catch (err) {
                setError('Login failed. Please check your credentials.');
            }
        };

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return ( <
            div className = "login-container" >
            <
            h3 > Login < /h3> <
            form onSubmit = { handleLogin } >
            <
            input type = "email"
            name = "email"
            id = "email"
            placeholder = "Enter your email"
            value = { email }
            onChange = {
                (e) => setEmail(e.target.value) }
            /> <
            div style = {
                { position: 'relative' } } >
            <
            input type = { showPassword ? 'text' : 'password' }
            name = "password"
            id = "password"
            placeholder = "Enter your password"
            value = { password }
            onChange = {
                (e) => setPassword(e.target.value) }
            style = {
                { paddingRight: '40px' } } // Space for the icon
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
            /> <
            /div> {
                error && < p style = {
                        { color: 'red' } } > { error } < /p>} <
                    button type = "submit" > Login < /button> <
                    /form> <
                    p >
                    New User ? < Link to = "/signup" > Signup < /Link> here. <
                    /p> <
                    /div>
            );
        };

        export default Login;