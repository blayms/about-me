import { WebObject } from "./WebObject.js";
import * as THREE from "three";

export class Segment extends WebObject
{
    static #_currentSeg;
    static #_threeScene;
    Load()
    {
        var currentSegment = Segment.GetCurrent();
        if (currentSegment != null || currentSegment != undefined)
        {
            currentSegment.Dispose();
        }
        Segment.#_currentSeg = this;
    }
    /**
     * @returns { Segment } Current instance of a website segment
     */
    static GetCurrent()
    {
        return this.#_currentSeg;
    }
    /**
     * @returns { THREE.Scene } Global (Native) Scene object from three.js library
     */
    static GetGlobalThreeJsScene()
    {
        if (this.#_threeScene == null || this.#_threeScene == undefined)
        {
            this.#_threeScene = new THREE.Scene();
        }

        return this.#_threeScene;
    }
}