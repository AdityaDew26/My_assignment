import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import EmpList from './Components/EmpList';
import CreateEmp from './Components/CreateEmp';

const App = () => {
    return ( <
        Router >
        <
        Header / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Login / > }
        /> <
        Route path = "/dashboard"
        element = { < Dashboard / > }
        /> <
        Route path = "/signup"
        element = { < Signup / > }
        /> 

        <
        Route path = "/emplist"
        element = { < EmpList / > }
        /> <
        Route path = "/createEmp"
        element = { < CreateEmp / > }
        /> < /
        Routes > <
        /Router>
    );
}

export default App;