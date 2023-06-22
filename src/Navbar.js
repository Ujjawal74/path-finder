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

/*
Created By: Connect/Follow me on LinkedIn.
=> https://www.linkedin.com/in/ujjawal-biswas-b40611142/
          _   _                         _  _      _                           
  _   _  (_) (_)  __ _ __      __ __ _ | || |__  (_) ___ __      __ __ _  ___ 
 | | | | | | | | / _` |\ \ /\ / // _` || || '_ \ | |/ __|\ \ /\ / // _` |/ __|
 | |_| | | | | || (_| | \ V  V /| (_| || || |_) || |\__ \ \ V  V /| (_| |\__ \
  \__,_|_/ |_/ | \__,_|  \_/\_/  \__,_||_||_.__/ |_||___/  \_/\_/  \__,_||___/
       |__/|__/                                                                                                                                                                               
*/
