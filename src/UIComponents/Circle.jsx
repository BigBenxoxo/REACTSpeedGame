function Circle({ id, clickHandler }) {
  return (
    <div className="circle" onClick={() => clickHandler(id)}>
      <p>{id}</p>
    </div>
  );
}

export default Circle;
