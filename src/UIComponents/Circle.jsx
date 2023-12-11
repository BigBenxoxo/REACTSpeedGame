function Circle({ id, clickHandler, current }) {
  return (
    <div
      className={`circle ${current ? "active" : ""}`}
      onClick={() => clickHandler(id)}
    >
      <p></p>
    </div>
  );
}

export default Circle;
