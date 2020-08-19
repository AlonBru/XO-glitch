import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Modal } from '@material-ui/core';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
function Board (props) {
    const renderSquare = (i) => {
      return <Square 
      value={ props.squares[i]} 
      onClick = {()=> props.onClick(i)}/>;
    }   
    return (
    <div>
        <div className="board-row">
        { renderSquare(0)}
        { renderSquare(1)}
        { renderSquare(2)}
        </div>
        <div className="board-row">
        { renderSquare(3)}
        { renderSquare(4)}
        { renderSquare(5)}
        </div>
        <div className="board-row">
        { renderSquare(6)}
        { renderSquare(7)}
        { renderSquare(8)}
        </div>
    </div>
    );
  }
  
  function Game(){
      const [history,setHistory] = useState([{squares: Array(9).fill(null)}])
      const [xIsNext,setXIsNext] = useState(true)
      const [stepNumber,setStepNumber] = useState(0)
      const [gameIsWon,setGameIsWon] = useState(false)
      const [resultLogged,setResultLogged] = useState(false)
    
    function handleClick(i) {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? 'X' : 'O';
      
        setHistory (newHistory.concat([
            {
                squares: squares
            }
        ]))
          setStepNumber( newHistory.length)
          setXIsNext(!xIsNext)      
    }

    function jumpTo(step) {
        setGameIsWon(false);
        setResultLogged(false);
        setStepNumber( step);
        setXIsNext ((step % 2) === 0);
    }
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
        `Go to move #${move}`:
        `Go to game start`;
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if(winner){
          status = `Winner: ${winner}`;
          if (!gameIsWon&&resultLogged==false) {setGameIsWon(true)}
      } else { 
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }
      
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <Modal open={gameIsWon} onClose={(e)=>{
              setGameIsWon(false);
              setResultLogged(true);
            }}>
            <div>
               you win!
               <input placeholder='what is your name?'/>
            </div>
          </Modal>
        </div>
      );
    
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById('root'));

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }