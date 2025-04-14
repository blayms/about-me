import * as THREE from 'three';

/**
 * @readonly
 * @enum {number}
 */
export const Direction = {
    None: -1,
    North: 0,
    East: 1,
    South: 2,
    West: 3
};

/**
 * Directional data utility constants.
 */
export const DirectionData = {
    /** @type {Direction[]} */
    opposites: [
        Direction.South,
        Direction.West,
        Direction.North,
        Direction.East
    ],
    /** @type {THREE.Color[]} */
    colors: [
        new THREE.Color(0x0000ff), // North - Blue
        new THREE.Color(0x00ff00), // East - Green
        new THREE.Color(0xff0000), // South - Red
        new THREE.Color(0xffff00)  // West - Yellow
    ],
    /** @type {Direction[]} */
    all: [
        Direction.North,
        Direction.East,
        Direction.South,
        Direction.West
    ],

    /** @type {Direction[]} */
    clockwise: [
        Direction.East,
        Direction.South,
        Direction.West,
        Direction.North
    ],

    /** @type {THREE.Vector2[]} */
    vectors: [
        new THREE.Vector2(0, 1),   // North
        new THREE.Vector2(1, 0),   // East
        new THREE.Vector2(0, -1),  // South
        new THREE.Vector2(-1, 0)   // West
    ],

    /** @type {THREE.Quaternion[]} */
    rotations: [
        new THREE.Quaternion().identity(), // North
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)),  // East
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)),      // South
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 3 * Math.PI / 2, 0)) // West
    ]
};

/**
 * Utility class for working with directions.
 */
export class DirectionUtils
{
    /**
     * Total number of valid directions (North, East, South, West).
     * @type {number}
     */
    static Count = 4;

    /**
     * Get the opposite direction.
     * @param {Direction} direction
     * @returns {Direction}
     */
    static GetOpposite(direction)
    {
        return DirectionData.opposites[direction];
    }
    /**
     * Get a visually distinct fixed color for a direction.
     * @param {Direction} direction
     * @returns {THREE.Color}
     */
    static GetColor(direction)
    {
        return DirectionData.colors[direction] ?? new THREE.Color(0x888888);
    }

    /**
     * Get the 2D vector for a direction.
     * @param {Direction} direction
     * @returns {THREE.Vector2}
     */
    static GetVector(direction)
    {
        return DirectionData.vectors[direction];
    }
    /**
     * @param {string} char
     * @returns { Direction }
     */
    static GetFromChar(char)
    {
        switch (char)
        {
            case "N":
                return Direction.North;
            case "E":
                return Direction.East;
            case "S":
                return Direction.South;
            case "W":
                return Direction.West;
            default:
                return Direction.None;
        }
    }

    /**
     * Get the 3D quaternion rotation for a direction.
     * @param {Direction} direction
     * @returns {THREE.Quaternion}
     */
    static GetRotation(direction)
    {
        return DirectionData.rotations[direction];
    }

    /**
     * Get direction by index. Wraps around if index is out of range.
     * @param {number} index
     * @returns {Direction}
     */
    static GetFromIndex(index)
    {
        return DirectionData.all[((index % this.Count) + this.Count) % this.Count];
    }
}
