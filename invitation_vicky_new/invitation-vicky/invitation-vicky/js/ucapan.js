document.addEventListener('DOMContentLoaded', () => {
    const wishList = document.querySelectorAll('#wishList > div');
    const container = document.getElementById('wishContainer');

    let existingBubbles = [];

    container.addEventListener('scroll', () => {
        // Hapus semua bubble lama setelah animasi selesai
        existingBubbles.forEach(bubble => bubble.remove());
        existingBubbles = [];

        // Tambahkan bubble baru saat scroll
        const scrollTop = container.scrollTop;

        wishList.forEach((wish, index) => {
            if (index % 2 === 0 && Math.random() > 0.3) {
                const bubble = document.createElement('div');
                bubble.className = `bubble bubble-${(index % 3) + 1}`;

                // Posisi acak untuk setiap bubble
                bubble.style.top = `${scrollTop + Math.random() * 300}px`;
                bubble.style.left = `${Math.random() * 90}%`;

                // Menambahkan efek fade-in saat bubble muncul
                bubble.style.opacity = 0;
                container.appendChild(bubble);

                // Animasi fade-in untuk smooth entry
                setTimeout(() => {
                    bubble.style.transition = 'opacity 1s ease-in-out';
                    bubble.style.opacity = 1;
                }, 100);

                existingBubbles.push(bubble);

                // Hapus bubble setelah animasi selesai (10 detik) dengan fade-out
                setTimeout(() => {
                    bubble.style.transition = 'opacity 1s ease-in-out';
                    bubble.style.opacity = 0;

                    // Hapus bubble setelah transisi selesai
                    setTimeout(() => {
                        bubble.remove();
                    }, 1000); // Waktu untuk animasi fade-out
                }, 10000); // Durasi bubble bertahan
            }
        });
    });
});
