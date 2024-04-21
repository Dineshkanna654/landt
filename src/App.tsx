import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>}/> 
          <Route path="/dashboard" element={<Dashboard/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
