import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterEmployee from './RegisterEmployee';

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    const toggleMode = () => {
        setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
                        {mode === 'login' ? 'Bine ai venit înapoi' : 'Crează un cont nou'}
                    </h1>
                    <button
                        onClick={toggleMode}
                        className="mt-4 sm:mt-0 text-blue-600 font-medium hover:underline transition"
                    >
                        {mode === 'login'
                            ? 'Nu ai cont? Înregistrează-te'
                            : 'Ai deja cont? Autentifică-te'}
                    </button>
                </div>
                <div className="border-t pt-8">
                    {mode === 'login' ? <LoginForm /> : <RegisterEmployee />}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
