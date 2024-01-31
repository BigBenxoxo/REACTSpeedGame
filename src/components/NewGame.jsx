import { useState } from "react";

function NewGame({ onclick }) {
  const [name, setName] = useState("");
  const inputHandler = (e) => {
    setName(e.target.value);
  };
  return (
    <div>
      <h2>Start the game by entering your name and choosing a difficulty</h2>
      <br></br>
      <h6>Then use your gun to blast those nasty suckers!</h6>
      <input type="text" onChange={inputHandler} />
      <div>
        <button className="difficultybtn" onClick={() => onclick("easy", name)}>
          Easy
        </button>
        <button
          className="difficultybtn"
          onClick={() => onclick("medium", name)}
        >
          Medium
        </button>
        <button className="difficultybtn" onClick={() => onclick("hard", name)}>
          Hard
        </button>
      </div>
    </div>
  );
}

export default NewGame;
