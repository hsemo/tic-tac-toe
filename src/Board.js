import {useState} from 'react';


function calculateWinner(squares){
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns){
    const [a, b, c] = pattern;
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}

function Square(props){
  return <button className="square" onClick={props.onSquareClick}>{props.value}</button>
}


function Board({xIsNext, squares, onPlay}){
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    let squaresCopy = squares.slice();
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    onPlay(squaresCopy);
  }

  let status = '';
  let winner = calculateWinner(squares);
  if(winner){
    status = 'Winner: ' + winner;
  } else {
    status = 'Next turn: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div class="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
        </div>
      </div>
    </>
  );
}


export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nxtHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nxtHistory);
    setCurrentMove(nxtHistory.length - 1);
  }

  function jumpTo(nextMove){
    // setHistory(history.slice(0, nextMove));
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let desc;
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
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
