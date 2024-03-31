import Square from './Square.js';


export default function Board({boardRows, xIsNext, squares, onPlay, winner, winSquares}){

  function handleClick(index, row, col){
    if(squares[index] || winner){
      return;
    }
    let nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay({nextSquares, nextMovePos: [row, col]});
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
    <div className="board">{rows}</div>
  );
}
