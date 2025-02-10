export const audio = (() => {

    let music = null;
    let audio = null;
    let isPlay = false;

    const init = () => {
        music = document.getElementById('button-music');

        audio = new Audio(music.getAttribute('data-url'));
        audio.currentTime = 0;
        audio.autoplay = false;
        audio.muted = false;
        audio.loop = true;
        audio.volume = 1;
        audio.controls = false;
        audio.preload = 'auto';
    };

    const play = async () => {
        music.disabled = true;
        try {
            await audio.play();
            isPlay = true;
        } catch (err) {
            isPlay = false;
            alert(err);
        }
        music.disabled = false;
    };

    const button = async () => {
        if (!isPlay) {
            await play();
            music.innerHTML = '<i class="fa-solid fa-circle-pause spin-button"></i>';
            return;
        }

        isPlay = false;
        audio.pause();
        music.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    };

    const showButton = () => {
        music.style.display = 'block';
    };

    return {
        init,
        play,
        button,
        showButton,
    };
})();