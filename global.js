
class GlobalClass {

    constructor() {
        this.audios = [
            '0',
            '1',
            '2',
            '3',
            "4",
            "5",
            "6"
        ];

        this.bg = [
            'Blayms',
            'Baldi',
            'strangebaldi',
            'waterornot',
            'pompexe'
        ];

        this.easterIndex = 0;

        this.easterMsgs = {
            50: "Stop clicking on this Russian flag please!",
            100: "No, seriously. What do you expect?!",
            125: "SUKA BLYAT",
            150: "Are you angry?",
            200: "Looks like you are really angry! You clicked 200 times on flag with 3 colors",
            250: "So, what do you actually want?",
            300: "Oh, I got you!",
            350: "wait for it...",
            375: ".",
            400: "..",
            425: "...",
            450: "I was joking haha! Let's click more!",
            500: "Sorry if your hand is already tired",
            550: "Actually, there's nothing else there",
            600: "And you are still trying to see?",
            750: "STILL?",
            775: "Alr, continue clicking and...",
            800: "nothing will happen haha!",
            825: "Are you serious?",
            850: "My hero",
            875: "💀",
            900: "Are you happy?",
            950: "So how is your day going?",
            1000: "You are talking to nobody",
            1050: "You are not uncovering some ARG",
            1100: "It's a silly waste of time",
            1125: "*THE END*",
            1150: "I'm not responsable for your finger...",
            1175: "deenatema",
            1176: "voice dot ai",
            1200: "Web developmment is fun!",
            1225: "What if nobody is even clicking tho",
            1250: "SOMEBODY, ARE DO YOU HEAR ME?",
            1300: "How the hell clicking on a flag is even connected to all of that?",
            1350: "Um, so you actually want to achive something? Alr, just click couple of times",
            1360: ".",
            1370: "..",
            1380: "...",
            1400: ":P",
            1425: "Enough of trolling",
            1450: "Seriously, stop the clicking man!",
            1500: "Bro, what the hell do you need",
            1550: "",
            1560: "null",
            1600: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            1601: "balls",
            1650: "No, I don't even know what to say at this moment",
            1660: "You are unstoppable...",
            1670: "Fine.",
            1680: ".",
            1690: "..",
            1700: "...",
            1701: "HAHA",
            1800: "Okay, you will get it. Fine, enough of trolling this time",
            1801: ".",
            1810: "..",
            1811: "...",
            1812: "..",
            1814: ".",
            1820: "...",
            1821: "..",
            1823: "...",
            1824: ".",
            1830: ",,,",
            1840: ".",
            1841: "..",
            1842: "...",
            1900: "Okay, I DO NOT SUPPORT RUSSO-UKRAINIAN CONFLICT. CHILL OUT, MAN!",
            2500: "Nothing else there..."
        };

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