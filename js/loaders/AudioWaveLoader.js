import { AudioLoader } from 'three/src/loaders/AudioLoader.js';

export class AudioWaveLoader
{
    static async Load(path)
    {
        return new Promise((resolve, reject) =>
        {
            const loader = new AudioLoader();

            loader.load(
                path,
                (obj) =>
                {
                    resolve(obj);
                },
                undefined,
                (error) =>
                {
                    reject(error);
                }
            );
        });
    }
}