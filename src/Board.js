import React from "react";
import './Board.css';

const Board = (props) => {
    return (
        <div className="game-board">
            <div className="box" id="0" onClick={props.onCellClick}></div>
            <div className="box" id="1" onClick={props.onCellClick}></div>
            <div className="box" id="2" onClick={props.onCellClick}></div>
            <div className="box" id="3" onClick={props.onCellClick}></div>
            <div className="box" id="4" onClick={props.onCellClick}></div>
            <div className="box" id="5" onClick={props.onCellClick}></div>
            <div className="box" id="6" onClick={props.onCellClick}></div>
            <div className="box" id="7" onClick={props.onCellClick}></div>
            <div className="box" id="8" onClick={props.onCellClick}></div>
        </div>
    );
};

export default Board;