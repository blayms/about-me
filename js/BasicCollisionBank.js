import * as THREE from 'three';

export class BasicCollisionBank
{
    /** @type {Map<THREE.Box3, boolean>} */
    static #_map = new Map();

    static Register(collider, isTrigger)
    {
        if (!this.#_map.has(collider))
        {
            this.#_map.set(collider, isTrigger);
        }
    }
    /**
     * 
     * @param {THREE.Box3} collider 
     * @returns {boolean}
     */
    static IsTrigger(collider)
    {
        return this.#_map.get(collider) ?? false;
    }
    /**
    * Returns the interaction script associated with a given object.
    * @param {THREE.Box3} collider
    * @param {boolean} value 
    */
    static SetTrigger(collider, value)
    {
        this.#_map.set(collider, value);
    }

    /** @returns {IterableIterator<[THREE.Box3, boolean]>} */
    static GetAll()
    {
        return this.#_map.entries();
    }

    /** @returns { number } */
    static GetCount()
    {
        return this.#_map.size;
    }
    /**
    * Removes an object from the bank.
    * @param {THREE.Box3} object
    */
    static Unregister(object)
    {
        this.#_map.delete(object);
    }
}
