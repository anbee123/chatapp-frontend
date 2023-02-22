import logo from './logo.svg';
import './App.css';
import { testGetAll } from './api'
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const getAllData = async () => {
      const response = await testGetAll()
      console.log({response})
      setIsLoading(false)
    }
    getAllData()
  }, [])
  
  const handleClick = async () => {
    setIsLoading(true)
    const response = await testGetAll()
    console.log('888 3 button clicked', {response})
    setIsLoading(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>Test Api call</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
