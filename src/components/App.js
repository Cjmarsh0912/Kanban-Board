import React from 'react';
import './App.css';
import Header from './Header';
import Board from './Board';
import Card from './Card';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
