import * as THREE from "three";

/**
 * A global registry for interactable objects in the scene.
 */
export class BasicInteractionBank
{
    /** @type {Map<THREE.Object3D, InteractableWebObject>} */
    static #_map = new Map();

    /**
     * Registers an interactable object in the bank.
     * @param {THREE.Object3D} object - The object to track (e.g., a Mesh).
     * @param {InteractableWebObject} interactable - The associated interaction logic.
     */
    static Register(object, interactable)
    {
        if (!this.#_map.has(object))
        {
            this.#_map.set(object, interactable);
        }
    }

    /**
     * Returns the interaction script associated with a given object.
     * @param {THREE.Object3D} object
     * @returns {InteractableWebObject | undefined}
     */
    static Get(object)
    {
        return this.#_map.get(object);
    }

    /**
     * Returns all entries.
     * @returns {IterableIterator<[THREE.Object3D, InteractableWebObject]>}
     */
    static GetAll()
    {
        return this.#_map.entries();
    }

    /**
     * Returns how many interactables are registered.
     * @returns {number}
     */
    static GetCount()
    {
        return this.#_map.size;
    }

    /**
     * Removes an object from the bank.
     * @param {THREE.Object3D} object
     */
    static Unregister(object)
    {
        this.#_map.delete(object);
    }
}
