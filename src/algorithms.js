function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Dijkstra's Algorithm

const dijkstra = async (grid, setGrid, source, destination, setDisabled) => {
  setDisabled(true);

  const unvisitedArray = createUnvisitedArray(grid);

  while (unvisitedArray.length > 0) {
    let shortestUnvisitedVertex = unvisitedArray.shift();
    grid[shortestUnvisitedVertex.x][shortestUnvisitedVertex.y].visited = true;

    if (shortestUnvisitedVertex.distance == Infinity) {
      break;
    }
    let breakFound = false;

    breakFound = await visitItsAdjacentVertices(
      grid,
      shortestUnvisitedVertex,
      unvisitedArray,
      destination,
      setGrid,
      breakFound
    );
    if (breakFound) {
      break;
    }
  }

  if (
    grid[destination.x][destination.y].shortest_path.length > 0 &&
    grid[destination.x][destination.y].distance < Infinity
  ) {
    let shortestPath = grid[destination.x][destination.y].shortest_path;
    await animateShortestPath(grid, setGrid, shortestPath, destination);
    setDisabled(false);
  } else {
    alert("Destination is Unreachable!");
    setDisabled(false);
  }
};

const visitItsAdjacentVertices = async (
  grid,
  shortestUnvisitedVertex,
  unvisitedArray,
  destination,
  setGrid,
  breakFound
) => {
  var temp = [...grid];

  let x = shortestUnvisitedVertex.x;
  let y = shortestUnvisitedVertex.y;
  let past_path = shortestUnvisitedVertex.shortest_path;

  // top bottom left right [its his adjacents no diagonals allowed]
  let factors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  if (grid[x][y].isWall) return;

  for (let i = 0; i < factors.length; i++) {
    let xf = x + factors[i][0];
    let yf = y + factors[i][1];

    if (xf >= 0 && xf < grid.length && yf >= 0 && yf < grid[0].length) {
      let block = grid[xf][yf];
      if (block.visited && block.isWall) {
        continue;
      }
      temp[xf][yf].animate = true;
      setGrid([...temp]);

      if (block.distance > shortestUnvisitedVertex.distance + 1) {
        block.distance = shortestUnvisitedVertex.distance + 1;

        grid[xf][yf].shortest_path.push(...past_path, [x, y]);
        sortArray(unvisitedArray);
      }

      if (xf == destination.x && yf == destination.y) {
        breakFound = true;
        return breakFound;
      }
    } else {
      continue;
    }
  }
  await sleep(1);
  return false;
};

const animateShortestPath = async (
  grid,
  setGrid,
  shortestPath,
  destination
) => {
  var temp = [...grid];
  for (let i = 0; i < shortestPath.length; i++) {
    let x = shortestPath[i][0];
    let y = shortestPath[i][1];

    temp[x][y].painted = true;
    if (i == shortestPath.length - 1) {
      temp[destination.x][destination.y].painted = true;
    }
    await sleep(50);
    setGrid([...temp]);
  }
};

const sortArray = (array) => {
  array.sort((a, b) => a.distance - b.distance);
};

const createUnvisitedArray = (grid) => {
  let array = []; // array of m*n size
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      array.push(grid[i][j]);
    }
  }
  sortArray(array);
  return array;
};

// A* Algorithm

class Node {
  constructor() {
    this.row = -1;
    this.col = -1;
    this.g = Infinity;
    this.h = Infinity;
    this.f = Infinity;
    this.cameFrom = null; // self referential
  }
}

const aStar = async (grid, setGrid, source, destination, setDisabled) => {
  setDisabled(true);

  var temp = [...grid];
  let rows = grid.length;
  let cols = grid[0].length;

  let graphNodes = new Array(rows); // 2d matrix of nodes
  for (let i = 0; i < cols; i++) {
    graphNodes[i] = new Array(cols).fill(null);
  }
  let pq = []; // priority queue
  let m = {}; // map of visited

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].isWall) {
        continue;
      }
      let block = new Node();
      block.row = i;
      block.col = j;
      block.g = Infinity;
      block.h = Infinity;
      block.f = Infinity;
      block.cameFrom = null;

      graphNodes[i][j] = block;
    }
  }

  // settings source's default properties
  let block = graphNodes[source.x][source.y];
  block.g = 0;
  block.h =
    Math.abs(source.x - destination.x) + Math.abs(source.y - destination.y);
  block.f = block.g + block.h;

  pq.push(block);
  sortPq(pq);

  while (pq.length > 0) {
    let minNode = pq.shift();
    let id = minNode.row + "-" + minNode.col;

    if (m[id] == true) {
      continue;
    }
    m[id] = true;

    if (minNode.row == destination.x && minNode.col == destination.y) {
      break;
    }

    let factors = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    let minX = minNode.row;
    let minY = minNode.col;

    for (let i = 0; i < 4; i++) {
      let x = minX + factors[i][0];
      let y = minY + factors[i][1];

      if (x >= 0 && x < rows && y >= 0 && y < cols) {
        let currNode = graphNodes[x][y];
        if (currNode == null) continue;

        temp[x][y].animate = true;
        setGrid([...temp]);

        if (currNode.g > minNode.g + 1) {
          currNode.g = minNode.g + 1;
          currNode.h =
            Math.abs(x - destination.x) + Math.abs(y - destination.y);
          currNode.f = currNode.g + currNode.h;

          currNode.cameFrom = minNode;
          pq.push(currNode);
          sortPq(pq);
        } else {
          continue;
        }
      }
    }
    await sleep(20);
  }

  // final calculation of path
  let endNode = graphNodes[destination.x][destination.y];
  let path = [];

  if (endNode.cameFrom == null) {
    setDisabled(false);
    alert("Destination is Unreachable!");
    return [];
  }

  while (endNode != null) {
    path.push([endNode.row, endNode.col]);
    endNode = endNode.cameFrom;
  }

  path.reverse();
  // animate path;
  await animateShortestPath(grid, setGrid, path, destination);
  setDisabled(false);
  return path;
};

const sortPq = (array) => {
  array.sort((a, b) => a.h - b.h);
};

export { sleep, dijkstra, aStar };
