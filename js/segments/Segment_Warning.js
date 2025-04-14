import { Segment } from "../Segment.js";

export class Segment_Warning extends Segment
{
    /** @type {() => void} */
    #gestureCallback;
    Load()
    {
        super.Load();
        this.#InitializeWarningText();
        window.addEventListener("pointerdown", this.#handleGesture);
    }
    Dispose()
    {
        super.Dispose();
        document.getElementById("blayms-warning")?.remove();
        window.removeEventListener("pointerdown", this.#handleGesture);
    }
    /**
     * Registers a gesture callback
     * @param {(gesture: string) => void} callback
     */
    onGesture(callback)
    {
        this.#gestureCallback = callback;
    }

    #handleGesture = (e) =>
    {
        if (this.#gestureCallback)
        {
            this.#gestureCallback();
        }
    }
    #InitializeWarningText()
    {
        document.documentElement.style.cssText = `
        margin: 0;
        padding: 0;
        height: 100%;
    `;

        document.body.style.cssText = `
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    `;

        const wrapper = document.createElement("div");
        wrapper.id = "blayms-warning";
        wrapper.style.cssText = `
        transform: scale(1.5);
        height: 100vh;
        width: 100vw;
        background-color: black;
        color: white;
        font-family: 'Comic Sans MS', 'Comic Neue', cursive, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        user-select: none;
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none; /* allow clicks to pass through the wrapper */
        z-index: 9999;
    `;

        const container = document.createElement("div");
        container.style.cssText = `
        width: 100%;
        max-width: 1000px;
        padding: 0 60px;
        box-sizing: border-box;
        line-height: 1.8;
        font-size: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: auto; /* allow interaction within the container */
    `;

        const warning = document.createElement("div");
        warning.textContent = "WARNING!";
        warning.style.cssText = `
        color: red;
        font-size: 42px;
        font-weight: bold;
        margin-bottom: 36px;
    `;
        container.appendChild(warning);

        const paragraph1 = document.createElement("div");
        paragraph1.innerHTML = `
        This website contains <span style="color:red">information</span><br>
        about a person nicknamed "Blayms".
    `;
        paragraph1.style.marginBottom = "60px";
        container.appendChild(paragraph1);

        const paragraph2 = document.createElement("div");
        paragraph2.innerHTML = `
        While the website might be actually useful<br>
        for acknowledging a certain person,<br>
        there are still a few assets and a 3D<br>
        JavaScript library that might cause lag.
    `;
        paragraph2.style.marginBottom = "64px";
        container.appendChild(paragraph2);

        const continueText = document.createElement("div");
        continueText.textContent = "PRESS ANY BUTTON FOR A GESTURE TO CONTINUE";
        continueText.style.cssText = `
        font-size: 30px;
        font-weight: bold;
    `;
        container.appendChild(continueText);

        wrapper.appendChild(container);
        document.body.appendChild(wrapper);
    }

}