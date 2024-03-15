import {useState} from 'react';
import Board from './Board.js';


export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortOrder, setSortOrder] = useState(true); // true means ascending and false otherwise
  const xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nxtHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nxtHistory);
    setCurrentMove(nxtHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = [...history.map((squares, move) => {
    let desc;
    if(!sortOrder){
      move = history.length - 1 - move;
    }

    if(move > 0){
      desc = 'Go to move #' + move;
    } else {
      desc = 'Go to Game start.'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  }), <li key={history.length}>
        <p>You are at move #{history.length}</p>
      </li>
    ]

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
      </div>
      <div className="game-info">
        <button onClick={() => setSortOrder(!sortOrder)}>Change sort order to {sortOrder ? 'descending' : 'ascending'}</button>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
