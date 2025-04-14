/**
 * @typedef {Object} DebugLabelOptions
 * @property {string} [color="white"] - Text color of the debug label.
 * @property {string} [fontSize="18px"] - Font size of the debug label.
 * @property {string} [background="rgba(0, 0, 0, 0.7)"] - Background color of the debug label.
 * @property {string} [scale="1"] - Scale factor for the label (via transform).
 * @property {string} [transition="opacity 1s ease-in-out, transform 1s ease-in-out"] - CSS transition string to apply.
 */


export class DebugLabel
{
    static #parseTransitionDuration(transition)
    {
        const regex = /(?:^|,)\s*\S+\s+([\d.]+)(ms|s)/g;
        let max = 0;
        let match;

        while ((match = regex.exec(transition)) !== null)
        {
            let value = parseFloat(match[1]);
            if (match[2] === "s") value *= 1000;
            if (value > max) max = value;
        }

        return max || 1000;
    }

    /**
     * Creates an HTML debug message with a given ID.
     * 
     * @param {string} id - Unique identifier for the label element.
     * @param {string} text - Text content of the label.
     * @param {DebugLabelOptions} [options={}] - Optional styling options.
     * @param {Document} [doc=document] - The document context to use (e.g., for iframes).
     */
    static Create(id, text, options = {}, doc = document)
    {
        const {
            color = "white",
            fontSize = "18px",
            background = "rgba(0, 0, 0, 0.7)",
            scale = "1",
            transition = "opacity 1s ease-in-out, transform 1s ease-in-out"
        } = options;

        let computedScale = parseFloat(scale);
        if (this.#IsMobile())
        {
            computedScale *= 0.5;
        }

        const element = doc.createElement("div");
        element.id = id;
        element.textContent = text;

        Object.assign(element.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${computedScale})`,
            background,
            color,
            padding: "1em 2em",
            borderRadius: "0.75em",
            fontSize,
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            zIndex: "9999",
            opacity: "0",
            transition,
            maxWidth: "90vw",
            wordWrap: "break-word",
            boxSizing: "border-box"
        });

        element.dataset.debugLabelTransition = transition;

        doc.body.appendChild(element);

        const style = doc.createElement("style");
        style.textContent = `
        @media (max-width: 600px) {
            #${id} {
                font-size: 16px !important;
                padding: 0.75em 1.5em !important;
            }
        }`;
        doc.head.appendChild(style);

        requestAnimationFrame(() =>
        {
            element.style.opacity = "1";
            element.style.transform = `translate(-50%, -50%) scale(${computedScale})`;
        });

    }

    /**
     * Removes an HTML debug message by ID.
     * 
     * @param {string} id - The ID of the debug label to remove.
     * @param {Document} [doc=document] - The document context to use.
     */
    static Remove(id, doc = document)
    {
        const element = doc.getElementById(id);
        if (element)
        {
            element.style.opacity = "0";

            const transition = element.dataset.debugLabelTransition || "";
            const delay = this.#parseTransitionDuration(transition);

            setTimeout(() => element.remove(), delay);
        }
    }

    /**
     * Creates and shows a timed debug label that disappears after a delay.
     * 
     * @param {string} id - Unique identifier for the label element.
     * @param {string} text - Text content of the label.
     * @param {number} duration - Duration in milliseconds before auto-removal.
     * @param {DebugLabelOptions} [options={}] - Optional styling options.
     * @param {Document} [doc=document] - The document context to use.
     * @param {Function} [afterVanish] - Callback to run after the label disappears.
     */
    static CreateTimed(id, text, duration = 3000, options = {}, doc = document, afterVanish)
    {
        DebugLabel.Create(id, text, options, doc);
        setTimeout(() =>
        {
            DebugLabel.Remove(id, doc);
            if (typeof afterVanish === "function")
            {
                setTimeout(afterVanish, 1000); // Delay matches fade-out transition
            }
        }, duration);
    }
    static #IsMobile()
    {
        if (navigator.userAgentData && typeof navigator.userAgentData.mobile !== "undefined")
        {
            return navigator.userAgentData.mobile && !/tablet/i.test(navigator.userAgentData.platform);
        }

        return /Mobi|Android|iPhone|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

}
