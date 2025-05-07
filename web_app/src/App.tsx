import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './AuthPage';
import EmployeePage from './EmployeePage';
import ManagerPage from './ManagerPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/employee" element={<EmployeePage />} />
                <Route path="/manager" element={<ManagerPage />} />
            </Routes>
        </Router>
    );
}

export default App;
