export const data = [
  {
    algo: "Dijkstra's Algorithm",
    time: "Time Complexity (Efficient) : O((v+e)logv)",
    theory: `Father of all path finding algorithms.
               Finds least possible distance to destination.
               Execution spreads like a flower pattern in all directions. 
               Computes least possible distance from source to all vertices till the destination is reached.`,
  },
  {
    algo: "A* Algorithm",
    time: "Time Complexity (Efficient) : O((w*h)log(w*h))",
    theory: `It is the fastest possible path finding algorithm.
               Its a destination oriented algorithm.
                It computes manhattan distance from every vertex to destination.
                It prepares a heuristic value for every vertex.
                Execution spreads towards destination using heuristic.
                It traverses minimum vertices as least as possible.
                `,
  },
];
