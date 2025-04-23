import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import ClinicList from './pages/ClinicList';
import AddClinic from './pages/AddClinic';
import ManageClinics from './pages/ManageClinics';
import NotFound from './pages/NotFound';
import ClinicDetail from './components/ClinicDetail';
import EditClinic from './components/EditClinic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<ClinicList />} />
          <Route path="/clinics/:id" element={<ClinicDetail />} />
          <Route path="/add-clinic" element={<AddClinic />} />
          <Route path="/manage-clinics" element={<ManageClinics />} />
          <Route path="/edit-clinic/:id" element={<EditClinic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" />
      </Layout>
    </Router>
  );
}

export default App;
