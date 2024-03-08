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


function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    let squaresCopy = squares.slice();
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
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
  return (
    <div className="game">
      <div className="game-board">
        <Board></Board>
      </div>
      <div className="game-info">
        {/* TODO */}
      </div>
    </div>
  );
}
