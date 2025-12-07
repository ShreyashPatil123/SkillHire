import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Profile from './pages/Profile';
import MilestoneWorkflow from './pages/MilestoneWorkflow';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Landing />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="projects/:id" element={<ProjectDetail />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="profile/:id" element={<Profile />} />
                            <Route path="workflow/:projectId" element={<MilestoneWorkflow />} />
                        </Route>
                    </Routes>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
