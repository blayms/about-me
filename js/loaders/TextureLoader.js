import * as THREE from 'three';

export class TextureLoader
{
    static Load(path)
    {
        return new Promise((resolve, reject) =>
        {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                path,
                (texture) =>
                {
                    texture.minFilter = THREE.NearestFilter;
                    texture.magFilter = THREE.NearestFilter;
                    texture.generateMipmaps = false;
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.colorSpace = THREE.SRGBColorSpace;

                    resolve(texture);
                },
                undefined,
                (error) => reject(error)
            );
        });
    }
}
