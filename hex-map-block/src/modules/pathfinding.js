import { getSectorData } from "./utilities";
//Needs updating
//https://www.geeksforgeeks.org/implementation-priority-queue-javascript/
export class PriorityQueue {
  constructor() {
      this.heap = [];
  }

  // Helper Methods
  getLeftChildIndex(parentIndex) {
      return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
      return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
      return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
      return this.getLeftChildIndex(index)
          < this.heap.length;
  }

  hasRightChild(index) {
      return this.getRightChildIndex(index)
          < this.heap.length;
  }

  hasParent(index) {
      return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
      return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
      return this.heap[this.getRightChildIndex(index)];
  }

  parent(index) {
      return this.heap[this.getParentIndex(index)];
  }

  swap(indexOne, indexTwo) {
      const temp = this.heap[indexOne];
      this.heap[indexOne] = this.heap[indexTwo];
      this.heap[indexTwo] = temp;
  }

  peek() {
      if (this.heap.length === 0) {
          return null;
      }
      return this.heap[0];
  }

  // Removing an element will remove the
  // top element with highest priority then
  // heapifyDown will be called 
  get() {
      if (this.heap.length === 0) {
          return null;
      }
      const item = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.heapifyDown();
      return item;
  }

  put(item) {
      this.heap.push(item);
      this.heapifyUp();
  }

  heapifyUp() {
      let index = this.heap.length - 1;
      while (this.hasParent(index) && this.parent(index)
          > this.heap[index]) {
          this.swap(this.getParentIndex(index), index);
          index = this.getParentIndex(index);
      }
  }

  heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
          let smallerChildIndex = this.getLeftChildIndex(index);
          if (this.hasRightChild(index) && this.rightChild(index)
              < this.leftChild(index)) {
              smallerChildIndex = this.getRightChildIndex(index);
          }
          if (this.heap[index] < this.heap[smallerChildIndex]) {
              break;
          } else {
              this.swap(index, smallerChildIndex);
          }
          index = smallerChildIndex;
      }
  }
    isEmpty() {
      // return true if the queue is empty.
      if(this.heap.length == 0){
        return true;
      }
      else{return false}
  }
}

export function uniformCostSearchSystems(start, range){
  const frontier = new PriorityQueue();
  const sectorData = getSectorData();
  const graph = sectorData.SectorMap;


  const reached = [];
  const costSoFar = new Map(); //Location, float

  frontier.put(start);
  costSoFar.set(start, 0);


    while (!(frontier.isEmpty())) {
        let currentKey = frontier.get();
        let current = graph.get(currentKey);
        let neighbours = current.edges;

        neighbours.forEach((hex) =>{
            let costToHere = costSoFar.get(currentKey);
            let newCost = costToHere + hex.cost;

            if ((!(costSoFar.has(hex.key))) && (newCost <= hex.cost) && (newCost <= range)){
            costSoFar.set(hex.key, newCost);
            frontier.put(hex.key);
            reached.push(hex.key);
                }
            })
    }
    //Returns an array of [hex.key...].
  return reached;
}
export function uniformCostSearchPathfinder(start, goal, range){
    const frontier = new PriorityQueue();
    const sectorData = getSectorData();
    const graph = sectorData.SectorMap;
  
  
    const cameFrom = new Map(); // Location, optional location B <= A
    const costSoFar = new Map(); //Location, float
  
    frontier.put(start);
    cameFrom.set(start, null);
    costSoFar.set(start, 0);
  
  
      while (!(frontier.isEmpty())) {
          let currentKey = frontier.get();
          let current = graph.get(currentKey);
          let neighbours = current.edges;

          if(currentKey == goal){
            break;
          }
  
          neighbours.forEach((hex) =>{
              let costToHere = costSoFar.get(currentKey);
              let newCost = costToHere + hex.cost;
  
              if ((!(costSoFar.has(hex.key))) && (newCost <= hex.cost) && (newCost <= range)){
              costSoFar.set(hex.key, newCost);
              frontier.put(hex.key);
              cameFrom.set(hex.key, currentKey);
                  }
              })
      }
    return cameFrom;
}
export function reconstructPath(cameFrom, start, goal){
    let current = goal;
    let path = [];

    if(!(cameFrom.get(goal))){
        return;
    }
    while(current != start){
        path.push(current)
        current = cameFrom.get(current);
    }
    path.push(start);
    path.reverse();

    return path;
}
