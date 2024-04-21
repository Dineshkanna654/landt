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
          <Route path="/home" element={<div>welcome to home</div>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
