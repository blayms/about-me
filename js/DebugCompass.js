import * as THREE from 'three';
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export class DebugCompass
{
    constructor(scene)
    {
        this.scene = scene;
        this.markers = {};
        this.font = null;

        this._createMarkers();
        this._loadFont();
    }

    _createMarkers()
    {
        const directions = {
            N: { pos: new THREE.Vector3(0, 0.25, -3), color: 0xff0000 },
            E: { pos: new THREE.Vector3(3, 0.25, 0), color: 0x00ff00 },
            S: { pos: new THREE.Vector3(0, 0.25, 3), color: 0x0000ff },
            W: { pos: new THREE.Vector3(-3, 0.25, 0), color: 0xffff00 }
        };

        for (const [dir, { pos, color }] of Object.entries(directions))
        {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshStandardMaterial({ color })
            );
            cube.position.copy(pos);
            this.scene.add(cube);
            this.markers[dir] = cube;
        }
    }

    _loadFont()
    {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font =>
        {
            this.font = font;
            this._addLabels();
        });
    }

    _addLabels()
    {
        for (const [dir, marker] of Object.entries(this.markers))
        {
            const geometry = new TextGeometry(dir, {
                font: this.font,
                size: 0.4,
                height: 0.05,
                depth: 0.5,
            });

            const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(geometry, material);

            geometry.computeBoundingBox();
            const centerOffset = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2;

            textMesh.position.set(
                marker.position.x - centerOffset,
                marker.position.y + 0.5,
                marker.position.z
            );

            this.scene.add(textMesh);
        }
    }
}
