import { BasicCollisionBank } from "./BasicCollisionBank.js";
import { Direction, DirectionData, DirectionUtils } from "./Directions.js";
import { Resources } from "./Resources.js";
import { Segment } from "./Segment.js";
import { WebObject } from "./WebObject.js";
import * as THREE from "three";

export class Tile extends WebObject
{
    /** @type { THREE.Group } */ #_ngroup;
    /**
    * @param {string} name 
    * @param {string} tile 
    * @param {string} texture 
    * @param {number} x
    * @param {number} z
    */
    constructor(tile, texture, x, z)
    {
        super(tile);

        const originalMesh = Resources.Get(THREE.Group, "obj/Tile_" + tile + "_Mesh.obj");
        this.#_ngroup = originalMesh.clone(true);

        this.#_ngroup.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.material = child.material.clone();
                child.material.map = Resources.Get(THREE.Texture, "images/textures/" + texture + ".png");
                child.material.needsUpdate = true;
            }
        });

        this.#_ngroup.position.set(x, 0, z);

        const wallDirections = [];
        if (tile == "Full")
        {
            wallDirections.push(Direction.North);
            wallDirections.push(Direction.East);
            wallDirections.push(Direction.South);
            wallDirections.push(Direction.West);
        }
        else if (tile != "Open")
        {
            const suffix = tile.split("_")[1];
            const directions = suffix.split("");

            for (const dirChar of directions)
            {
                wallDirections.push(DirectionUtils.GetFromChar(dirChar));
            }
        }
        //for (let i = 0; i < DirectionUtils.Count; i++)
        //{
        //    if (!wallDirections.includes(DirectionUtils.GetFromIndex(i)))
        //    {
        //        wallDirections.push(DirectionUtils.GetFromIndex(i));
        //    }
        //}
        for (let i = 0; i < wallDirections.length; i++)
        {
            const dir = wallDirections[i];
            let offset;
            let size;
            switch (dir)
            {
                case Direction.North:
                    size = new THREE.Vector3(10, 10, 0.01);
                    offset = new THREE.Vector3(0, 5, 5);
                    break;

                case Direction.South:
                    size = new THREE.Vector3(10, 10, 0.01);
                    offset = new THREE.Vector3(0, 5, -5);
                    break;

                case Direction.East:
                    size = new THREE.Vector3(0.01, 10, 10);
                    offset = new THREE.Vector3(-5, 5, 0);
                    break;

                case Direction.West:
                    size = new THREE.Vector3(0.01, 10, 10);
                    offset = new THREE.Vector3(5, 5, 0);
                    break;

                default:
                    size = new THREE.Vector3(1, 1, 1);
                    offset = new THREE.Vector3(0, 0, 0);
                    break;
            }
            const center = this.#_ngroup.position.clone().add(offset);
            const box = new THREE.Box3().setFromCenterAndSize(center, size);
            BasicCollisionBank.Register(box, false);
        }

        Segment.GetGlobalThreeJsScene().add(this.#_ngroup);
    }
    /**
     * @returns { THREE.Group }
     */
    GetNativeGroup()
    {
        return this.#_ngroup;
    }
} 