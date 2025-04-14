import * as THREE from 'three';
import { Resources } from './Resources.js';
import { Direction, DirectionUtils } from './Directions.js';
import { Segment } from './Segment.js';
import { InteractableWebObject } from './InteractableWebObject.js';
import { BasicInteractionBank } from './BasicInteractionBank.js';
import { BasicCollisionBank } from './BasicCollisionBank.js';
import { Camera } from './Camera.js';

export class Door extends InteractableWebObject
{

    /** @type { THREE.Group } */ #_ngroup;
    /** @type { THREE.PositionalAudio } */ #_audioSource;
    /** @type { THREE.Box3 } */ #_doorBox;
    /**
     * @param { number } x 
     * @param { number } z 
     * @param { Direction } dir 
     * @param { boolean } closesWeb 
     */
    constructor(x, z, dir, closesWeb = false)
    {
        super("Door", null);
        let geom = new THREE.PlaneGeometry(10, 10);
        geom.clearGroups();
        geom.addGroup(0, Infinity, 0);
        geom.addGroup(0, Infinity, 1);
        this.closedTexture = "images/textures/AlbertDoor_Closed.png";
        this.openTexture = "images/textures/AlbertDoor_Open.png";
        this.wallTexture = "images/textures/Wall.png";
        this.closesWeb = closesWeb;
        this.maskTexture = "images/textures/DoorMask.png";
        this.baseMat = new THREE.MeshBasicMaterial(
            {
                map: Resources.Get(THREE.Texture, this.closedTexture),
                transparent: true,
                alphaTest: 0.1,
                side: THREE.DoubleSide
            });
        this.wallMat = new THREE.MeshBasicMaterial(
            {
                map: Resources.Get(THREE.Texture, this.wallTexture),
                alphaMap: Resources.Get(THREE.Texture, this.maskTexture),
                transparent: true,
                alphaTest: 0.1,
                side: THREE.DoubleSide
            });
        this.quad = new THREE.Mesh(geom);
        let mats = [this.baseMat, this.wallMat];
        this.quad.material = mats;
        this.name = "Door";
        this.open = false;

        this.#_audioSource = new THREE.PositionalAudio(Camera.Main().GetAudioListener());
        this.quad.add(this.#_audioSource);
        this.#_audioSource.setRefDistance(10);
        this.#_audioSource.setMaxDistance(40);
        this.#_audioSource.setVolume(1);
        this.#_audioSource.setDistanceModel('linear');

        Segment.GetGlobalThreeJsScene().add(this.quad);
        const dirVector = DirectionUtils.GetVector(dir);
        this.quad.position.set(x - dirVector.x * 5, 5, z - dirVector.y * 5);
        this.quad.setRotationFromQuaternion(DirectionUtils.GetRotation(dir));
        BasicInteractionBank.Register(this.quad, this);
        this.Set3DObject(this.quad);

        const leftWallBox = new THREE.Box3().setFromObject(this.quad);
        const rightWallBox = new THREE.Box3().setFromObject(this.quad);
        this.#_doorBox = new THREE.Box3().setFromObject(this.quad);

        const boxSize = new THREE.Vector3();
        const boxSize2 = new THREE.Vector3();
        const boxCenter = new THREE.Vector3();
        leftWallBox.getSize(boxSize);
        leftWallBox.getCenter(boxCenter);
        rightWallBox.getSize(boxSize2);
        if (boxSize.x < 10) // Silly wall colliders creation
        {
            //Left
            boxSize.setZ(3);
            let halfSize = boxSize.multiplyScalar(0.5);
            leftWallBox.min.copy(boxCenter).sub(halfSize);
            leftWallBox.max.copy(boxCenter).add(halfSize);
            const slightOffsetLeft = new THREE.Vector3(0, 0, 3.5);
            leftWallBox.min.sub(slightOffsetLeft);
            leftWallBox.max.sub(slightOffsetLeft);

            //Right
            boxSize2.setZ(3);
            halfSize = boxSize2.multiplyScalar(0.5);
            rightWallBox.min.copy(boxCenter).sub(halfSize);
            rightWallBox.max.copy(boxCenter).add(halfSize);
            const slightOffsetRight = new THREE.Vector3(0, 0, -3.5);
            rightWallBox.min.sub(slightOffsetRight);
            rightWallBox.max.sub(slightOffsetRight);
        }
        else if (boxSize.z < 10) // Same, but for a different direction
        {
            //Left
            boxSize.setX(3);
            let halfSize = boxSize.multiplyScalar(0.5);
            leftWallBox.min.copy(boxCenter).sub(halfSize);
            leftWallBox.max.copy(boxCenter).add(halfSize);
            const slightOffsetLeft = new THREE.Vector3(3.5, 0, 0);
            leftWallBox.min.sub(slightOffsetLeft);
            leftWallBox.max.sub(slightOffsetLeft);

            //Right
            boxSize2.setX(3);
            halfSize = boxSize2.multiplyScalar(0.5);
            rightWallBox.min.copy(boxCenter).sub(halfSize);
            rightWallBox.max.copy(boxCenter).add(halfSize);
            const slightOffsetRight = new THREE.Vector3(-3.5, 0, 0);
            rightWallBox.min.sub(slightOffsetRight);
            rightWallBox.max.sub(slightOffsetRight);
        }
        BasicCollisionBank.Register(leftWallBox, false);
        BasicCollisionBank.Register(rightWallBox, false);
        BasicCollisionBank.Register(this.#_doorBox, false);
    }
    OnPlayerClick()
    {
        this.Open();
    }
    Open()
    {
        if (!this.open)
        {
            this.open = true;
            this.baseMat.map = Resources.Get(THREE.Texture, this.openTexture);
            this.baseMat.needsUpdate = true;
            BasicCollisionBank.SetTrigger(this.#_doorBox, true);
            this.#_audioSource.setBuffer(Resources.Get(AudioBuffer, "audios/AlbertDoor_Open.ogg"));
            this.#_audioSource.stop();
            this.#_audioSource.play();
            if (!this.closesWeb)
            {
                setTimeout(() =>
                {
                    this.baseMat.map = Resources.Get(THREE.Texture, this.closedTexture);
                    this.open = false;
                    this.baseMat.needsUpdate = true;
                    BasicCollisionBank.SetTrigger(this.#_doorBox, false);
                    this.#_audioSource.setBuffer(Resources.Get(AudioBuffer, "audios/AlbertDoor_Close.ogg"));
                    this.#_audioSource.stop();
                    this.#_audioSource.play();
                }, 5000);
            }
            else
            {
                setTimeout(() =>
                {
                    window.location.href = "index.html";
                }, 200);
            }
        }
    }
}