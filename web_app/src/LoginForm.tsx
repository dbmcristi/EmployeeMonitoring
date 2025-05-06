import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        console.log('LoginForm mounted');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let endpoint = '';

            if (userType === 'manager') {
                endpoint = 'http://localhost:8080/login/manager';
            } else if (userType === 'angajat') {
                endpoint = 'http://localhost:8080/login/employee';
            } else {
                throw new Error('Wrong user type');
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Wrong username or password');
            }

            const data = await response.json();
            console.log('Login success:', data);
            if (userType !== 'manager') {
                localStorage.setItem('employeeId', data.id);
            } else {
                localStorage.setItem('managerId', data.id);
            }
            setSuccess(true);
            if (userType === 'manager') {
                navigate(`/manager?managerId=${data.id}`);
            } else {
                navigate(`/employee?employeeId=${data.id}`);
            }
        } catch (err: any) {
            setError(err.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="login-container"
        >
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

            <main className="login-card">
                <header className="login-header">
                    <h1>Authentificate</h1>
                    <p>Login to continue</p>
                </header>

                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <label htmlFor="username">User name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="nume.exemplu"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <fieldset>
                        <div className="login-form">
                            <legend >User type:</legend>

                            <label>
                                <input
                                    type="radio"
                                    name="user-type"
                                    value="manager"
                                    checked={userType === 'manager'}
                                    onChange={() => setUserType('manager')}
                                    required
                                /> Manager
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="user-type"
                                    value="angajat"
                                    checked={userType === 'angajat'}
                                    onChange={() => setUserType('angajat')}
                                    required
                                /> Employee
                            </label>
                        </div>
                    </fieldset>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Authentification'}
                    </button>

                    {error && <p className="message error">{error}</p>}
                    {success && <p className="message success">Success</p>}
                </form>

                <footer className="footer">
                    &copy; 2025 Employee Monitoring.
                </footer>
            </main>
        </div>
    );
};

export default LoginForm;
