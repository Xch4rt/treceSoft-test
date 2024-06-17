import React from "react";
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const role = localStorage.getItem('role');

    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">
                    Dasboard
                </h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/dashboard/security" className="text-lg">
                                Seguridad
                            </Link>
                        </li>
                        {role === 'SuperAdmin' && (
                            <li>
                                <Link to="/dashboard/create-user" className="text-lg">Crear Usuario</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-"> <Outlet/> </main>
        </div>
    )
}

export default Dashboard;