// UserData.js
import { IndexedDBManager } from './IndexedDBManager.js';

export class UserData
{
    // Static variable to hold the singleton instance
    static #_instance = null;
    static #dbName = "dbAboutBlayms";  // IndexedDB name
    static #storeName = "UserData";      // Object store name

    constructor({ name = "Unknown", clicks = 0, theme = "light" } = {})
    {
        // Initialize the instance properties
        this.name = name;
        this.clicks = clicks;
        this.theme = theme;
    }

    // Synchronous getter for the instance
    static Instance()
    {
        return UserData.#_instance;
    }

    // Asynchronous function to check and load the instance from IndexedDB (or create/save if not found)
    static async CheckForInstance()
    {
        if (!UserData.#_instance)
        {
            const data = await IndexedDBManager.load(UserData.#dbName, UserData.#storeName);
            if (data)
            {
                UserData.#_instance = new UserData(data);
            }
            else
            {
                UserData.#_instance = new UserData();
                await UserData.#_instance.save();
            }
        }
    }

    toJSON() {
        return{
            name: this.name,
            clicks: this.clicks,
            theme: this.theme
        };
    }

    async save()
    {
        await IndexedDBManager.save(UserData.#dbName, UserData.#storeName, this.toJSON());
    }

    static fromJSON(json)
    {
        const data = JSON.parse(json);
        return new UserData(data);
    }
}
