import { useRef, useState } from "react";
import NewGame from "./components/NewGame";
import { levels } from "./levels";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import mosq from "./assets/mosq.mp3";
import mortalkombat from "./assets/MortalKombat.mp3";
import deagle from "./assets/deagle.mp3";

const getRndInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function App() {
  const [player, setPlayer] = useState();
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameLaunch, setGameLaunch] = useState(true);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [current, setCurrent] = useState(0);

  const timeoutIdRef = useRef(null);
  const rounds = useRef(0);
  const currentInst = useRef(0);

  let pace = 1000;
  let levelsAmount;
  //sounds
  const deagleRef = useRef(new Audio(deagle));
  const mosqRef = useRef(new Audio(mosq));
  const MKRef = useRef(new Audio(mortalkombat));

  const gameSetHandler = (level, name) => {
    // Based on level, we find the matching object from levels array(js), and then make an array for the circles, with amount in the object.
    const levelIndex = levels.findIndex((el) => el.name === level);
    levelsAmount = levels[levelIndex].amount;

    /* same as above^ const {amount} = levels.find(el => el.name === level);
    const levelAmount = amount; */

    const circlesArray = Array.from(
      {
        length: levelsAmount,
      },
      (_, i) => i
    );
    console.log("circlesArray", circlesArray);
    console.log("Amount of circles", levelsAmount);
    setCircles(circlesArray);

    setPlayer({ level: level, name: name });
    setGameLaunch((prevLaunch) => !prevLaunch);
    setGameOn(!gameOn);
    randomNumb();
    mosqRef.current.play();
  };

  const stopHandler = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;

    setGameOn(false);
    setGameOver(!gameOver);
    rounds.current = null;
    pace = 1000;
    setTimeout(() => {
      MKRef.current.play();
    }, 1000);
    mosqRef.current.pause();
  };

  const closeHandler = () => {
    setGameOver(!gameOver);
    setGameLaunch(!gameLaunch);
    setScore(0);
    MKRef.current.pause();
    MKRef.current.currentTime = 0;
    mosqRef.current.pause();
  };

  const clickHandler = (id) => {
    if (current !== id) {
      stopHandler();
      return;
    }
    setScore(score + 10);

    rounds.current--;

    deagleRef.current.currentTime = 0;
    deagleRef.current.play();
  };

  const randomNumb = () => {
    if (rounds.current >= 3) {
      stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInt(0, levelsAmount);
    } while (nextActive === currentInst.current);

    setCurrent(nextActive);
    currentInst.current = nextActive;
    rounds.current++;
    timeoutIdRef.current = setTimeout(randomNumb, pace);
    pace *= 0.95;
  };

  return (
    <>
      <h1>You are being hunted by mosquitoes!</h1>
      {gameLaunch && <NewGame onclick={gameSetHandler} />}
      {gameOn && (
        <Game
          score={score}
          circles={circles}
          stopHandler={stopHandler}
          clickHandler={clickHandler}
          current={current}
        />
      )}
      {gameOver && (
        <GameOver closeHandler={closeHandler} {...player} score={score} />
      )}
      <div className="footer">
        <footer>Copyright BenPet 2023 ©</footer>
      </div>
    </>
  );
}

export default App;
