import { util } from './util.js';
import { audio } from './audio.js';
import { theme } from './theme.js';
import { session } from './session.js';
import { storage } from './storage.js';
import { comment } from './comment.js';
import { progress } from './progress.js';
import { confetti } from './confetti.js';

export const guest = (() => {

    let information = null;

    const countDownDate = () => {
        const until = document.getElementById('count-down')?.getAttribute('data-time')?.replace(' ', 'T');
        if (!until) {
            return;
        }

        const count = (new Date(until)).getTime();

        setInterval(() => {
            const distance = Math.abs(count - Date.now());

            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    };

    const animation = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ['#FFC0CB', '#FF1493', '#C71585'];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const name = () => {
        const name = (new URLSearchParams(window.location.search)).get('to');
        const guest = document.getElementById('guest-name');

        if (!name || !guest) {
            guest?.remove();
        } else {
            const div = document.createElement('div');
            div.classList.add('m-2');
            div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0" style="font-size: 0.95rem;">${guest.getAttribute('data-message')}</p><h2 class="m-0 p-0">${util.escapeHtml(name)}</h2>`;
            guest.appendChild(div);
        }

        const form = document.getElementById('form-name');
        if (form) {
            form.value = information.get('name') ?? name;
        }

        util.opacity('loading', 0.025);
    };

    const open = (button) => {
        button.disabled = true;
        document.body.scrollIntoView({ behavior: 'instant' });

        confetti({
            origin: { y: 1 },
            zIndex: 1057
        });

        util.opacity('welcome', 0.025);

        audio.play();
        audio.showButton();

        theme.showButtonChangeTheme();
        setTimeout(animation, 1500);
    };

    const init = () => {
        session.init();
        comment.init();

        countDownDate();
        information = storage('information');

        if (session.isAdmin()) {
            storage('user').clear();
            storage('owns').clear();
            storage('likes').clear();
            storage('session').clear();
            storage('comment').clear();
            storage('tracker').clear();
        }

        if (information.get('presence')) {
            document.getElementById('form-presence').value = information.get('presence') ? '1' : '2';
        }

        const info = document.getElementById('information');
        if (info && information.get('info')) {
            info.remove();
        }

        if ((document.body.getAttribute('data-key') ?? '').length === 0) {
            const comment = document.getElementById('comment');
            if (comment) {
                comment.remove();
            }

            const nav = document.querySelector('a.nav-link[href="#comment"]');
            if (nav) {
                const item = nav.closest('li.nav-item');
                if (item) {
                    item.remove();
                }
            }

            return;
        }

        progress.add();
        session.guest()
            .then(() => comment.comment())
            .then(() => progress.complete('comment'))
            .catch(() => progress.invalid('comment'));
    };

    return {
        init,
        open,
        name,
    };
})();