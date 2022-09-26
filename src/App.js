import React, { useState } from 'react';
import './App.css';
import Board from './Board';

function App() {
  const [currentPlayer,setCurrentPlayer] = useState('X');
  const [cells,setCells] = useState(Array(9).fill(""));
  const [move, setMove] = useState(0);

  const getWinner = () => {
    //row check
    if(cells[0] !== "" && cells[0] === cells[1] && cells[0] === cells[2])
      return cells[0];
    if(cells[3] !== "" && cells[3] === cells[4] && cells[3] === cells[5])
      return cells[3];
    if(cells[6] !== "" && cells[6] === cells[7] && cells[6] === cells[8])
      return cells[6];

    //column check
    if(cells[0] !== "" && cells[0] === cells[3] && cells[0] === cells[6])
      return cells[0];
    if(cells[1] !== "" && cells[1] === cells[4] && cells[1] === cells[7])
      return cells[1];
    if(cells[2] !== "" && cells[2] === cells[5] && cells[2] === cells[8])
      return cells[2];

    //diagonal check
    if(cells[0] !== "" && cells[0] === cells[4] && cells[0] === cells[8])
      return cells[0];
    if(cells[2] !== "" && cells[2] === cells[4] && cells[2] === cells[6])
      return cells[2];
    
    return null;
  };

  const handleCellClick = (event) => {
    if(event.target.innerText === "" && getWinner() === null){
      event.target.innerText = currentPlayer;
      cells[event.target.id] = currentPlayer;
      setCells(cells);
      setMove(move + 1);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetBoard = () => {
    for(let i=0;i<9;i++){
      document.getElementById(i).innerText = "";
    }
    setCells(Array(9).fill(""));
    setMove(0);
    setCurrentPlayer('X');
  };

  const getMessage = () => {
    if(getWinner()){
      setTimeout(resetBoard,2000);
      return `${getWinner()} won!`;
    }
    else if(move >= 9){
      setTimeout(resetBoard,1000);
      if(getWinner()){
        return `${getWinner()} won!`;
      }
      else{
        return "Draw";
      }
    }
    else{
      return `${move % 2 ? 'O': 'X'}'s turn`;
    }
  };

  return (
    <React.Fragment>
      <h1 style={{fontSize: '3em', textAlign: 'center'}}>Tic Tac Toe</h1>
      <div className="ui container">
        <h2 style={{textAlign: 'center', color: 'royalblue'}} className='ui item center'>{getMessage()}</h2>
        <Board onCellClick={handleCellClick}/>
      </div>
      <div style={{marginTop: '10px'}}><span>Note: The game restarts after 2 seconds of previous game.</span></div>
    </React.Fragment>
  );
}

export default App;
