import Circle from "../UIComponents/Circle";

function Game({ score, circles, stopHandler, clickHandler }) {
  return (
    <div>
      <p>{score}</p>
      <div>
        {circles.map((_, i) => (
          <Circle key={i} clickHandler={clickHandler} />
        ))}
      </div>
      <button onClick={stopHandler}>End game</button>
    </div>
  );
}

export default Game;

// Explain the Circle key and i thing.
