import * as THREE from 'three';
import { WebObject } from "./WebObject.js";

export class InteractableWebObject extends WebObject
{
    #_nobj;
    /**
     * 
     * @param { string } name 
     * @param { THREE.Object3D } obj3d 
     */
    constructor(name, obj3d)
    {
        super(name);
        this.#_nobj = obj3d;
    }
    /**
     * @returns { THREE.Object3D }
     */
    Get3DObject()
    {
        return this.#_nobj;
    }
    /**
     * 
     * @param { THREE.Object3D } obj3d 
     */
    Set3DObject(obj3d)
    {
        this.#_nobj = obj3d;
    }
    OnPlayerClick()
    {

    }
}