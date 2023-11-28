import { useState } from "react";
import NewGame from "./components/NewGame";
import { levels } from "./levels";
import Circle from "./UIComponents/Circle";
import Game from "./components/Game";

function App() {
  const [player, setPlayer] = useState();
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);

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
  };

  return (
    <>
      <h1>Catch the snow!</h1>
      <NewGame onclick={gameSetHandler} />
      <Game score={score} circles={circles} />
    </>
  );
}

export default App;
