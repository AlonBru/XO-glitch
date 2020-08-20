import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Modal } from '@material-ui/core';
import Axios from 'axios';
import HallOfFame from './HallOfFame';
import chicken from './chicken.png'

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
    const [winnerName,setWinnerName] = useState("")
    const [gameStart,setGameStart] = useState((new Date().getTime())/1000)
    const [winTime,setWinTime] = useState(0)

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
        if(step===0){setGameStart((new Date().getTime())/1000)}
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
          if (!winTime){setWinTime((new Date().getTime())/1000)}
          if (!gameIsWon&&resultLogged===false) {setGameIsWon(true)}
      } else { 
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }
      
      return (
        <div className="game">
            <div className="play-area" >
                <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
                <div className='status' >
                    {status}
                    <ol>{moves}</ol>
                </div>
             </div>
        
          <HallOfFame/>
          <p>{gameStart}</p>
          <Modal  open={gameIsWon&& !resultLogged} onClose={(e)=>{
        //   <Modal  open={/*gameIsWon&& !resultLogged*/ true} onClose={(e)=>{
              if(resultLogged)
              setGameIsWon(false);
            }}>
            <div className="winModal">
                <img className='chicken' src={chicken} alt='WINNER WINNER' />
                <label className='winnerInput' htmlFor='input'>
                Champion, enter thy name!
                    <input 
                        placeholder= ''
                        onChange={(e)=>{
                            let query= e.target.value;
                            setWinnerName(query);
                    }} />
                    <button onClick={()=>{
                        const date = new Date();
                        let winnerObject ={
                            winnerName: winnerName,
                            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                            gameDuration: Math.round(winTime-gameStart)+' seconds'
                            }
                        setResultLogged(true);
                        console.log(winnerObject)
                        Axios.post('/api/v1/records', winnerObject);
                    }}> ⸙ Perpetuate your Triumph ⸙ </button>                
                </label>
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