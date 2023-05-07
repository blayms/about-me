
class GlobalClass {

    constructor() {
        this.audios = [
            'AssFart_NightTheme',
            'deenatema',
            'HeavyMEH',
            "LuvVperde",
            "thisisajoke",
            "trillbaldi"
        ];

        this.bg = [
            'Blayms',
            'Baldi',
            'strangebaldi',
            'waterornot'
        ];

        this.RandomInt = function (min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }
        this.flagClicks = 0;
    }

}

// Create an instance of the GlobalClass
const globalInstance = new GlobalClass();

// Assign the instance to the global object
// In browsers:
window.globalInstance = globalInstance;