import React, { useState, useEffect } from 'react';
import Board from "./Board";
import { getWinner, getBestMove } from "./helper";
import { Link } from 'react-router-dom';

const Algo = () => {
    const [currentPlayer,setCurrentPlayer] = useState('X');
    const [cells,setCells] = useState(Array(9).fill(""));
    const [move, setMove] = useState(0);//maximum value of move is 8. After 8 moves whole board is occupied.
    //const [algoScore, setAlgoScore] = useState(0);//confident about the algo. So playerScore is always 0. No need to declare a state for that.

    const resetBoard = () => {
        for(let i=0;i<9;i++){
          document.getElementById(i).innerText = "";
        }
        // console.log("in reset board call");
        setCells(Array(9).fill(""));
        setMove(0);
        setCurrentPlayer('X');
    };

    const getMessage = () => {
        if(getWinner(cells)){
          setTimeout(resetBoard,2000);
          return `${getWinner(cells) === 'O' ? "Algo" : "You"} won!`;
        }
        else if(move >= 9){
          setTimeout(resetBoard,1000);
          if(getWinner(cells)){
            return `${getWinner(cells) === 'O' ? "Algo" : "You"} won!`;
          }
          else{
            return "Draw!";
          }
        }
        else{
          return `${move % 2 ? `Algo's`: 'Your'} turn`;
        }
    };

    const handleCellClick = (event) => {
        if(event.target.innerText === "" && getWinner(cells) === null && move % 2 === 0){
          event.target.innerText = currentPlayer;
          cells[event.target.id] = currentPlayer;
          setCells(cells);
          setMove(move + 1);
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if(move % 2 && move <= 8){
                const bestAlgoMove = getBestMove([...cells], currentPlayer, move)[0];
                document.getElementById(bestAlgoMove).innerText = currentPlayer;
                cells[bestAlgoMove] = currentPlayer;
                setCells(cells);
                setMove(move + 1);
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            }
        }, 1000)
        
    }, [move, cells, currentPlayer])

    /*changing state re-renders the component. So every time cellClick happens, state changes => re-render
    Hence getMessage() is getting the correct message regarding the state of the game.*/
    return (
        <React.Fragment>
            <div className="ui container">
                <h2 style={{textAlign: 'center', color: 'royalblue'}} className='ui item center'>{getMessage()}</h2>
                <Board onCellClick={handleCellClick}/>
            </div>
            <div style={{marginTop: '10px'}}><span>Note: The game restarts after 2 seconds of previous game.</span></div>
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