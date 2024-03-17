import {useState} from 'react';
import Board from './Board.js';


function Game(){
  const boardRows = 3;

  const [history, setHistory] = useState([{squares: Array(boardRows ** 2).fill(null), movePos: [-1, -1]}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortOrder, setSortOrder] = useState(true); // true means ascending and false otherwise
  const [winner, setWinner] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove].squares;
  const isDraw = !winner && history.length - 1 === (boardRows ** 2) && currentMove === history.length - 1;

  function handlePlay({nextSquares, nextMovePos}){
    const nxtHistory = [...history.slice(0, currentMove + 1), {squares: nextSquares, movePos: nextMovePos}];
    setHistory(nxtHistory);
    setCurrentMove(nxtHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = [...history.map(({squares, movePos}, move) => {
    let desc;
    if(!sortOrder){
      move = history.length - 1 - move;
    }

    if(move > 0){
      desc = 'Go to move #' + move + ' at ' + history[move].movePos;
    } else {
      desc = 'Go to Game start.'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
    // }),(currentMove === history.length - 1 && (winner || isDraw))
    }),(winner || isDraw)
        ? null
        :
          <li key={history.length}>
            <p>{`You are at move #${currentMove + 1}`}</p>
          </li>
  ];

  return (
    <div className="game">
      <div className="game-board">
        <Board boardRows={boardRows}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          onWin={(winner) => setWinner(winner)}
          winner={winner}
          isDraw={isDraw}
        >
        </Board>
      </div>
      <div className="game-info">
        <button onClick={() => setSortOrder(!sortOrder)}>Change sort order to {sortOrder ? 'descending' : 'ascending'}</button>
        <ul>
          {moves}
        </ul>
      </div>
    </div>
  );
}

export default Game;
