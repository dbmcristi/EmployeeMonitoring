import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

type Task = {
    id: number;
    description: string;
    employeeId: number;
    manager: string;
};

const EmployeePage: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const employeeId = params.get('employeeId');
    const employeeIdNum = employeeId ? Number(employeeId) : null;

    const [selectedHour, setSelectedHour] = useState<number>(0);
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
    const [selectedSeconds, setSelectedSeconds] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!employeeIdNum) return;

        const handleUnload = (event: BeforeUnloadEvent) => {
            const url = `http://localhost:8080/logout/${employeeIdNum}`;
            navigator.sendBeacon(url);
        };

        window.addEventListener('unload', handleUnload);
        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, [employeeIdNum]);

    const handlePatch = async () => {
        if (!employeeIdNum) return;

        try {
            const response = await fetch(`http://localhost:8080/timetable/${employeeIdNum}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hour: selectedHour,
                    minutes: selectedMinutes,
                    seconds: selectedSeconds,
                }),
            });

            if (!response.ok) throw new Error('Failed to patch timetable');
        } catch (error) {
            console.error(error);
            alert('Error updating timetable');
        }
    };

    const generateOptions = (count: number) =>
        Array.from({length: count}, (_, i) => (
            <option key={i} value={i}>
                {String(i).padStart(2, '0')}
            </option>
        ));

    useEffect(() => {
        if (!employeeIdNum) return;

        fetch(`http://localhost:8080/task/${employeeIdNum}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch tasks');
                return res.json();
            })
            .then((data: Task[]) => setTasks(data))
            .catch((err) => console.error('Error loading tasks:', err));
    }, [employeeIdNum]);

    return (
        <div  style={{textAlign: 'center', fontFamily: 'sans-serif'}}>
        <div >
            <h1>EMPLOYEE ID {employeeId}</h1>
            {/* Time Selection */}
            <div>
                <label style={{fontWeight: 'bold', marginRight: '10px'}}>Select Time:</label>
                <input
                    type="time"
                    value={`${String(selectedHour).padStart(2, '0')}:${String(selectedMinutes).padStart(2, '0')}:${String(selectedSeconds).padStart(2, '0')}`}
                    step="1"
                    onChange={(e) => {
                        const [hour, minute, second] = e.target.value.split(':').map(Number);
                        setSelectedHour(hour);
                        setSelectedMinutes(minute);
                        setSelectedSeconds(second);
                    }}
                    // style={{
                    //     padding: '8px',
                    //     fontSize: '16px',
                    //     borderRadius: '8px',
                    //     border: '1px solid #ccc',
                    // }}
                />
            </div>

            {/* PATCH Button */}
            <button
                onClick={handlePatch}
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                Update Timetable
            </button>

            {/* Task List */}
            <div style={{marginTop: '40px'}}>
                <h2>Your Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No tasks assigned.</p>
                ) : (
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                style={{
                                    background: '#f0f0f0',
                                    margin: '10px auto',
                                    padding: '10px',
                                    maxWidth: '400px',
                                    borderRadius: '8px',
                                }}
                            >
                                <strong>Task #{task.id}</strong>: {task.description}
                                <br/>
                                <small>Manager: {task.manager}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <style>
                {`
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
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
        </div>
    );
};

export default EmployeePage;
