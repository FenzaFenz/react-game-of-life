import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameOfLife from './components/game-of-life/game-of-life';

function App() {
  return (
    <GameOfLife size={25} />
  );
}

export default App;
