
import './App.css';
import { testGetAll } from './api'
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ChatPage from './pages/Chat';
import HomePage from './pages/Home';
import { AppProvider } from './context';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<ChatPage />} path='/chat' />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
