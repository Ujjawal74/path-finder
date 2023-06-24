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

class MinHeap {
  constructor(array) {
    this.vertexMap = this.createVertexMap(array);
    this.heap = this.buildHeap(array);
  }

  createVertexMap = (array) => {
    let vertexMap = {};
    for (let i = 0; i < array.length; i++) {
      vertexMap[i] = i;
    }
    return vertexMap;
  };

  buildHeap = (array) => {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array);
    }
    return array;
  };

  siftUp = (currentIdx, heap) => {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (
      currentIdx > 0 &&
      heap[parentIdx].distance > heap[currentIdx].distance
    ) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  };

  siftDown = (currentIdx, endIdx, heap) => {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let smallerValIdx = -1;
      if (
        childTwoIdx != -1 &&
        heap[childOneIdx].distance > heap[childTwoIdx].distance
      ) {
        smallerValIdx = childTwoIdx;
      } else {
        smallerValIdx = childOneIdx;
      }
      if (heap[currentIdx].distance > heap[smallerValIdx].distance) {
        this.swap(currentIdx, smallerValIdx, heap);
        currentIdx = smallerValIdx;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  };

  remove = () => {
    if (this.isEmpty()) return;
    this.swap(0, this.heap.length - 1, this.heap);
    const topFromLast = this.heap.pop();
    delete this.vertexMap[topFromLast.vertex];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return topFromLast;
  };

  swap = (i, j, heap) => {
    this.vertexMap[heap[i].vertex] = j;
    this.vertexMap[heap[j].vertex] = i;
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  };

  isEmpty = () => {
    return this.heap.length === 0;
  };

  update = (vertex, value) => {
    // new updated value is lower that's why siftup
    let obj = this.heap[this.vertexMap[vertex]];
    obj.distance = value;
    this.siftUp(this.vertexMap[vertex], this.heap);
  };
}

class MinHeap2 {
  constructor(array) {
    this.vertexMap = {};
    this.heap = [];
  }

  // add one by one that's why not using
  createVertexMap = (array) => {
    let vertexMap = {};
    for (let i = 0; i < array.length; i++) {
      vertexMap[i] = i;
    }
    return vertexMap;
  };

  // add one by one that's why not using
  buildHeap = (array) => {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array);
    }
    return array;
  };

  siftUp = (currentIdx, heap) => {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[parentIdx].f > heap[currentIdx].f) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  };

  siftDown = (currentIdx, endIdx, heap) => {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let smallerValIdx = -1;
      if (childTwoIdx != -1 && heap[childOneIdx].f > heap[childTwoIdx].f) {
        smallerValIdx = childTwoIdx;
      } else {
        smallerValIdx = childOneIdx;
      }
      if (heap[currentIdx].f > heap[smallerValIdx].f) {
        this.swap(currentIdx, smallerValIdx, heap);
        currentIdx = smallerValIdx;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  };

  remove = () => {
    if (this.isEmpty()) return;
    this.swap(0, this.heap.length - 1, this.heap);
    const topFromLast = this.heap.pop();
    delete this.vertexMap[topFromLast.vertex];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return topFromLast;
  };

  swap = (i, j, heap) => {
    this.vertexMap[heap[i].vertex] = j;
    this.vertexMap[heap[j].vertex] = i;
    let temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  };

  isEmpty = () => {
    return this.heap.length === 0;
  };

  insert = (node) => {
    this.heap.push(node);
    this.vertexMap[node.vertex] = node.vertex;
    this.siftUp(this.heap.length - 1, this.heap);
  };

  update = (node) => {
    // new updated value is lower that's why siftup
    let obj = this.heap[this.vertexMap[node.vertex]];
    obj.f = node.value;
    this.siftUp(this.vertexMap[node.vertex], this.heap);
  };

  containsNode = (node) => {
    return node.vertex in this.vertexMap;
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Dijkstra's Algorithm

const dijkstra = async (grid, setGrid, source, destination, setDisabled) => {
  setDisabled(true);
  const minHeap = createMinHeap(grid, source);

  while (!minHeap.isEmpty()) {
    let shortestUnvisitedVertex = minHeap.remove();
    grid[shortestUnvisitedVertex.x][shortestUnvisitedVertex.y].visited = true;

    if (shortestUnvisitedVertex.distance == Infinity) {
      break;
    }
    let breakFound = false;

    breakFound = await visitItsAdjacentVertices(
      grid,
      shortestUnvisitedVertex,
      minHeap,
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
    shortestPath = [...shortestPath, [destination.x, destination.y]];
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
  minHeap,
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
        block.shortest_path.push(...past_path, [x, y]);

        // update min heap
        let currentVertex = grid[xf][yf].vertex;
        let value = shortestUnvisitedVertex.distance + 1;
        minHeap.update(currentVertex, value);
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
    if (i != 0 && i != shortestPath.length - 1) {
      temp[x][y].value = i;
    }
    await sleep(50);
    setGrid([...temp]);
  }
};

const createMinHeap = (grid, source) => {
  let array = []; // array of m*n size
  let vertex = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j].vertex = vertex;
      vertex = vertex + 1;
      array.push(grid[i][j]);
    }
  }

  // settings initial source
  let sourceNode = grid[source.x][source.y].vertex;
  let minHeap = new MinHeap(array);
  minHeap.update(sourceNode, 0);
  return minHeap;
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
    this.vertex = null;
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

  let vertex = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].isWall) {
        continue;
      }
      let block = new Node();
      block.id = i + "-" + j;
      block.row = i;
      block.col = j;
      block.g = Infinity;
      block.h = Infinity;
      block.f = Infinity;
      block.cameFrom = null;
      block.vertex = vertex;

      vertex = vertex + 1;
      graphNodes[i][j] = block;
    }
  }

  // settings source's default properties
  let sourceNode = graphNodes[source.x][source.y];
  sourceNode.g = 0;
  sourceNode.h =
    Math.abs(source.x - destination.x) + Math.abs(source.y - destination.y);
  sourceNode.f = sourceNode.g + sourceNode.h;

  let minHeap = new MinHeap2();
  minHeap.insert(sourceNode);

  while (!minHeap.isEmpty()) {
    let minNode = minHeap.remove();

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
          if (!minHeap.containsNode(currNode)) {
            minHeap.insert(currNode);
          } else {
            minHeap.update(currNode);
          }
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
