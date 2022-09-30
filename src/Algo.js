import React, { useState, useEffect } from 'react';
import Board from "./Board";
import { getWinner, getBestMove } from "./helper";
import { Link } from 'react-router-dom';

const Algo = () => {
    const [currentPlayer,setCurrentPlayer] = useState('X');
    const [cells,setCells] = useState(Array(9).fill(""));
    const [move, setMove] = useState(0);//maximum value of move is 8. After 8 moves whole board is occupied.
    const [algoScore, setAlgoScore] = useState(0);//confident about the algo. So playerScore is always 0. No need to declare a state for that.
    const [gameNumber, setGameNumber] = useState(1);//players play multiple games taking turns to move first

    const resetBoard = () => {
        if(getWinner(cells)){//if there's a winner, it must be the algo
          setAlgoScore(algoScore + 1);
        }
        for(let i=0;i<9;i++){
          document.getElementById(i).innerText = "";
        }
        // console.log("in reset board call");
        setCells(Array(9).fill(""));
        setMove(0);
        setCurrentPlayer('X');
        setGameNumber(gameNumber + 1);
    };
    const isAlgoTurn = () => {
      return ((move % 2 && gameNumber % 2) || (move % 2 === 0 && gameNumber % 2 === 0));
    };
    
    const getMessage = () => {
        if(getWinner(cells)){
          setTimeout(resetBoard,2000);
          return `Algo won!`;
        }
        else if(move >= 9){
          setTimeout(resetBoard,1000);
          if(getWinner(cells)){
            return `Algo won!`;
          }
          else{
            return "Draw!";
          }
        }
        else{
          return `${ isAlgoTurn() ? `Algo's`: 'Your'} turn`;
        }
    };

    const handleCellClick = (event) => {
        if(event.target.innerText === "" && getWinner(cells) === null && isAlgoTurn() === false ){
          event.target.innerText = currentPlayer;
          cells[event.target.id] = currentPlayer;
          setCells(cells);
          setMove(move + 1);
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if( ((move % 2 && gameNumber % 2) || (move % 2 === 0 && gameNumber % 2 === 0)) && move <= 8){
                console.log("best algo find use effect executed!", move, gameNumber);
                let bestAlgoMove = Math.floor((Math.random() * 9));//if algo starts first, start with any cell
                if(move !== 0)
                  bestAlgoMove = getBestMove([...cells], currentPlayer, move)[0];
                document.getElementById(bestAlgoMove).innerText = currentPlayer;
                cells[bestAlgoMove] = currentPlayer;
                setCells(cells);
                setMove(move + 1);
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            }
        }, 1000)
        
    }, [move, cells, currentPlayer, gameNumber])

    /*changing state re-renders the component. So every time cellClick happens, state changes => re-render
    Hence getMessage() is getting the correct message regarding the state of the game.*/
    return (
        <React.Fragment>
            <div className="ui container">
                <h2 style={{textAlign: 'center', color: 'royalblue'}} className='ui item center'>{getMessage()}</h2>
                <Board onCellClick={handleCellClick}/>
            </div>
            <div style={{color: 'blue', fontSize:'2.5vh', marginTop: '10px'}}>Algorithm Score: {algoScore} Your Score: 0</div>
            <div style={{marginTop: '10px'}}><span>Note: The game restarts after 2 seconds of previous game.<br></br>Algorithm moves first in each alternate game.</span></div>
            <main style={{marginTop: '20px'}}>
                <h3>Want to play against a friend?</h3>
            </main>
            <nav>
                <Link to="/">Play against a friend</Link>
            </nav>
        </React.Fragment>
    );
};

export default Algo;