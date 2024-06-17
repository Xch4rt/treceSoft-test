import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Security = () => {
    const [users, setUsers] = useState([]);
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:3000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Usuarios</h2>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border-b'>ID</th>
                        <th className='py-2 px-4 border-b'>Username</th>
                        <th className='py-2 px-4 border-b'>Email</th>
                        <th className='py-2 px-4 border-b'>Name</th>
                        <th className='py-2 px-4 border-b'>Role</th>
                        {role === 'SuperAdmin' && (
                            <th className='py-2 px-4 border-b'>Acciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className='py-2 px-4 border-b'>{user.id}</td>
                            <td className='py-2 px-4 border-b'>{user.username}</td>
                            <td className='py-2 px-4 border-b'>{user.email}</td>
                            <td className='py-2 px-4 border-b'>{user.name}</td>
                            <td className='py-2 px-4 border-b'>{user.role}</td>
                            {role === 'SuperAdmin' && (
                                <td className='py-2 px-4 border-b'>
                                    <button className='mr-2 py-1 px-3 bg-blue-500 text-white rounded'>Edit</button>
                                    <button className='py-1 px-3 bg-red-500 text-white rounded'>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Security;