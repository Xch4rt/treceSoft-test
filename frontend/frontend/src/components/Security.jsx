import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Security = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    role === 'SuperAdmin'
                        ? 'http://localhost:3000/api/users'
                        : `http://localhost:3000/api/users/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setUsers(role === 'SuperAdmin' ? response.data : [response.data]);
            } catch (error) {
                console.log('Error fetching users: ', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/roles', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setRoles(response.data);
            } catch (error) {

            }
        }

        fetchUsers();
        fetchRoles();
    }, [role, userId]);

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setUsers(users.filter(user => user.id !== userIdToDelete));
        } catch (error) {
            console.log('Error deleting user:', error);
        }
        setShowConfirmationModal(false);
    };

    const handleEditUser = (user) => {
        setUserIdToEdit(user.id);
        setIsEditing(true);
        setEditedUserData({ 
            username: user.username,
            email: user.email,
            name: user.name,
            roleId: ''+user.roleId, 
        });
    };

    const handleAcceptEdit = async () => {
        const { username, email, name, roleId } = editedUserData;
       
        try {
            await axios.patch(`http://localhost:3000/api/users/${userIdToEdit}`, { username, email, name, roleId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const updatedUsers = users.map(user =>
                user.id === userIdToEdit ? { ...user, username, email, name, role: roles.find(r => r.id === roleId) } : user
            );
            setUsers(updatedUsers);
            setIsEditing(false);
            setUserIdToEdit(null);
        } catch (error) {
            console.log('Error updating user: ', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setUserIdToEdit(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Usuarios</h2>
            {showConfirmationModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <p className='text-gray-700'>¿Estás seguro de que quieres eliminar este usuario?</p>
                        <div className="flex justify-end mt-4">
                            <button className="mr-2 px-3 py-1 bg-red-500 text-white rounded-md" onClick={handleDeleteUser}>Eliminar</button>
                            <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md" onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
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
                            <td className='py-2 px-4 border-b text-gray-700'>
                                {isEditing && userIdToEdit === user.id ? (
                                    <input type="text" name="username" value={editedUserData.username} onChange={handleChange} />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td className='py-2 px-4 border-b text-gray-700'>
                                {isEditing && userIdToEdit === user.id ? (
                                    <input type="text" name="email" value={editedUserData.email} onChange={handleChange} />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className='py-2 px-4 border-b text-gray-700'>
                                {isEditing && userIdToEdit === user.id ? (
                                    <input type="text" name="name" value={editedUserData.name} onChange={handleChange} />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className='py-2 px-4 border-b text-gray-700'>
                            {isEditing && userIdToEdit === user.id ? (
                                <select name='role' value={editedUserData.role} onChange={handleChange}>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.description}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                user.role
                            )}
                            
                            </td>
                            {role === 'SuperAdmin' && (
                                <td className='py-2 px-4 border-b'>
                                    {isEditing && userIdToEdit === user.id ? (
                                        <>
                                            <button className='mr-2 py-1 px-3 bg-green-500 text-white rounded text-gray-700' onClick={handleAcceptEdit}>Aceptar</button>
                                            <button className='py-1 px-3 bg-red-500 text-white rounded text-gray-700' onClick={handleCancelEdit}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='mr-2 py-1 px-3 bg-blue-500 text-white rounded text-gray-700' onClick={() => handleEditUser(user)}>Editar</button>
                                            <button className='py-1 px-3 bg-red-500 text-white rounded text-gray-700' onClick={() => {
                                                setUserIdToDelete(user.id);
                                                setShowConfirmationModal(true);
                                            }}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Security;
