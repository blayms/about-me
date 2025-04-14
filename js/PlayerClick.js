import * as THREE from "three";
import { WebObject } from "./WebObject.js";
import { BasicInteractionBank } from "./BasicInteractionBank.js";
import { Camera } from "./Camera.js";
import { Input, InputKey } from "./Input.js";

export class PlayerClick extends WebObject
{
    #_raycaster = new THREE.Raycaster();
    #_mouse = new THREE.Vector2();
    #_e;

    constructor()
    {
        super("Player Click Service");
        this.#_raycaster.far = 10;
    }

    Dispose()
    {

    }
    UpdateService()
    {
        if (Input.GetMouseButtonDown(InputKey.Mouse0) || Input.GetKeyDown(InputKey.KeyE))
        {
            this.#FireRaycast();
        }
    }

    #FireRaycast()
    {
        const mousePosition = Input.GetMousePosition();
        this.#_mouse.x = (mousePosition.x / window.innerWidth) * 2 - 1;
        this.#_mouse.y = -(mousePosition.y / window.innerHeight) * 2 + 1;
        this.#_raycaster.setFromCamera(this.#_mouse, Camera.Main().GetNative());
        for (const [object, interactable] of BasicInteractionBank.GetAll())
        {
            const intersects = this.#_raycaster.intersectObject(object);
            if (intersects.length > 0)
            {
                interactable.OnPlayerClick();
            }
        }
    }
}