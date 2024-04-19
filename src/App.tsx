import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<div>welcome to dashboard</div>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
