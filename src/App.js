
import './App.css';
import { testGetAll } from './api'
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

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
    console.log('button clicked', {response})
    setIsLoading(false)
  }
  const handleClick111 = async () => {
    await fetch(`http://localhost:8000/api/chat`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log('api fetched', {data})
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Test Api call</button>
        <button onClick={handleClick111}>Test Fetch call</button>
        
      </header>
    </div>
  );
}

export default App;
