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
                throw new Error('Trebuie selectat un tip de utilizator');
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Autentificare eșuată');
            }

            const data = await response.json();
            console.log('Login success:', data);
            if (userType!== 'manager') {
                localStorage.setItem('employeeId', data.id);

             }

            setSuccess(true);

// After login success
            if (userType === 'manager') {
                navigate('/manager');
            } else {
                navigate('/employee');
            }
        } catch (err: any) {
            setError(err.message || 'A apărut o eroare');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4 py-8">
            <main className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Autentificare</h1>
                    <p className="text-sm text-gray-500 mt-1">Intră în contul tău pentru a continua</p>
                </header>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">
                            Nume utilizator
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="nume.exemplu"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
                            Parolă
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* User type */}
                    <fieldset className="border-t pt-4">
                        <legend className="text-md font-semibold text-gray-700 mb-2">Tip de utilizator</legend>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-gray-700">
                                <input
                                    type="radio"
                                    name="user-type"
                                    value="manager"
                                    checked={userType === 'manager'}
                                    onChange={() => setUserType('manager')}
                                    required
                                    className="accent-blue-600"
                                />
                                Manager
                            </label>
                            <label className="flex items-center gap-2 text-gray-700">
                                <input
                                    type="radio"
                                    name="user-type"
                                    value="angajat"
                                    checked={userType === 'angajat'}
                                    onChange={() => setUserType('angajat')}
                                    required
                                    className="accent-green-600"
                                />
                                Angajat
                            </label>
                        </div>
                    </fieldset>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md transition duration-200 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Se autentifică...' : 'Autentificare'}
                    </button>

                    {/* Messages */}
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-600 text-sm mt-2">Autentificare reușită!</p>}
                </form>

                <footer className="mt-6 text-center text-xs text-gray-400">
                    &copy; 2025 Monitorizare Angajați. Toate drepturile rezervate.
                </footer>
            </main>
        </div>
    );
};

export default LoginForm;
