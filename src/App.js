import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import NotFound from './components/NotFound';
import RepoDetailsPage from './pages/RepoDetailsPage';
import CommitDetailsPage from './pages/CommitDetailsPage';
import ReleaseDetailsPage from './pages/ReleaseDetailsPage';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/repo/:owner/:repo" element={<RepoDetailsPage />} />
                    <Route path="/repo/:owner/:repo/commit/:commitSha" element={<CommitDetailsPage />} />
                    <Route path="/repo/:owner/:repo/releases/:releaseId" element={<ReleaseDetailsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
