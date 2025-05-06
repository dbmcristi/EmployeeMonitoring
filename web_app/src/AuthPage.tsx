import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterEmployee from './RegisterEmployee';

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    const toggleMode = () => {
        setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    };

    return (
        <div className="login-header">
            <button
                onClick={toggleMode}
            >
                {mode === 'login' ? 'Register' : 'Login'}
            </button>
            {mode === 'login' ? <LoginForm /> : <RegisterEmployee />}
        </div>
    );


};

export default AuthPage;
