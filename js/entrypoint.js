import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";

import { UserData } from "./UserData.js";
import { Segment_Main } from "./segments/Segment_Main.js";
import { Input, InputKey } from "./Input.js";
import { Segment } from "./Segment.js";
import { Player } from "./Player.js";
import { WebBehaviour } from "./WebBehaviour.js";
import { Camera as Blayms_Camera } from "./Camera.js";
import { Segment_Warning } from "./segments/Segment_Warning.js";
import { Resources } from "./Resources.js";
import { FILES_res_audios, FILES_res_images, FILES_res_obj } from "./AllFiles-Generated.js";

async function main()
{
    //await UserData.CheckForInstance();
    //console.log(UserData.Instance());
}

await Resources.LoadAll(FILES_res_obj.concat(FILES_res_images).concat(FILES_res_audios));

await main();

Input.Initialize();
Input.DefineAxis("Horizontal", [InputKey.KeyD, InputKey.ArrowRight], [InputKey.KeyA, InputKey.ArrowLeft]);
Input.DefineAxis("Vertical", [InputKey.KeyW, InputKey.ArrowUp], [InputKey.KeyS, InputKey.ArrowDown]);
const warningSeg = new Segment_Warning("Warning");
warningSeg.Load();
warningSeg.onGesture(() =>
{
    warningSeg.Dispose();

    const mainSeg = new Segment_Main("Main");
    mainSeg.Load();

    const camera = Blayms_Camera.Main();
    const clock = new THREE.Clock();

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Make it crisp on high-DPI screens
    renderer.domElement.style.position = "absolute"; // Ensure it covers the whole screen
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    document.body.appendChild(renderer.domElement);

    // Enable shadows in the renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

    document.addEventListener('contextmenu', function (e)
    {
        e.preventDefault();
    });

    // Resize handling
    window.addEventListener("resize", () =>
    {
        if (camera != null || camera != undefined)
        {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height);
            camera.GetNative().aspect = width / height;
            camera.GetNative().updateProjectionMatrix();
        }
    });
    function refresh()
    {
        deltaTime = clock.getDelta();
        for (let i = 0; i < WebBehaviour.GetAllCount(); i++)
        {
            const behaviour = WebBehaviour.GetFromAll(i);
            behaviour.Update();
        }
        requestAnimationFrame(refresh);
        if (camera != null || camera != undefined)
        {
            renderer.render(Segment.GetGlobalThreeJsScene(), camera.GetNative());
        }
        Input.Update();
    }

    refresh();
});

/**
 * 
 * @returns { number }
 */
export function GetInnerWidth()
{
    return window.innerWidth;
}
/**
 * 
 * @returns { number }
 */
export function GetInnerHeight()
{
    return window.innerHeight;
}

let deltaTime;

/**
 * 
 * @returns { number }
 */
export function GetDeltaTime()
{
    return deltaTime;
}
/**
 * @returns { boolean }
 */
export function UserIsPossiblySpeakingRussian()
{
    return navigator.languages.includes("ru-RU");
}
