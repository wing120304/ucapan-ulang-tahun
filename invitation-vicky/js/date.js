document.addEventListener("DOMContentLoaded", () => {
    const countdownElement = document.getElementById("count-down");
    const eventTime = new Date(countdownElement.getAttribute("data-time")).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = eventTime - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById("day").innerText = days;
            document.getElementById("hour").innerText = hours;
            document.getElementById("minute").innerText = minutes;
            document.getElementById("second").innerText = seconds;
        } else {
            document.getElementById("count-down").innerHTML = `<p>Event has started!</p>`;
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
});
