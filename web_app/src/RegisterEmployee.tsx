import React, {useState} from 'react';

const RegisterEmployee: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // Simulate an API call
            const response = await fetch('http://localhost:8080/employee', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) throw new Error('Înregistrarea a eșuat');

            setSuccess(true);
            setUsername('');
            setPassword('');
        } catch (err: any) {
            setError(err.message || 'Eroare necunoscută');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h2 className="text-2xl font-bold mb-6">Înregistrare Angajat</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Nume complet
                    </label>
                    <input
                        id="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>



                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Parolă
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Înregistrează
                </button>

                {success && <p className="text-green-600 text-sm mt-2">Angajat înregistrat cu succes!</p>}
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterEmployee;
