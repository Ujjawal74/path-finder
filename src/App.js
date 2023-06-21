import "./App.css";
import Grid from "./Grid";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { dijkstra, aStar } from "./algorithms";
import { data } from "./data";

function App() {
  const [grid, setGrid] = useState([]);
  const [source, setSource] = useState({ x: 8, y: 8 });
  const [destination, setDestination] = useState({ x: 10, y: 17 });
  const [sourceFree, setSourceFree] = useState(false);
  const [destinationFree, setDestinationFree] = useState(false);
  const [wallMode, setWallMode] = useState(false);
  const [algo, setAlgo] = useState("dijkstra");
  const [infoNo, setInfoNo] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleSelect = (e) => {
    setAlgo(e.target.value);
    if (e.target.value == "dijkstra") {
      setInfoNo(0);
    } else {
      setInfoNo(1);
    }
  };

  const handleClearBtn = () => {
    let grid = [];
    grid = getGrid();
    setGrid(grid);
  };

  const handleBtnClick = async () => {
    switch (algo) {
      case "dijkstra":
        await dijkstra(grid, setGrid, source, destination, setDisabled);
        break;
      case "a*":
        await aStar(grid, setGrid, source, destination, setDisabled);
        break;
      default:
        console.log("No Algorithm Selected");
    }
  };

  const handleBlockClick = (block) => {
    // console.log(block);
    let temp = [...grid];

    if (block.isSource) {
      setSourceFree(!sourceFree);
    } else if (block.isDestination) {
      setDestinationFree(!destinationFree);
    } else {
      if (!sourceFree && !destinationFree) {
        temp[block.x][block.y].isWall = !temp[block.x][block.y].isWall;
        setGrid([...temp]);
        setWallMode(!wallMode);
      }

      if (sourceFree) {
        temp[source.x][source.y].isSource = false;
        temp[block.x][block.y].isSource = true;
        setSource({ x: block.x, y: block.y });
        setGrid([...temp]);
        setSourceFree(!sourceFree);
      }
      if (destinationFree) {
        temp[destination.x][destination.y].isDestination = false;
        temp[block.x][block.y].isDestination = true;
        setDestination({ x: block.x, y: block.y });
        setGrid([...temp]);
        setDestinationFree(!destinationFree);
      }
    }
  };

  const handleOnMouseEnter = (block) => {
    let temp = [...grid];
    if (sourceFree) {
      temp[source.x][source.y].isSource = false;
      temp[block.x][block.y].isSource = true;
      setSource({ x: block.x, y: block.y });
      setGrid([...temp]);
    }
    if (destinationFree) {
      temp[destination.x][destination.y].isDestination = false;
      temp[block.x][block.y].isDestination = true;
      setDestination({ x: block.x, y: block.y });
      setGrid([...temp]);
    }
    if (!block.isSource && !block.isDestination) {
      if (wallMode) {
        temp[block.x][block.y].isWall = !temp[block.x][block.y].isWall;
        setGrid([...temp]);
        return;
      }
    }
  };

  const handleOnMouseLeave = (block) => {
    let temp = [...grid];
    if (sourceFree) {
      temp[block.x][block.y].isSource = false;
      setGrid([...temp]);
    }
    if (destinationFree) {
      temp[block.x][block.y].isDestination = false;
      setGrid([...temp]);
    }
  };

  useEffect(() => {
    let grid = getGrid();
    setGrid(grid);
  }, [source]);

  const createBlock = (x, y) => {
    return {
      x: x,
      y: y,
      isSource: x == source.x && y == source.y,
      isDestination: x == destination.x && y == destination.y,
      isWall: false,
      visited: false,
      distance: x == source.x && y == source.y ? 0 : Infinity,
      shortest_path: [],
      painted: false,
      animate: false,
    };
  };

  const getGrid = () => {
    const grid = [];
    for (let i = 0; i < 25; i++) {
      const row = [];
      for (let j = 0; j < 50; j++) {
        let block = createBlock(i, j);
        row.push(block);
      }
      grid.push(row);
    }
    return grid;
  };

  return (
    <>
      <div className="container">
        <section className="navbar">
          <Navbar
            handleSelect={handleSelect}
            handleBtnClick={handleBtnClick}
            handleClearBtn={handleClearBtn}
            disabled={disabled}
          />
        </section>
        <section className="impInfo">
          <div>
            Tap any empty cell to activate wall mode. Tap again to deactivate!
          </div>
          <div>Tap source/destination to move and tap again to fix.</div>
        </section>
        <section className="grid">
          <Grid
            grid={grid}
            handleBlockClick={handleBlockClick}
            handleOnMouseEnter={handleOnMouseEnter}
            handleOnMouseLeave={handleOnMouseLeave}
          />
        </section>

        <section className="info">
          <div>
            <p>{data[infoNo].algo}</p>
            <p>{data[infoNo].time}</p>
            <p
              style={{
                fontWeight: "bold",
                color: "hotpink",
              }}
            >
              {data[infoNo].theory}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
