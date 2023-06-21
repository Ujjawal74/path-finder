const Navbar = ({ handleSelect, handleBtnClick, handleClearBtn, disabled }) => {
  return (
    <>
      <div className="title">
        <h1>Path Finding Visualizer</h1>
      </div>
      <div className="actions">
        <div>
          <select onChange={handleSelect} disabled={disabled}>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="a*">A* Algorithm</option>
          </select>
        </div>
        <div>
          <button onClick={handleBtnClick} disabled={disabled}>
            Visualize
          </button>
        </div>
        <div>
          <button onClick={handleClearBtn} disabled={disabled}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
