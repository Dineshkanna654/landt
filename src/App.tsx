import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Invoice from './pages/billing';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>}/> 
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/billing" element={<Invoice/>}/>  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
