import React, { useEffect, useState } from 'react';

type Employee = {
    employeeId: number;
    username: string;
    beginTime: string;
};

const ManagerPage: React.FC = () => {
    const managerId = localStorage.getItem('managerId');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/employee/all/present')
            .then((response) => {
                if (!response.ok) throw new Error('Error loading employee');
                return response.json();
            })
            .then((data: Employee[]) => {
                setEmployees(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async () => {
        setSubmitError(null);
        setSubmitSuccess(null);

        if (!selectedEmployeeId || !taskDescription || !managerId) {
            setSubmitError('Fill before submitting...');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8080/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: taskDescription,
                    employeeId: selectedEmployeeId,
                    managerId: managerId,
                }),
            });

            if (!response.ok) throw new Error('Error');

            setSubmitSuccess('The task has been submitted successfully.');
            // After setSubmitSuccess()
            window.dispatchEvent(new CustomEvent('sendTask', {
                detail: {
                    task: taskDescription,
                    employeeId: selectedEmployeeId!,
                },
            }));

            setTaskDescription('');
            setSelectedEmployeeId(null);
        } catch (err: any) {
            setSubmitError(err.message || 'Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>MANAGER ID {managerId}</h1>

            {loading && <p style={{ textAlign: 'center' }}>Se încarcă angajații...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {!loading && !error && (
                <div>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        Select an employee:
                        <select
                            value={selectedEmployeeId ?? ''}
                            onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        >
                            <option value="">-- Choose an employee --</option>
                            {employees.map((emp) => (
                                <option key={emp.employeeId} value={emp.employeeId}>
                                    {emp.username} (ID: {emp.employeeId}) - beginning: {emp.beginTime}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        Task description:
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Description..."
                            rows={4}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{ padding: '10px 20px', width: '100%', backgroundColor: '#4CAF50', color: 'white' }}
                    >
                        {isSubmitting ? 'Loading' : 'Send task'}
                    </button>

                    {submitError && <p style={{ color: 'red', marginTop: '10px' }}>{submitError}</p>}
                    {submitSuccess && <p style={{ color: 'green', marginTop: '10px' }}>{submitSuccess}</p>}
                </div>
            )}
        </div>
    );
};

export default ManagerPage;