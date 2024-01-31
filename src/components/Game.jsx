import Circle from "../UIComponents/Circle";

function Game({ score, circles, stopHandler, clickHandler, current }) {
  return (
    <div>
      <p className="score">{score}</p>
      <div className="circles">
        {circles.map((_, i) => (
          <Circle
            key={i}
            id={i}
            clickHandler={clickHandler}
            current={current === i}
          />
        ))}
      </div>
      <button className="endButton" onClick={stopHandler}>
        End game
      </button>
    </div>
  );
}

export default Game;

// Explain the Circle key and i thing.
