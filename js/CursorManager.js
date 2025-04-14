/**
 * Class to manage the mouse cursor: locking, unlocking, hiding, and showing.
 * Automatically listens to pointer lock change events on the window.
 */
export class CursorManager
{
    /** @type {boolean} @private */
    static #isLocked = false;

    /** @type {boolean} @private */
    static #isHidden = false;

    /**
     * Initializes the cursor manager by binding pointer lock event listeners.
     */
    static Initialize()
    {
        document.addEventListener("pointerlockchange", CursorManager.#onPointerLockChange);
        document.addEventListener("pointerlockerror", CursorManager.#onPointerLockError);
    }

    /**
     * Requests the cursor to be locked (pointer lock API).
     */
    static Lock()
    {
        document.body.requestPointerLock();
    }

    /**
     * Unlocks the cursor (exits pointer lock).
     */
    static Unlock()
    {
        if (document.pointerLockElement === document.body)
        {
            document.exitPointerLock();
        }
    }

    /**
     * Hides the cursor using CSS.
     */
    static Hide()
    {
        document.body.style.cursor = "none";
        CursorManager.#isHidden = true;
    }

    /**
     * Shows the cursor using CSS.
     */
    static Show()
    {
        document.body.style.cursor = "default";
        CursorManager.#isHidden = false;
    }

    /**
     * @returns {boolean} Whether the cursor is currently locked.
     */
    static get IsLocked()
    {
        return CursorManager.#isLocked;
    }

    /**
     * @returns {boolean} Whether the cursor is currently hidden (CSS-based).
     */
    static get IsHidden()
    {
        return CursorManager.#isHidden;
    }

    /**
     * @private
     * Handles pointer lock state changes.
     */
    static #onPointerLockChange()
    {
        CursorManager.#isLocked = (document.pointerLockElement === document.body);
    }

    /**
     * @private
     * Handles pointer lock errors.
     */
    static #onPointerLockError()
    {
        console.error("CursorManager: Failed to lock pointer.");
    }
}
