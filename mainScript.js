document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    audioPlayer.volume = 0.5;
    let played = false;

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

        if (globalInstance.easterMsgs[globalInstance.flagClicks]) {
            alert(globalInstance.easterMsgs[globalInstance.flagClicks]);
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
