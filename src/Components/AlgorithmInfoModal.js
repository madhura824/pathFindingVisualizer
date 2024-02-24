import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AstarExampleEn from "../AstarExampleEn.gif";
import Dijkstra_Animation from "../Dijkstra_Animation.gif";
import Depth_First_Search from "../Depth_First_Search.gif";
import Animated_BFS from "../Animated_BFS.gif"


const AlgorithmInfoModal = ({ algorithmChoice, onHide }) => {
  // Add your algorithm information and images here based on the choice

  const Astar = (
    <div>
      <p>Type: Informed Search Algorithm</p>
      <p>
        Objective: Find the shortest path from a starting point to a goal node
        in a graph or grid.
      </p>
      <p>
        Approach:
        <ul>
          <li>
            Utilizes a heuristic to estimate the cost from the current node to
            the goal.
          </li>
          <li>
            Combines the cost to reach the current node and the estimated cost
            to reach the goal using a priority queue.
          </li>
        </ul>
      </p>
      <p>
        Heuristic Function (h):
        <ul>
          <li>Estimates the cost from the current node to the goal.</li>
          <li>
            Admissible (never overestimates) for A* to guarantee optimality.
          </li>
          <li>Common heuristics: Euclidean distance, Manhattan distance.</li>
        </ul>
      </p>
      <p>
        Evaluation Function (f):
        <ul>
          <li>f(n) = g(n) + h(n), where:</li>
          <ul>
            <li>g(n) is the cost from the start node to node n.</li>
            <li>h(n) is the heuristic cost from node n to the goal.</li>
          </ul>
        </ul>
      </p>
      <p>
        Key Features:
        <ul>
          <li>Optimal: Guarantees finding the shortest path.</li>
          <li>Completeness: Will find a solution if one exists.</li>
          <li>
            Best-suited for graphs or grids with obstacles and varying terrain
            costs.
          </li>
        </ul>
      </p>
      <p>
        Application Areas: Pathfinding in maps, robotics, video games, and
        network routing.
      </p>
      <p>
        Considerations:
        <ul>
          <li>Requires an admissible heuristic for optimality.</li>
          <li>
            Performance may vary based on the chosen heuristic and graph
            representation.
          </li>
        </ul>
      </p>
    </div>
  );
  const dijkstrasDescription = (
    <div>
      <p>Type: Uninformed Search Algorithm</p>
      <p>
        Objective: Find the shortest path from a starting node to all other
        nodes in a weighted graph.
      </p>
      <p>
        Algorithm:
        <ul>
          <li>
            Start with a priority queue containing all nodes with distances
            initialized to infinity, except the start node with distance 0.
          </li>
          <li>
            While the priority queue is not empty, extract the node with the
            smallest distance.
          </li>
          <li>
            For each neighbor of the extracted node, update the distance if a
            shorter path is found.
          </li>
        </ul>
      </p>
      <p>
        Key Features:
        <ul>
          <li>
            Greedy algorithm - always selects the node with the smallest known
            distance.
          </li>
          <li>Finds the shortest path to each node from the start node.</li>
        </ul>
      </p>
      <p>
        Applications:
        <ul>
          <li>Shortest path routing protocols.</li>
          <li>Network routing algorithms.</li>
          <li>Robotics and automation.</li>
        </ul>
      </p>
      <p>
        Considerations:
        <ul>
          <li>Works well for non-negative edge weights.</li>
          <li>May not produce accurate results with negative edge weights.</li>
        </ul>
      </p>
    </div>
  );

  const dfsDescription = (
    <div>
      <p>Type: Uninformed Search Algorithm</p>
      <p>
        Objective: Explore as far as possible along each branch before
        backtracking.
      </p>
      <p>
        Algorithm:
        <ul>
          <li>Start at the initial node and mark it as visited.</li>
          <li>
            Recursively visit all unvisited neighbors of the current node.
          </li>
          <li>Backtrack to the previous node if no unvisited neighbors remain.</li>
        </ul>
      </p>
      <p>
        Key Features:
        <ul>
          <li>Uses a stack data structure or recursion.</li>
          <li>May not find the shortest path.</li>
        </ul>
      </p>
      <p>
        Applications:
        <ul>
          <li>Topological sorting.</li>
          <li>Maze generation.</li>
          <li>Connected components in graphs.</li>
        </ul>
      </p>
      <p>
        Considerations:
        <ul>
          <li>May get stuck in infinite loops for graphs with cycles.</li>
        </ul>
      </p>
    </div>
  );

  
  const bfsDescription = (
    <div>
      <p>Type: Uninformed Search Algorithm</p>
      <p>
        Objective: Explore all the neighbor nodes at the current depth prior to
        moving on to nodes at the next depth level.
      </p>
      <p>
        Algorithm:
        <ul>
          <li>Start at the initial node and mark it as visited.</li>
          <li>Visit all unvisited neighbors of the current node.</li>
          <li>Move on to the next depth level and repeat the process.</li>
        </ul>
      </p>
      <p>
        Key Features:
        <ul>
          <li>Uses a queue data structure.</li>
          <li>Finds the shortest path in an unweighted graph.</li>
        </ul>
      </p>
      <p>
        Applications:
        <ul>
          <li>Shortest path in unweighted graphs.</li>
          <li>Network broadcasting.</li>
          <li>Web crawling and indexing.</li>
        </ul>
      </p>
      <p>
        Considerations:
        <ul>
          <li>May not be efficient for very deep graphs.</li>
        </ul>
      </p>
    </div>
  );

  
  const algoInfo = {
    1: {
      title: "A Star Algorithm",
      description: Astar,
      image: AstarExampleEn,
    },
    2: {
      title: "Dijkstra's Algorithm",
      description: dijkstrasDescription,
      image: Dijkstra_Animation,
    },
    3: {
      title: "Breadth First Search",
      description: bfsDescription,
      image: Animated_BFS,
    },
    4: {
      title: "Depth First Search",
      description: dfsDescription,
      image: Depth_First_Search,
    },
  };

  const { title, description, image } = algoInfo[algorithmChoice];

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <img
          src={image}
          alt={`Image for ${title}`}
          style={{ maxWidth: "100%" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlgorithmInfoModal;
