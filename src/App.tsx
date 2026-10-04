import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import NewProjectPage from './pages/NewProjectPage';
import DeploymentPage from './pages/DeploymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/new" element={<NewProjectPage />} />
        <Route path="/project/:id" element={<DeploymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
