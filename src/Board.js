import Square from './Square.js';


export default function Board({boardRows, xIsNext, squares, onPlay, onWin, winner, isDraw}){

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
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        onWin(squares[a]);
        return [a, b, c];
      }
    }

    onWin(null);
    return null;
  }

  function handleClick(index, row, col){
    calculateWinner();
    if(squares[index] || winner){
      return;
    }
    let nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay({nextSquares, nextMovePos: [row, col]});
  }

  let status = '';
  let winSquares = calculateWinner();
  if(winner && winSquares){
    status = 'Winner: ' + winner;
  } else if(isDraw){
    status = "It's a draw";
  } else{
    status = 'Next turn: ' + (xIsNext ? 'X' : 'O');
  }

  let rows = [...Array(boardRows)].map((el, ir) => {
    const sqrs = [...Array(boardRows)].map((el, ic) => {
      let t = boardRows * ir + ic;
      let [row, col] = [ir, ic];

      return(<Square
        key={t}
        value={squares[t]}
        onSquareClick={() => handleClick(t, row, col)}
        isWinSquare={ (winner && winSquares && winSquares.indexOf(t) >= 0) ? true : false}></Square>);
    });

    return <div className="board-row">{sqrs}</div>;
  });

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">{rows}</div>
    </>
  );
}
