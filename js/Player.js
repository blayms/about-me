import * as THREE from "three";
import { Camera } from "./Camera.js";
import { GetDeltaTime, GetInnerHeight, GetInnerWidth } from "./entrypoint.js";
import { Input, InputKey } from "./Input.js";
import { WebBehaviour } from "./WebBehaviour.js"
import { CursorManager } from "./CursorManager.js";
import { BasicCollisionBank } from "./BasicCollisionBank.js";
import { PlayerClick } from "./PlayerClick.js";

export class Player extends WebBehaviour
{
    /** @type { number } */ walkSpeed = 10.0;
    /** @type { number } */ runSpeed = 15.0;
    /** @type { number } */ turnSensitivity = 1.0;
    /** @type { boolean } */ canMove = true;
    /** @type { boolean } */ canRotate = true;
    /** @type { Camera } */ #_camera = null;
    /** @type { number } */ lookSmoothness = 10.0;
    lookRange = { min: -89, max: 89 };
    /** @type { number } */#currentYaw = 0.0;
    /** @type { THREE.Vector3 } */ #playerSize = new THREE.Vector3(1, 4, 1);
    /** @type { THREE.Box3 } */ #_playerBox;
    /** @type { PlayerClick } */ #_playerClick;

    constructor(name)
    {
        super(name);
    }

    Awake()
    {
        this.#_playerBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(0, 0, 0), this.#playerSize);

        this.#_camera = new Camera("Player Camera", 60, GetInnerWidth() / GetInnerHeight(), 0.1, 1000);
        this.GetCamera().DefineAsMain();
        CursorManager.Lock();

        this.#_playerClick = new PlayerClick();

        this.#_playerBox = new THREE.Box3().setFromCenterAndSize(this.#_camera.GetNative().position, this.#playerSize);

        this.#TeleportAt(new THREE.Vector3(20, 5, 20));
    }

    Update()
    {
        if (this.canMove)
        {
            this.#Move();
        }
        if (this.canRotate)
        {
            this.#Look();
        }
        if (Input.GetMouseButton(InputKey.Mouse0) && !CursorManager.IsLocked)
        {
            CursorManager.Lock();
        }
        if (Input.GetKeyDown(InputKey.KeyR))
        {
            console.log(this.#_camera.GetNative().position);
        }
        this.#_playerClick.UpdateService();
    }
    /**
     * @param {THREE.Vector3} position 
     */
    #TeleportAt(position)
    {
        this.#_camera.GetNative().position.copy(position);
        this.#_playerBox.setFromCenterAndSize(position, this.#playerSize);
    }
    #CollidesWithSolid()
    {
        for (const [colliderBox, isTrigger] of BasicCollisionBank.GetAll())
        {
            if (this.#_playerBox.intersectsBox(colliderBox) && !isTrigger)
            {
                return true;
            }
        }
        return false;
    }

    #Move()
    {
        let h = Input.GetAxis("Horizontal");
        let v = Input.GetAxis("Vertical");

        let outSpeed = this.IsRunning() ? this.runSpeed : this.walkSpeed;
        let delta = outSpeed * GetDeltaTime();

        let moveVector = new THREE.Vector3(h, 0, -v);
        let yawQuat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, this.#currentYaw * THREE.MathUtils.DEG2RAD, 0)
        );

        moveVector.applyQuaternion(yawQuat).normalize();

        let camera = this.#_camera.GetNative();
        const originalPosition = camera.position.clone();

        camera.position.x += moveVector.x * delta;
        this.#_playerBox.setFromCenterAndSize(camera.position, this.#playerSize);
        if (this.#CollidesWithSolid())
        {
            camera.position.x = originalPosition.x;
        }

        camera.position.z += moveVector.z * delta;
        this.#_playerBox.setFromCenterAndSize(camera.position, this.#playerSize);
        if (this.#CollidesWithSolid())
        {
            camera.position.z = originalPosition.z;
        }

        camera.position.y = 5;
        this.#_playerBox.setFromCenterAndSize(camera.position, this.#playerSize);
    }


    #Look()
    {
        const mouseDelta = Input.GetMouseDelta();

        let rotation = -mouseDelta.x;

        let targetYaw = this.#currentYaw + rotation * this.turnSensitivity;
        this.#currentYaw = THREE.MathUtils.lerp(this.#currentYaw, targetYaw, GetDeltaTime() * this.lookSmoothness);

        // Only apply Y rotation
        const euler = new THREE.Euler(
            0,
            THREE.MathUtils.degToRad(this.#currentYaw),
            0,
            'YXZ'
        );

        this.GetCamera().GetNative().quaternion.setFromEuler(euler);
    }

    /**
     * 
     * @returns { Camera }
     */
    GetCamera()
    {
        return this.#_camera;
    }
    /**
    * 
    * @returns { boolean }
    */
    IsRunning()
    {
        return Input.GetKeyHeld(InputKey.ShiftLeft) || Input.GetKeyHeld(InputKey.ShiftRight);
    }
}