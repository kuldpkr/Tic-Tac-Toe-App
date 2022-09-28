import React, { useState } from 'react';
import Board from './Board';
import { getWinner } from './helper';
import { Link } from 'react-router-dom';

function TwoPlayer() {
  const [currentPlayer,setCurrentPlayer] = useState('X');
  const [cells,setCells] = useState(Array(9).fill(""));
  const [move, setMove] = useState(0);

  const handleCellClick = (event) => {
    if(event.target.innerText === "" && getWinner(cells) === null){
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
    // console.log("in reset board");
    setCells(Array(9).fill(""));
    setMove(0);
    setCurrentPlayer('X');
  };

  const getMessage = () => {
    if(getWinner(cells)){
      setTimeout(resetBoard,2000);
      return `${getWinner(cells)} won!`;
    }
    else if(move >= 9){
      setTimeout(resetBoard,1000);
      if(getWinner(cells)){
        return `${getWinner(cells)} won!`;
      }
      else{
        return "Draw!";
      }
    }
    else{
      return `${move % 2 ? 'O': 'X'}'s turn`;
    }
  };

  return (
    <React.Fragment>
      <div className="ui container">
        <h2 style={{textAlign: 'center', color: 'royalblue'}} className='ui item center'>{getMessage()}</h2>
        <Board onCellClick={handleCellClick}/>
      </div>
      <div style={{marginTop: '10px'}}><span>Note: The game restarts after 2 seconds of previous game.</span></div>
      
      <main style={{marginTop: '20px'}}>
        <h3>Want to play against the algorithm written by me?</h3>
      </main>
      <nav>
        <Link to="/algo">Play against the Algo</Link>
      </nav>
    </React.Fragment>
  );
}

export default TwoPlayer;
