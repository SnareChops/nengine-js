import { Bounds, Position } from '../types';
import { distanceBetween } from '../utils';
import { NavNode, NavPath } from './node';
import { PriorityQueue } from './queue';
import { getNeighbors, heuristic } from './utils';

/** NavMesh represents a navigation grid for pathfinding */
export class NavMesh {
    #grid: NavNode[][] = [];
    #navGroups: number = 0;
    #group: number = 0;
    #active: number = 0;

    static initSimple(width: number, height: number): NavMesh {
        const mesh = Object.create(NavMesh.prototype);
        const grid: NavNode[][] = new Array(width);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(height);
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = new NavNode(i, j, i, j, Number.POSITIVE_INFINITY, -1);
            }
        }
        mesh.#navGroups = 10;
        mesh.#grid = grid;
        mesh.#group = 0;
        mesh.#active = 0;
        return mesh;
    }

    constructor(width: number, height: number, hspacing: number, vspacing: number, hoffset: number, voffset: number) {
        let xCount: number = 0;
        if (hspacing == 0 && hoffset == 0) {
            xCount = width;
        } else {
            xCount = Math.ceil((width - hoffset) / hspacing);
        }
        let yCount: number = 0;
        if (vspacing == 0 && voffset == 0) {
            yCount = height;
        } else {
            yCount = Math.ceil((height - voffset) / vspacing);
        }
        const grid: NavNode[][] = new Array(xCount);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(yCount);
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = new NavNode(
                    i * hspacing + hoffset,
                    j * vspacing + voffset,
                    i,
                    j,
                    Number.POSITIVE_INFINITY,
                    -1,
                );
            }
        }
        this.#navGroups = 10;
        this.#grid = grid;
    }

    /** Returns the nav nodes in the grid */
    grid(): NavNode[][] {
        return this.#grid;
    }

    /** Increments and returns the next nav group number */
    nextNavGroup(): number {
        this.#group += 1;
        if (this.#group >= this.#navGroups) {
            this.#group = 0;
        }
        return this.#group;
    }

    /** Returns the nav group that is active this frame */
    activeNavGroup(): number {
        return this.#active;
    }

    /** Updates the state of the nav mesh */
    update() {
        this.#active += 1;
        if (this.#active >= this.#navGroups) {
            this.#active = 0;
        }
    }

    /**
     * Pathfind uses the NavMesh to find a path from the start to end position
     * optionally allowing diagonal movement between the nodes
     */
    pathfind(start: Position, end: Position, allowDiagonals: boolean, obstacles: Bounds[]): NavPath {
        let startNode: NavNode;
        let startDist: number = Number.MAX_VALUE;
        let endNode: NavNode;
        let endDist: number = Number.MAX_VALUE;
        for (let i = 0; i < this.#grid.length; i++) {
            for (let j = 0; j < this.#grid[i].length; j++) {
                let dist = distanceBetween(start, this.#grid[i][j]);
                if (dist < startDist) {
                    startDist = dist;
                    startNode = this.#grid[i][j];
                }
                dist = distanceBetween(end, this.#grid[i][j]);
                if (dist < endDist) {
                    endDist = dist;
                    endNode = this.#grid[i][j];
                }
            }
        }
        // @ts-ignore
        const path = this.astar(startNode, endNode, allowDiagonals, obstacles);
        path.push(end);
        return path;
    }

    /**
     * AStar runs the A* algorithm on the NavMesh and returns a path between the
     * provided nodes, optionally allowing diagonal movement between nodes.
     * Note: This is exposed, but is really only intended to be used internally.
     * Prefer using the pathfind() method instead.
     */
    astar(start: NavNode, end: NavNode, allowDiagonals: boolean, obstacles: Bounds[]): NavPath {
        const openSet = new PriorityQueue<NavNode>();
        const closedSet = new Map<NavNode, boolean>();
        start.g = 0;
        start.h = heuristic(start, end);
        start.f = start.g + start.h;
        openSet.push(start);
        while (openSet.size() > 0) {
            let current: NavNode | undefined = openSet.pop();
            if (current === end) {
                const path: Position[] = [];
                while (current != void 0) {
                    path.unshift(current);
                    current = current.parent;
                }
                return path;
            }
            closedSet.set(current, true);
            for (const neighbor of getNeighbors(current, this.#grid, allowDiagonals)) {
                if (closedSet.has(neighbor)) {
                    continue;
                }
                let gtg = true;
                for (const ob of obstacles) {
                    if (ob.isWithin(...neighbor.pos2())) {
                        gtg = false;
                        break;
                    }
                }
                if (!gtg) continue;

                const tentativeGScore = current.g + heuristic(current, neighbor);
                if (tentativeGScore < neighbor.g) {
                    neighbor.parent = current;
                    neighbor.g = tentativeGScore;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    if (neighbor.index >= 0) {
                        openSet.fix(neighbor.index);
                    } else {
                        openSet.push(neighbor);
                    }
                }

            }
        }
        return [];
    }

    /** Resets the state of the NavMesh */
    reset() {
        for (let i = 0; i < this.#grid.length; i++) {
            for (let j = 0; j < this.#grid[i].length; j++) {
                const node = this.#grid[i][j];
                node.parent = void 0;
                node.f = 0;
                node.g = Number.POSITIVE_INFINITY;
                node.h = 0;
                node.index = -1;
            }
        }
    }
}
