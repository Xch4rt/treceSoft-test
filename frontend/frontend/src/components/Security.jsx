import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Security = () => {
    const [users, setUsers] = useState([]);
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axios.get((role === 'SuperAdmin') ? 'http://localhost:3000/api/users' : `http://localhost:3000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(role === 'SuperAdmin' ? response.data : [response.data]);
            } catch (error) {
                console.log('Error fetching users: ', error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Usuarios</h2>
            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border-b text-gray-700'>ID</th>
                        <th className='py-2 px-4 border-b text-gray-700'>Username</th>
                        <th className='py-2 px-4 border-b text-gray-700'>Email</th>
                        <th className='py-2 px-4 border-b text-gray-700'>Name</th>
                        <th className='py-2 px-4 border-b text-gray-700'>Role</th>
                        {role === 'SuperAdmin' && (
                            <th className='py-2 px-4 border-b text-gray-700'>Acciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className='py-2 px-4 border-b text-gray-700'>{user.id}</td>
                            <td className='py-2 px-4 border-b text-gray-700'>{user.username}</td>
                            <td className='py-2 px-4 border-b text-gray-700'>{user.email}</td>
                            <td className='py-2 px-4 border-b text-gray-700'>{user.name}</td>
                            <td className='py-2 px-4 border-b text-gray-700'>{user.role}</td>
                            {role === 'SuperAdmin' && (
                                <td className='py-2 px-4 border-b'>
                                    <button className='mr-2 py-1 px-3 bg-blue-500 text-white rounded text-gray-700'>Edit</button>
                                    <button className='py-1 px-3 bg-red-500 text-white rounded text-gray-700'>Delete</button>
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