import * as THREE from 'three';
import { TextureLoader } from './Loaders/TextureLoader.js';
import { MeshLoader } from './Loaders/MeshLoader.js';
import { AudioWaveLoader } from './Loaders/AudioWaveLoader.js';

/**
 * Resource manager class to load and access "res" folder.
 */
export class Resources
{
    /**
     * @type {Object<string, any>}
     * Dictionary to store loaded assets.
     * Keys are asset names (relative paths), values are the loaded resources.
     */
    static assets = {};

    /**
     * @type {boolean}
     * Private flag to check if resources are already loaded.
     */
    static #loadedAll = false;

    /**
     * Loads all specified resource files and stores them in the assets dictionary.
     *
     * @param {string[]} files - An array of file paths to load. Supported: `.png`, `.jpg`, `.jpeg`, `.bmp`, `.gif`, `.hdr`, `.wav`, `.ogg`, `.obj`
     * @returns {Promise<void>} Resolves when all files are loaded.
     */
    static async LoadAll(files)
    {
        if (this.#loadedAll)
        {
            return;
        }

        const loadPromises = files.map(async (file) =>
        {
            const assetName = file.replace(/^res\//, ''); // Remove 'res/' prefix

            try
            {
                if (/\.(wav|ogg)$/i.test(file))
                {
                    Resources.assets[assetName] = await AudioWaveLoader.Load(file);
                }
                if (/\.(png|jpg|jpeg|bmp|gif)$/i.test(file))
                {
                    Resources.assets[assetName] = await TextureLoader.Load(file);
                }
                else if (/\.(hdr)$/i.test(file))
                {
                    const loader = new THREE.RGBELoader();
                    Resources.assets[assetName] = await loader.loadAsync(file);
                }
                else if (/\.(obj)$/i.test(file))
                {
                    Resources.assets[assetName] = await MeshLoader.Load(file);
                }
            }
            catch (error)
            {
                console.log(("Failed loading an asset: ").concat(assetName), error);
            }
        });

        await Promise.all(loadPromises);

        // Mark assets as loaded
        this.#loadedAll = true;
    }

    /**
     * @template {new (...args: any[]) => any} T
     * @param {T} Type - The constructor of the expected type.
     * @param {string} name - The name (key) of the asset to retrieve.
     * @returns {InstanceType<T> | null} The asset cast to the expected type, or null if not found.
     */
    static Get(Type, name)
    {
        return /** @type {InstanceType<T> | null} */ (Resources.assets[name] || null);
    }

    /**
     * Retrieves all loaded assets as an array.
     * @returns {any[]} An array containing all loaded asset instances.
     */
    static GetAllAssets()
    {
        return Object.values(this.assets);
    }

    /**
     * Retrieves all loaded assets as an array.
     * @returns {any[]} An array containing all loaded asset instances.
     */
    static GetAllNames()
    {
        return Object.keys(this.assets);
    }
}
