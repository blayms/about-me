import { AudioListener, PerspectiveCamera as TJPerspectiveCamera } from "three/src/Three.Core.js";
import { WebObject } from "./WebObject.js";


export class Camera extends WebObject
{
    static #_main;

    #isMain;
    #_native;
    #_listenerInstance;

    /**
     * Creates an instance of three.js' Perspective Camera
     * @param {string} name 
     * @param {number} fov 
     * @param {number} aspect 
     * @param {number} near 
     * @param {number} far 
     */
    constructor(name, fov = 50, aspect = 1, near = 0.1, far = 2000)
    {
        super(name);
        this.#_native = new TJPerspectiveCamera(fov, aspect, near, far);
        this.#_listenerInstance = new AudioListener();
        this.#_listenerInstance.setMasterVolume(1);
        this.#_native.add(this.#_listenerInstance);
    }

    /**
    * @returns { Camera }
    */
    static Main()
    {
        return this.#_main;
    }

    /**
    * @returns { boolean }
    */
    IsMain()
    {
        return this.#isMain;
    }
    /**
     * @returns { AudioListener }
     */
    GetAudioListener()
    {
        return this.#_listenerInstance;
    }
    DefineAsMain()
    {
        if (Camera.#_main != null || Camera.#_main != undefined)
        {
            Camera.#_main.#isMain = false;
        }
        Camera.#_main = this;
        this.#isMain = true;
    }
    /**
     * @returns { TJPerspectiveCamera } A native camera instance (class PerspectiveCamera from "three/src/Three.Core.js")
     */
    GetNative()
    {
        return this.#_native;
    }
}