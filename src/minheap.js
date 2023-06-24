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

module.exports = { MinHeap, MinHeap2 };
