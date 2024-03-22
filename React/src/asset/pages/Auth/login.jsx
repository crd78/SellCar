import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'

const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username:'caca',
        password:'pipi'
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
             [e.target.name]: e.target.value
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials)
        axios.post('http://localhost:3000/auth/login', credentials)
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))

    }

    return (
     
        <form onSubmit={onSubmit}>
            <div className="form-container">  
                <div className="group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={credentials.username} onChange={onChange}/>
                </div>
                <div className="group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>
                <div className="group">
                    <button type="submit">Login</button>
                </div>
            </div>
        </form>
    );
}

export default Login;