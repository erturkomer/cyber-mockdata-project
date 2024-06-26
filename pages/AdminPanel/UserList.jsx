 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const userList = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}users`)
            setUsers(response.data);
        }
        userList()
    }, [])

    const deleteUser = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}users/${id}`)
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div>
            <Link to="/adminpanel" style={{ textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
                <button style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    padding: '10px 20px',
                    margin: "4px"
                }}>
                    Back
                </button>
            </Link>
            <h1>User List</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Full Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>User Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Registration Date</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.id}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.email}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.fullName}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.userName}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <span style={{marginRight:"4px"}}>{user.registrationDate.day}.</span>
                                <span style={{marginRight:"4px"}}>{user.registrationDate.month}.</span>
                                <span style={{marginRight:"16px"}}>{user.registrationDate.year}</span>
                                <span style={{marginRight:"8px"}}>hour:{user.registrationDate.hour}</span>
                                <span style={{marginRight:"8px"}}>minute:{user.registrationDate.minute}</span>
                                <span style={{marginRight:"8px"}}>second:{user.registrationDate.second}</span>
                            </td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        padding: '4px 8px'
                                    }}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
