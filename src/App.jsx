import { useState } from "react";
import NewGame from "./components/NewGame";
import { levels } from "./levels";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const getRndInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function App() {
  const [player, setPlayer] = useState();
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameLaunch, setGameLaunch] = useState(true);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [current, setCurrent] = useState(-1);

  let timer;
  let pace = 1000;

  const gameSetHandler = (level, name) => {
    // Based on level, we find the matching object from levels array(js), and then make an array for the circles, with amount in the object.
    const levelIndex = levels.findIndex((el) => el.name === level);
    const levelAmount = levels[levelIndex].amount;

    const circlesArray = Array.from(
      {
        length: levelAmount,
      },
      (x, i) => i
    );
    console.log("circlesArray", circlesArray);
    console.log("Amount of circles", levelAmount);
    setCircles(circlesArray);

    setPlayer({ level: level, name: name });
    setGameLaunch(!gameLaunch);
    setGameOn(!gameOn);
    randomNumb();
  };

  const stopHandler = () => {
    setGameOn(!gameOn);
    setGameOver(!gameOver); // Explain this ! thing.
    clearTimeout(timer);
  };

  const closeHandler = () => {
    setGameOver(!gameOver);
    setGameLaunch(!gameLaunch);
    setScore(0);
  };

  const clickHandler = (id) => {
    setScore(score + 1);
  };

  const randomNumb = () => {
    let nextActive;

    do {
      nextActive = getRndInt(0, circles.length);
    } while (nextActive === current);

    setCurrent(nextActive);

    timer = setTimeout(randomNumb, pace);
  };

  return (
    <>
      <h1>Catch the snow!</h1>
      {gameLaunch && <NewGame onclick={gameSetHandler} />}
      {gameOn && (
        <Game
          score={score}
          circles={circles}
          stopHandler={stopHandler}
          clickHandler={clickHandler}
        />
      )}
      {gameOver && (
        <GameOver closeHandler={closeHandler} {...player} score={score} />
      )}
    </>
  );
}

export default App;
