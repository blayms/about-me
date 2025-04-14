import * as THREE from "three";
import { Direction, DirectionUtils } from "./Directions.js";
import { Resources } from "./Resources.js";
import { Segment } from "./Segment.js";

export class Poster
{
    /** @type { THREE.Group } */ #_ngroup;
    /**
     * @param { string } texture 
     * @param { number } x 
     * @param { number } z 
     * @param { Direction } dir 
     */
    constructor(texture, x, z, dir)
    {
        const originalMesh = Resources.Get(THREE.Group, "obj/Quad.obj");
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
        const dirVector = DirectionUtils.GetVector(dir);
        this.#_ngroup.position.set(x + dirVector.x * 4.99, 5, z + dirVector.y * 4.99);
        this.#_ngroup.setRotationFromQuaternion(DirectionUtils.GetRotation(dir));
        this.#_ngroup.scale.set(10, 10, 10);

        Segment.GetGlobalThreeJsScene().add(this.#_ngroup);
    }
}