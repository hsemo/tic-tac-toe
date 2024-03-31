
export default function Square(props){
  return (
    <button
      className={`square${props.isWinSquare ? ' win-square' : ''}`}
      onClick={props.onSquareClick}
    >
      {props.value}
    </button>
  );
}

