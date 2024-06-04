import { NavNode } from './node';

export function heuristic(a: NavNode, b: NavNode): number {
    return Math.sqrt(((b.nodeX - a.nodeX) ** 2) + ((b.nodeY - a.nodeY) ** 2));
}

export function getNeighbors(node: NavNode, grid: NavNode[][], allowDiagonals: boolean): NavNode[] {
    const neighbors: NavNode[] = [];
    const x = node.nodeX;
    const y = node.nodeY;
    let directions: number[][] = [];
    if (allowDiagonals) {
        directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]];
    } else {
        directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    }
    for (const d of directions) {
        const nx = x + d[0];
        const ny = y + d[1];
        if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[0].length) {
            neighbors.push(grid[nx][ny]);
        }
    }
    return neighbors;
}