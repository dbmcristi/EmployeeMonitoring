import React, { useEffect } from 'react';

const EmployeePage: React.FC = () => {
    const employeeId = localStorage.getItem('employeeId');

    useEffect(() => {
        const handleUnload = (event: BeforeUnloadEvent) => {
            // Use navigator.sendBeacon for reliability on page unload
            const url = `http://localhost:8080/logout/${employeeId}`;
            navigator.sendBeacon(url);
        };

        window.addEventListener('unload', handleUnload);
//TO DO add pub sub
        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, [employeeId]);

    return <h1 style={{ textAlign: 'center' }}>EMPLOYEE</h1>;
};

export default EmployeePage;
