import { Player } from "../Player.js";
import { Segment } from "../Segment.js";
import { WebBehaviour } from "../WebBehaviour.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { Resources } from "../Resources.js";
import { Tile } from "../Tile.js";
import { DebugCompass } from "../DebugCompass.js";
import { BasicCollisionBank } from "../BasicCollisionBank.js";
import { Poster } from "../Poster.js";
import { Direction } from "../Directions.js";
import { Door } from "../Door.js";

export class Segment_Main extends Segment
{
    Load()
    {
        super.Load();

        WebBehaviour.Create(Player, "Player");

        const fontLoader = new FontLoader();
        fontLoader.load('/res/fonts/comicsans.json', (font) =>
        {

            const textGeometry = new TextGeometry('[ ABOUT BLAYMS ]', {
                font: font,
                size: 1,
                depth: 1,
                curveSegments: 24,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelOffset: 0,
                bevelSegments: 5
            });

            textGeometry.computeBoundingBox();

            const textMaterial = new THREE.MeshPhongMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide,
                depthWrite: true
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Centering the text
            if (textGeometry.boundingBox)
            {
                const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
                textMesh.position.set(-textWidth / 2, 0, 0);
            }

            textMesh.castShadow = true; // Text will cast a shadow
            textMesh.receiveShadow = true; // Text will receive shadows
            Segment.GetGlobalThreeJsScene().add(textMesh);
        });

        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(5, 10, 5);
        light.castShadow = true;
        Segment.GetGlobalThreeJsScene().add(light);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        Segment.GetGlobalThreeJsScene().add(ambientLight);

        this.#CreateMap();
    }

    #CreateMap()
    {
        //#region Creating a main room
        this.#CreateRoom(5, 3, 0, 0, "TileAtlas_AlbertHalls", [
            [0, 1],
            [2, 0],
            [2, 2],
            [4, 1]
        ]);
        new Poster("PST_Test", 30, 0, Direction.South);
        new Door(-10, 10, Direction.West);
        new Door(50, 10, Direction.East);
        new Door(20, 0, Direction.North);
        new Door(20, 20, Direction.South);
        //#endregion

        //#region Creating connection halls
        new Tile("Straight_EW", "TileAtlas_AlbertHalls", 20, -10);
        new Tile("Straight_EW", "TileAtlas_AlbertHalls", 20, -20);
        new Tile("Straight_EW", "TileAtlas_AlbertHalls", 20, -30);
        new Door(20, -40, Direction.South);
        new Tile("Straight_EW", "TileAtlas_AlbertHalls", 20, 30);
        new Tile("Straight_EW", "TileAtlas_AlbertHalls", 20, 40);
        new Tile("Straight_EW", "TileAtlas_AlbertHalls", 20, 50);
        new Door(20, 50, Direction.South);
        new Tile("Straight_NS", "TileAtlas_AlbertHalls", -10, 10);
        new Tile("Straight_NS", "TileAtlas_AlbertHalls", -20, 10);
        new Tile("Straight_NS", "TileAtlas_AlbertHalls", -30, 10);
        new Door(-40, 10, Direction.West);
        new Tile("Straight_NS", "TileAtlas_AlbertHalls", 50, 10);
        new Tile("Straight_NS", "TileAtlas_AlbertHalls", 60, 10);
        new Tile("Straight_NS", "TileAtlas_AlbertHalls", 70, 10);
        new Door(70, 10, Direction.West, true);
        //#endregion

        //#region Creating About room
        this.#CreateRoom(5, 5, 0, -80, "TileAtlas_JaneFaculty", [
            [2, 4]
        ]);
        //#endregion

        //#region Creating Links room
        this.#CreateRoom(5, 4, -80, 0, "TileAtlas_YWAWGrids", [
            [4, 1]
        ]);
        //#endregion

        //#region Creating Birthday room!
        this.#CreateRoom(3, 5, 10, 60, "TileAtlas_MyRoom", [
            [1, 0]
        ]);
        //#endregion
    }
    /**
    * Creates a rectangular room with solid walls and optional open tiles.
    *
    * @param {number} width - Width of the room in tiles (X-axis).
    * @param {number} height - Height of the room in tiles (Z-axis).
    * @param {number} offsetX - World X offset for room placement.
    * @param {number} offsetZ - World Z offset for room placement.
    * @param {string} texture - The name of the tile atlas texture.
    * @param {Array<[number, number]>} openTiles - Array of [x, z] tile coordinates to make "Open" (no walls).
    */
    #CreateRoom(width, height, offsetX, offsetZ, texture, openTiles = [])
    {
        const isOpenTile = (x, z) => openTiles.some(([ox, oz]) => ox === x && oz === z);

        for (let zIndex = 0; zIndex < height; zIndex++)
        {
            for (let xIndex = 0; xIndex < width; xIndex++)
            {
                const worldX = offsetX + xIndex * 10;
                const worldZ = offsetZ + zIndex * 10;

                const isTop = zIndex === 0;
                const isBottom = zIndex === height - 1;
                const isLeft = xIndex === 0;
                const isRight = xIndex === width - 1;

                let tileName = "Open";

                // Skip wall tile types if this tile is marked as open
                if (!isOpenTile(xIndex, zIndex))
                {
                    // Corners
                    if (isTop && isLeft)
                        tileName = "Corner_ES";
                    else if (isTop && isRight)
                        tileName = "Corner_SW";
                    else if (isBottom && isLeft)
                        tileName = "Corner_NE";
                    else if (isBottom && isRight)
                        tileName = "Corner_NW";

                    // Edges (excluding corners)
                    else if (isTop)
                        tileName = "Single_S";
                    else if (isBottom)
                        tileName = "Single_N";
                    else if (isLeft)
                        tileName = "Single_E";
                    else if (isRight)
                        tileName = "Single_W";
                }

                new Tile(tileName, texture, worldX, worldZ);
            }
        }
    }
}