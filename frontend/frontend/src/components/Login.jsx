import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth', {
                username,
                password
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.user.role);
            console.log('Login exitoso')

            navigate('/dashboard');

        } catch (err) {
            setError('Login Failed. Please check your credentials and try again');
            console.log(err);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center '>
            <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4 text-center text-gray-700'>
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="username" className='bloc text-sm font-medium text-gray-700'>Username</label>
                        <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50' required/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50' required/>
                    </div>
                    <div className='mb-4 text-right'>
                        <a href="#" className='text-sm text-blue-600 hover:underline'>Se te olvido tu contraseña?</a>
                    </div>
                    <button type='submit' className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;