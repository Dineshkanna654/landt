import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'; // Import Routes

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<div>welcome to dashboard</div>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
