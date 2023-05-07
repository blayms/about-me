document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    audioPlayer.volume = 0.5;
    let played = false

    // Array of audio sources (URLs of your audio files)
    const audioSources = [
        'AssFart_NightTheme',
        'deenatema',
        'HeavyMEH',
        "LuvVperde",
        "thisisajoke",
        "trillbaldi"
        // Add more song URLs as needed
    ];

    function selectRandomSong() {
        var randomSongID = globalInstance.audios[globalInstance.RandomInt(0, globalInstance.audios.length)];

        if (typeof randomSongID === 'undefined') {
            randomSongID = globalInstance.audios[0];
        }

        const str = randomSongID;
        const randomSong = './res/audio/' + str + '.mp3';

        audioSource.src = randomSong;
        audioPlayer.load();
        audioPlayer.play();
    }
    var selectedBG = globalInstance.bg[globalInstance.RandomInt(0, globalInstance.bg.length)];

    if (typeof selectedBG === 'undefined') {
        selectedBG = globalInstance.bg[0];
    }

    document.getElementById('movingBG').style.backgroundImage = "url('./res/ico/" + selectedBG + ".png')";

    const toggleButton = document.getElementById('toggleButton');

    const ruFlag = document.getElementById('ruFlag');

    ruFlag.addEventListener('click', () => {
        ruFlag.classList.remove('flag');
        ruFlag.classList.add('flag');
        globalInstance.flagClicks++;
        if (globalInstance.flagClicks == 50) {
            alert("Stop clicking on this Russian flag please!");
        }

        if (globalInstance.flagClicks == 100) {
            alert("No, seriously. What do you expect?!");
        }

        if (globalInstance.flagClicks == 125) {
            alert("SUKA BLYAT");
        }

        if (globalInstance.flagClicks == 150) {
            alert("Are you angry?");
        }

        if (globalInstance.flagClicks == 200) {
            alert("Looks like you are really angry! You clicked 200 times on flag with 3 colors");
        }

        if (globalInstance.flagClicks == 250) {
            alert("So, what do you actually want?");
        }

        if (globalInstance.flagClicks == 300) {
            alert("Oh, I got you!");
        }

        if (globalInstance.flagClicks == 350) {
            alert("wait for it...");
        }

        if (globalInstance.flagClicks == 400) {
            alert(".");
        }

        if (globalInstance.flagClicks == 450) {
            alert("..");
        }

        if (globalInstance.flagClicks == 500) {
            alert("...");
        }

        if (globalInstance.flagClicks == 600) {
            alert("Okay, I DO NOT SUPPORT RUSSO-UKRAINIAN CONFLICT. CHILL OUT, MAN!");
        }

        if (globalInstance.flagClicks == 1000) {
            alert("Nothing else there... I'm about to reset the click count!");
            globalInstance.flagClicks = 0;
        }

    });

    var updateBdayCounter = function () {
        var date1 = new Date();
        var date2 = new Date((new Date().getFullYear()) + 1, 0, 17);
        const diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
        document.getElementById("bdayDaysLeft").innerText = diffDays.toString();
        setTimeout(updateBdayCounter, (60 - new Date().getSeconds()) * 1000);
    }

    updateBdayCounter();


    // Event listener for the toggle button
    toggleButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            if (played == false) {
                selectRandomSong();
                toggleButton.textContent = 'Disable Music';
            }
        } else {
            audioPlayer.pause();
            toggleButton.textContent = 'Enable Music';
        }
    });
});
