import {useState} from 'react';
import Board from './Board.js';


function Game(){
  const boardRows = 3;

  const [history, setHistory] = useState([{squares: Array(boardRows ** 2).fill(null), movePos: [-1, -1]}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortOrder, setSortOrder] = useState(true); // true means ascending and false otherwise
  const [winner, setWinner] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  let currentSquares = [...history[currentMove].squares];
  const isDraw = !winner && history.length - 1 === (boardRows ** 2) && currentMove === history.length - 1;


  function calculateWinner(){
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
      if(currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]){
        if(!winner){
          // to prevent infinite re-renders
          setWinner(currentSquares[a]);
        }
        return [a, b, c];
      }
    }

    if(winner){
      // to prevent infinite re-renders
      setWinner(null);
    }
    return null;
  }

  function handlePlay({nextSquares, nextMovePos}){
    const nxtHistory = [...history.slice(0, currentMove + 1), {squares: nextSquares, movePos: nextMovePos}];
    setHistory(nxtHistory);
    setCurrentMove(nxtHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  let winSquares = calculateWinner();
  const moves = [...history.map(({squares, movePos}, move) => {
    let desc;
    if(!sortOrder){
      move = history.length - 1 - move;
    }

    if(move > 0){
      desc = 'Move #' + move + ' (' + history[move].movePos + ')';
    } else {
      desc = 'Start'
    }

    return (
      <li key={move}>
        <button className="btn move-btn" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
    }),(winner || isDraw)
        ? null
        :
          <li key={history.length}>
            <p className="next-move">{`You are at move #${currentMove + 1}`}</p>
          </li>
  ];

  let status = '';
  if(winner && winSquares){
    status = 'Winner: ' + winner;
  } else if(isDraw){
    status = "It's a draw";
  } else{
    status = 'Next turn: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>

        <Board
          boardRows={boardRows}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winner={winner}
          winSquares={winSquares}
        >
        </Board>
      </div>

      <div className="game-info">
        <div className="sort">
          <button
            className="btn sort-btn"
            onClick={() => setSortOrder(!sortOrder)}
            dataSymbol={sortOrder ? '⥥' : '⥣'}
          >Sort to</button>

          {/*<p className="sort-symbol">{sortOrder ? '⥥' : '⥣'}</p>*/}
        </div>

        <ul>
          {moves}
        </ul>
      </div>
    </div>
  );
}

export default Game;
