import { WebObject } from "./WebObject.js";

export class WebBehaviour extends WebObject
{
    static #_instances = {};
    static #_allWebBehs = {};

    constructor(name)
    {
        super(name)
    }

    /**
     * Gets a Singleton WebBehaviour instance of type 
     * @param {Type} Type The type of the instance
     */
    static GetSingletonInstance(Type)
    {
        var instance = WebBehaviour.#_instances[Type.name];
        if (instance === undefined || instance === null)
        {
            console.log("Missing a Singleton instance for", Type.name);
            return null;
        }
        return instance;
    }
    /**
     * Sets a Singleton instance of type
     * @param {WebBehaviour} object The instance to be set as a singleton
    */
    static SetSingletonInstance(object)
    {
        const typeName = object.constructor.name;
        WebBehaviour.#_instances[typeName] = object;
    }
    /**
     * @template {typeof WebBehaviour} T
     * @param {T} WebBehaviourType 
     * @param {string} name 
     * @returns {InstanceType<T>}
     */
    static Create(WebBehaviourType, name)
    {
        const behaviour = new WebBehaviourType(name);
        this.#_allWebBehs[name] = behaviour;

        behaviour.Awake();
        behaviour.Start();

        return behaviour;
    }
    /**
     * 
     * @param { number } index | Index of the WebBehaviour
     * @returns { WebBehaviour }
     */
    static GetFromAll(index)
    {
        return Object.values(this.#_allWebBehs)[index];
    }
    /**
     * @returns { number }
     */
    static GetAllCount()
    {
        return Object.keys(this.#_allWebBehs).length;
    }
    /**
     * 
     * @param { string } name | The name of the behaviour
     */
    static Remove(name)
    {
        this.#_allWebBehs[name].Dispose();
        delete this.#_allWebBehs[name];
    }
    /**
    * Clears the Singleton instance of type
    * @param {Function} Type The type of the instance to clear
    */
    static ClearSingletonInstance(Type)
    {
        const typeName = Type.name;

        // Check if the instance exists, and if it does, remove it
        if (WebBehaviour.#_instances[typeName])
        {
            delete WebBehaviour.#_instances[typeName];
        }
        else
        {
            console.log(`No Singleton instance found for ${typeName} to clear.`);
        }
    }

    /**
     * Runs once when WebBehaviour is getting created
     */
    Awake()
    {

    }
    /**
    * Runs once when WebBehaviour finishes it's initialization
    */
    Start()
    {

    }
    /**
    * Runs every render frame after Start method
    */
    Update()
    {

    }
}