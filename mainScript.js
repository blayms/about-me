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
        const randomIndex = Math.floor(Math.random() * audioSources.length);
        const currentDirectory = window.location.href.substring(0, window.location.href.lastIndexOf('/'));

        const str = audioSources[randomIndex];
        const randomSong = './res/audio/' + str + '.mp3';

        audioSource.src = randomSong;
        audioPlayer.load();
        audioPlayer.play();
    }

    const toggleButton = document.getElementById('toggleButton');


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
