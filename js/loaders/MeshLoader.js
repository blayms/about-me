import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Resources } from '../Resources.js';

export class MeshLoader
{
    static async Load(path)
    {
        return new Promise((resolve, reject) =>
        {
            const loader = new OBJLoader();

            loader.load(
                path,
                (obj) =>
                {
                    obj.traverse((child) =>
                    {
                        if (child.isMesh) {
                            child.material = new THREE.MeshBasicMaterial(
                            {
                                map: Resources.Get("images/textures/AtlasTest_Classroom.png"),
                                transparent: true,
                                alphaTest: 0.1
                            });
                            child.material.needsUpdate = true;
                        }
                    });

                    //console.log(`Loaded OBJ: ${path}`);
                    resolve(obj);
                },
                undefined,
                (error) =>
                {
                    //console.error(`Error loading OBJ: ${path}`, error);
                    reject(error);
                }
            );
        });
    }
}