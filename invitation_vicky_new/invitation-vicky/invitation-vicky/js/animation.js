document.addEventListener("DOMContentLoaded", () => {
    const castle = document.querySelector('.castle');
    const book = document.querySelector('.book');
    const content = document.querySelector('.content');

    // Animasi Zoom-In pada Kastil
    gsap.fromTo(
        castle,
        { scale: 1, opacity: 0 },
        { scale: 1.5, opacity: 1, duration: 3, ease: "power2.inOut" }
    );

    // Animasi Buku Muncul
    gsap.fromTo(
        book,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, delay: 3, ease: "power2.out" }
    );

    // Tampilkan Konten Setelah Animasi
    gsap.delayedCall(6, () => {
        content.style.display = 'block';
        gsap.fromTo(
            content,
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.inOut" }
        );
    });
});
