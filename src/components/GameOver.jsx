import React, { useEffect, useState } from "react";
import { useRef } from "react";
import best from "../assets/best.mp3";
import gameover from "../assets/gameover.mp3";

function GameOver({ closeHandler, name, score, level }) {
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalColor, setModalColor] = useState("");

  //sounds
  const bestRef = useRef(new Audio(best));
  const gameoverRef = useRef(new Audio(gameover));

  useEffect(() => {
    if (score >= 200) {
      setModalTitle("Good job!");
      setModalMessage("and you decimated those nasty demons, you rock!");
      setModalColor("green");
      bestRef.current.play();
    } else if (score >= 90) {
      setModalTitle("Scarred for life..");
      setModalMessage("and you just about escaped,");
      setModalColor("red");
      gameoverRef.current.play();
    } else {
      setModalTitle("and you were eaten alive..");
      setModalColor("red");
      gameoverRef.current.play();
    }
  }, [score]);

  return (
    <div className="overlay" style={{ display: "flex" }}>
      <div className="gameover_box">
        <h2 id="modalheading">Game over.</h2>
        <br></br>
        <div className="game_data">
          <p>Hello {name}</p>
          <br></br>
          <p className="score">Your score was: {score}</p>
          <br></br>
          <p>Your difficulty was: {level}</p>
          <br></br>
        </div>
        <p>{modalMessage}</p>
        <p style={{ color: modalColor }}>{modalTitle}</p>
        <button className="gameoverbtn" onClick={closeHandler}>
          X
        </button>
      </div>
    </div>
  );
}

export default GameOver;
