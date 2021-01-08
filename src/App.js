import './App.css';
import Button from 'react-bootstrap/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="text-uppercase mb-3">Welcome</h2>
        <p>
          Course Management System
        </p>
        <a
          className="App-link"
          href="/login"
        >
          <Button variant="info">Get Started</Button>
        </a>
      </header>
    </div>
  );
}

export default App;
