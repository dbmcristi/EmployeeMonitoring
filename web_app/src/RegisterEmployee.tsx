import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterEmployee: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:8080/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) throw new Error('Înregistrarea a eșuat');
            const data = await response.json();
            localStorage.setItem('employeeId', data.id);
            setSuccess(true);
            setUsername('');
            setPassword('');
            setTimeout(() => navigate(`/employee?employeeId=${data.id}`), 1500);
        } catch (err: any) {
            setError(err.message || 'Eroare necunoscută');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 >
                    Register Employee
                </h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div >
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            placeholder="Ex: Andrei Popescu"
                        />
                    </div>

                    <div >
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-md"
                    >
                        Register
                    </button>

                    {success && (
                        <p className="text-green-600 text-center text-sm mt-4 animate-pulse">
                            Success
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-center text-sm mt-4">
                            ❌ {error}
                        </p>
                    )}
                </form>
            </div>
            <style>
                {`
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to bottom right, #cce6ff, #ccffcc);
                }
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .login-card {
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 400px;
                }
                .login-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .login-header h1 {
                    margin: 0;
                    font-size: 28px;
                    color: #333;
                }
                .login-header p {
                    color: #777;
                    font-size: 14px;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .login-form label {
                    font-weight: bold;
                    margin-bottom: 5px;
                    color: #555;
                }
                .login-form input[type="text"],
                .login-form input[type="password"] {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    transition: border-color 0.3s;
                }
                .login-form input:focus {
                    border-color: #3399ff;
                    outline: none;
                }
                .login-form fieldset {
                    border: none;
                    margin: 0;
                    padding: 0;
                }
                .login-form legend {
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .login-form .user-types {
                    display: flex;
                    gap: 15px;
                }
                .login-form button {
                    padding: 12px;
                    background: linear-gradient(to right, #3399ff, #3366ff);
                    color: white;
                    font-weight: bold;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .login-form button:hover {
                    background: linear-gradient(to right, #3366ff, #3333ff);
                }
                .login-form button:disabled {
                    background: #999;
                    cursor: not-allowed;
                }
                .message {
                    text-align: center;
                    font-size: 14px;
                }
                .message.error {
                    color: red;
                }
                .message.success {
                    color: green;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #aaa;
                }
                `}
            </style>

        </div>
    );
};

export default RegisterEmployee;
