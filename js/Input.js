/**
 * A static class for handling keyboard, mouse, and gamepad input.
 * @class
 */
export class Input
{
    /** @private @type {Object.<string, {down: boolean, up: boolean, held: boolean}>} */
    static #keys = {};

    /** @private @type {Object.<string, {down: boolean, up: boolean, held: boolean}>} */
    static #mouseButtons = {};

    /** @private @type {{x: number, y: number}} */
    static #mousePosition = { x: 0, y: 0 };

    /** @private @type {number} */
    static #mouseScrollDelta = 0;

    /** @private @type {Object.<number, boolean[]>} */
    static #gamepadStates = {};

    /** @private @type {Object.<number, boolean[]>} */
    static #prevGamepadStates = {};

    /** @private @type {Object.<string, {positive: string[], negative: string[]}>} */
    static #axes = {};

    /** @private @type {{x: number, y: number}} */
    static #mouseDelta = { x: 0, y: 0 };


    /**
     * Initializes all input event listeners.
     * @static
     */
    static Initialize()
    {
        window.addEventListener("keydown", (e) => Input.#OnKeyDown(e));
        window.addEventListener("keyup", (e) => Input.#OnKeyUp(e));
        window.addEventListener("mousedown", (e) => Input.#OnMouseDown(e));
        window.addEventListener("mouseup", (e) => Input.#OnMouseUp(e));
        window.addEventListener("mousemove", (e) => Input.#OnMouseMove(e));
        window.addEventListener("wheel", (e) => Input.#OnMouseWheel(e));
        window.addEventListener("gamepadconnected", () => Input.#UpdateGamepads());
        window.addEventListener("gamepaddisconnected", () => Input.#UpdateGamepads());

        // Disable right-click context menu
        window.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    // === Keyboard Input ===
    /**
     * Handles keydown events.
     * @private
     * @static
     * @param {KeyboardEvent} event - The keyboard event
     */
    static #OnKeyDown(event)
    {
        if (!Input.#keys[event.code])
        {
            Input.#keys[event.code] = { down: true, up: false, held: true };
        } else
        {
            if (!Input.#keys[event.code].held)
            {
                Input.#keys[event.code].down = true;
            }
            Input.#keys[event.code].held = true;
        }
    }

    /**
     * Handles keyup events.
     * @private
     * @static
     * @param {KeyboardEvent} event - The keyboard event
     */
    static #OnKeyUp(event)
    {
        if (Input.#keys[event.code])
        {
            Input.#keys[event.code].up = true;
            Input.#keys[event.code].held = false;
        }
    }

    /**
     * Checks if a key was pressed down this frame.
     * @static
     * @param {string} key - The key code (e.g., "KeyA")
     * @returns {boolean} True if the key was pressed this frame
     */
    static GetKeyDown(key)
    {
        return Input.#keys[key]?.down ?? false;
    }

    /**
     * Checks if a key was released this frame.
     * @static
     * @param {string} key - The key code (e.g., "KeyA")
     * @returns {boolean} True if the key was released this frame
     */
    static GetKeyUp(key)
    {
        return Input.#keys[key]?.up ?? false;
    }

    /**
     * Checks if a key is currently being held down.
     * @static
     * @param {string} key - The key code (e.g., "KeyA")
     * @returns {boolean} True if the key is being held
     */
    static GetKeyHeld(key)
    {
        return Input.#keys[key]?.held ?? false;
    }

    // === Mouse Input ===
    /**
     * Handles mousedown events.
     * @private
     * @static
     * @param {MouseEvent} event - The mouse event
     */
    static #OnMouseDown(event)
    {
        const button = `Mouse${event.button}`;
        if (!Input.#mouseButtons[button])
        {
            Input.#mouseButtons[button] = { down: true, up: false, held: true };
        } else
        {
            Input.#mouseButtons[button].down = true;
            Input.#mouseButtons[button].held = true;
        }
    }

    /**
     * Handles mouseup events.
     * @private
     * @static
     * @param {MouseEvent} event - The mouse event
     */
    static #OnMouseUp(event)
    {
        const button = `Mouse${event.button}`;
        if (Input.#mouseButtons[button])
        {
            Input.#mouseButtons[button].up = true;
            Input.#mouseButtons[button].held = false;
        }
    }

    /**
     * Handles mousemove events.
     * @private
     * @static
     * @param {MouseEvent} event - The mouse event
     */
    static #OnMouseMove(event)
    {
        const newX = event.clientX;
        const newY = event.clientY;

        Input.#mouseDelta.x = event.movementX;
        Input.#mouseDelta.y = event.movementY;

        Input.#mousePosition.x = newX;
        Input.#mousePosition.y = newY;
    }

    /**
 * Gets the mouse movement delta since the last frame.
 * @static
 * @returns {{x: number, y: number}} The mouse delta
 */
    static GetMouseDelta()
    {
        return { x: Input.#mouseDelta.x, y: Input.#mouseDelta.y };
    }


    /**
     * Handles mouse wheel events.
     * @private
     * @static
     * @param {WheelEvent} event - The wheel event
     */
    static #OnMouseWheel(event)
    {
        Input.#mouseScrollDelta = event.deltaY;
    }

    /**
     * Checks if a mouse button was pressed down this frame.
     * @static
     * @param {string} button - The mouse button (e.g., "Mouse0")
     * @returns {boolean} True if the button was pressed this frame
     */
    static GetMouseButtonDown(button)
    {
        return Input.#mouseButtons[button]?.down ?? false;
    }

    /**
     * Checks if a mouse button was released this frame.
     * @static
     * @param {string} button - The mouse button (e.g., "Mouse0")
     * @returns {boolean} True if the button was released this frame
     */
    static GetMouseButtonUp(button)
    {
        return Input.#mouseButtons[button]?.up ?? false;
    }

    /**
     * Checks if a mouse button is currently being held down.
     * @static
     * @param {string} button - The mouse button (e.g., "Mouse0")
     * @returns {boolean} True if the button is being held
     */
    static GetMouseButton(button)
    {
        return Input.#mouseButtons[button]?.held ?? false;
    }

    /**
     * Gets the current mouse position in screen coordinates.
     * @static
     * @returns {{x: number, y: number}} The mouse position
     */
    static GetMousePosition()
    {
        return { x: Input.#mousePosition.x, y: Input.#mousePosition.y };
    }

    /**
     * Gets the mouse scroll delta for this frame and resets it.
     * @static
     * @returns {number} The scroll delta (positive for down, negative for up)
     */
    static GetMouseScrollDelta()
    {
        const delta = Input.#mouseScrollDelta;
        Input.#mouseScrollDelta = 0;
        return delta;
    }

    // === Gamepad Input ===
    /**
     * Updates the gamepad states.
     * @private
     * @static
     */
    static #UpdateGamepads()
    {
        const gamepads = navigator.getGamepads();
        for (let i = 0; i < gamepads.length; i++)
        {
            if (gamepads[i])
            {
                if (!Input.#gamepadStates[i])
                {
                    Input.#gamepadStates[i] = [];
                    Input.#prevGamepadStates[i] = [];
                }

                const buttons = gamepads[i].buttons.map(button => button.pressed);
                Input.#prevGamepadStates[i] = [...Input.#gamepadStates[i]];
                Input.#gamepadStates[i] = buttons;
            }
        }
    }

    /**
     * Checks if a gamepad button was pressed down this frame.
     * @static
     * @param {number} gamepadIndex - The gamepad index
     * @param {number} buttonIndex - The button index
     * @returns {boolean} True if the button was pressed this frame
     */
    static GetGamepadButtonDown(gamepadIndex, buttonIndex)
    {
        return Input.#gamepadStates[gamepadIndex]?.[buttonIndex] &&
            !Input.#prevGamepadStates[gamepadIndex]?.[buttonIndex];
    }

    /**
     * Checks if a gamepad button was released this frame.
     * @static
     * @param {number} gamepadIndex - The gamepad index
     * @param {number} buttonIndex - The button index
     * @returns {boolean} True if the button was released this frame
     */
    static GetGamepadButtonUp(gamepadIndex, buttonIndex)
    {
        return !Input.#gamepadStates[gamepadIndex]?.[buttonIndex] &&
            Input.#prevGamepadStates[gamepadIndex]?.[buttonIndex];
    }

    /**
     * Checks if a gamepad button is currently being held down.
     * @static
     * @param {number} gamepadIndex - The gamepad index
     * @param {number} buttonIndex - The button index
     * @returns {boolean} True if the button is being held
     */
    static GetGamepadButtonHeld(gamepadIndex, buttonIndex)
    {
        return Input.#gamepadStates[gamepadIndex]?.[buttonIndex] ?? false;
    }

    // === Axis System ===
    /**
     * Defines an input axis with positive and negative keys.
     * @static
     * @param {string} name - The name of the axis
     * @param {string[]} positiveKeys - Keys that increase the axis value
     * @param {string[]} negativeKeys - Keys that decrease the axis value
     * @param {string[]} [altPositiveKeys] - Alternative keys that increase the axis value
     * @param {string[]} [altNegativeKeys] - Alternative keys that decrease the axis value
     */
    static DefineAxis(name, positiveKeys, negativeKeys, altPositiveKeys = [], altNegativeKeys = [])
    {
        Input.#axes[name] = {
            positive: [...positiveKeys, ...altPositiveKeys],
            negative: [...negativeKeys, ...altNegativeKeys]
        };
    }

    /**
     * Gets the value of an input axis (-1 to 1).
     * @static
     * @param {string} name - The name of the axis
     * @returns {number} The axis value (clamped between -1 and 1)
     */
    static GetAxis(name)
    {
        if (!Input.#axes[name])
        {
            return 0;
        }

        let value = 0;
        for (let key of Input.#axes[name].positive)
        {
            if (Input.GetKeyHeld(key))
            {
                value += 1;
            }
        }
        for (let key of Input.#axes[name].negative)
        {
            if (Input.GetKeyHeld(key))
            {
                value -= 1;
            }
        }
        return Math.max(-1, Math.min(1, value)); // Clamp between -1 and 1
    }

    // === Update Function ===
    /**
     * Updates the input system (should be called once per frame).
     * @static
     */
    static Update()
    {
        // Reset the "down" and "up" states for the next frame
        for (const key in Input.#keys)
        {
            Input.#keys[key].down = false;
            Input.#keys[key].up = false;
        }

        // Reset the "down" and "up" states for mouse buttons
        for (const button in Input.#mouseButtons)
        {
            Input.#mouseButtons[button].down = false;
            Input.#mouseButtons[button].up = false;
        }

        // Reset mouse delta
        Input.#mouseDelta.x = 0;
        Input.#mouseDelta.y = 0;


        // Update gamepad states
        Input.#UpdateGamepads();
    }
}

/**
 * A collection of standard input key codes.
 * @namespace
 */
export const InputKey = Object.freeze({
    // Keyboard keys
    KeyA: "KeyA", KeyB: "KeyB", KeyC: "KeyC", KeyD: "KeyD", KeyE: "KeyE",
    KeyF: "KeyF", KeyG: "KeyG", KeyH: "KeyH", KeyI: "KeyI", KeyJ: "KeyJ",
    KeyK: "KeyK", KeyL: "KeyL", KeyM: "KeyM", KeyN: "KeyN", KeyO: "KeyO",
    KeyP: "KeyP", KeyQ: "KeyQ", KeyR: "KeyR", KeyS: "KeyS", KeyT: "KeyT",
    KeyU: "KeyU", KeyV: "KeyV", KeyW: "KeyW", KeyX: "KeyX", KeyY: "KeyY",
    KeyZ: "KeyZ",

    Digit0: "Digit0", Digit1: "Digit1", Digit2: "Digit2", Digit3: "Digit3",
    Digit4: "Digit4", Digit5: "Digit5", Digit6: "Digit6", Digit7: "Digit7",
    Digit8: "Digit8", Digit9: "Digit9",

    Escape: "Escape", Tab: "Tab", CapsLock: "CapsLock",
    ShiftLeft: "ShiftLeft", ShiftRight: "ShiftRight",
    ControlLeft: "ControlLeft", ControlRight: "ControlRight",
    AltLeft: "AltLeft", AltRight: "AltRight", Space: "Space",
    Enter: "Enter", Backspace: "Backspace", Delete: "Delete",
    ArrowUp: "ArrowUp", ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft", ArrowRight: "ArrowRight",
    Home: "Home", End: "End", PageUp: "PageUp", PageDown: "PageDown",
    Insert: "Insert", MetaLeft: "MetaLeft", MetaRight: "MetaRight",

    // Function keys
    F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5",
    F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10",
    F11: "F11", F12: "F12",

    // Mouse buttons
    Mouse0: "Mouse0", // Left Button
    Mouse1: "Mouse1", // Middle Button
    Mouse2: "Mouse2", // Right Button
    Mouse3: "Mouse3", // Extra Button 1
    Mouse4: "Mouse4", // Extra Button 2

    // Gamepad buttons
    Gamepad0: "Gamepad0", Gamepad1: "Gamepad1", Gamepad2: "Gamepad2",
    Gamepad3: "Gamepad3", Gamepad4: "Gamepad4", Gamepad5: "Gamepad5",
    Gamepad6: "Gamepad6", Gamepad7: "Gamepad7", Gamepad8: "Gamepad8",
    Gamepad9: "Gamepad9", Gamepad10: "Gamepad10", Gamepad11: "Gamepad11",
    Gamepad12: "Gamepad12", Gamepad13: "Gamepad13", Gamepad14: "Gamepad14",
    Gamepad15: "Gamepad15",
});