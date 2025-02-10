const imgContainer = document.getElementById('imgContainer');
const video = document.getElementById('video');

// Buat objek audio untuk musik
const music = new Audio('./assets/hh.mp3');
music.loop = true; // Lagu akan terus berulang

// Event saat klik gambar (mulai video 6.mp4)
imgContainer.addEventListener('click', () => {
  // Sembunyikan gambar 5.png
  imgContainer.style.display = 'none';

  // Mainkan musik
  music.play();

  // Ganti video ke 6.mp4
  video.src = './assets/6.mp4';
  video.play();
  console.log('Video dimulai');
});

// Event listener untuk video saat selesai
video.addEventListener('ended', () => {
  console.log('Video selesai');

  // Periksa jika video 2.mp4 selesai, maka pause
  if (video.src.includes('2.mp4')) {
    video.pause();
    video.style.pointerEvents = 'auto'; // Aktifkan interaksi pada video
    video.style.cursor = 'pointer'; // Ubah kursor menjadi pointer
    console.log('Video 2.mp4 dipause, menunggu aksi pengguna');
    
    // Event untuk melanjutkan video saat diklik
    video.addEventListener('click', () => {
      video.play();
      video.style.pointerEvents = 'none'; // Nonaktifkan interaksi setelah dilanjutkan
      console.log('Video dilanjutkan oleh pengguna');
    }, { once: true }); // Event listener hanya akan aktif sekali
  }

  // Logika untuk video 6.mp4
  if (video.src.includes('6.mp4')) {
    console.log('6.mp4 selesai, menampilkan gambar lobby.');

    // Sembunyikan video
    video.style.display = 'none';

    // Tampilkan gambar lobby
    const lobbyImage = document.createElement('img');
    lobbyImage.src = './assets/lobby.jpg';
    lobbyImage.alt = 'Lobby';
    lobbyImage.className = 'fullscreen-image';
    document.body.appendChild(lobbyImage);
    console.log('Gambar lobby ditambahkan ke DOM:', lobbyImage);

    // Setelah beberapa saat, tampilkan undangan
    setTimeout(() => {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '50%';
      container.style.left = '50%';
      container.style.transform = 'translate(-50%, -50%)';
      container.style.textAlign = 'center';
      container.style.zIndex = '99999';
      document.body.appendChild(container);

      console.log('Elemen tambahan ditambahkan ke DOM:', container);

      // Tambahkan tombol "Open Invitation"
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.id = 'close-btn';
      closeButton.className = 'btn rounded-4 mt-3';
      closeButton.innerHTML = `<img src='./assets/surat-1.png' class=""></img>`;
      container.appendChild(closeButton);

      // Event untuk membuka undangan
      closeButton.addEventListener('click', () => {
        // Hapus tombol dan gambar lobby
        const closeButton2 = document.createElement('button');
        closeButton2.type = 'button';
        closeButton2.id = 'close-btn';
        closeButton2.className = 'btn rounded-4 mt-3';
        closeButton2.innerHTML = `<img src='./assets/surat-2.png' class=""></img>`;
        closeButton.remove();
        container.appendChild(closeButton2);

        closeButton2.addEventListener('click', () => {
          closeButton2.remove();

          const kertas = document.createElement('img');
          kertas.src = './assets/kertas.png';
          kertas.style.zIndex = '-1';
          kertas.style.top = '50%';
          kertas.style.left = '50%';
          kertas.style.transform = 'translate(-50%, -50%)';
          kertas.style.textAlign = 'center';
          kertas.style.position = 'fixed';
          console.log(kertas);

          const textContainer = document.createElement('div');
          textContainer.style.position = 'absolute';
          textContainer.style.top = '50%';
          textContainer.style.left = '50%';
          textContainer.style.transform = 'translate(-50%, -50%)';
          textContainer.style.textAlign = 'center';
          textContainer.style.color = '#6b4f4f';
          textContainer.style.zIndex = '9999999';

          const nameText = document.createElement('p');
          nameText.textContent = 'Vicky';
          nameText.style.fontSize = '53px';
          nameText.style.margin = '0';
          nameText.style.fontFamily = '"Great Vibes", cursive';

          const subtitleText = document.createElement('p');
          subtitleText.textContent = 'Sweet Seventeen';
          subtitleText.style.fontSize = '35px';
          subtitleText.style.margin = '5px 0 0 0';
          subtitleText.style.fontFamily = '"Great Vibes", cursive';

          textContainer.appendChild(kertas);
          textContainer.appendChild(nameText);
          textContainer.appendChild(subtitleText);
          document.body.appendChild(textContainer);
          console.log(textContainer);
          console.log(nameText);

          const container = document.createElement('div');
          container.innerHTML = `
            <button type="button" id="close-btn" class="btn btn-light shadow rounded-4 mt-3" onclick="guest.open(this)">
              <i class="fa-solid fa-envelope-open me-2"></i>Open Invitation
            </button>
          `;
          container.style.position = 'absolute';
          container.style.top = '200%';
          container.style.left = '50%';
          container.style.transform = 'translate(-50%, -50%)';
          container.style.textAlign = 'center';
          container.style.zIndex = '99999';
          textContainer.appendChild(container);

          console.log('Button tambahan ditambahkan ke DOM:', container);
          const closeButton = document.getElementById('close-btn');
          closeButton.addEventListener('click', () => {
            // Hapus elemen tambahan dan gambar lobby
            container.remove();
            lobbyImage.remove();
            textContainer.remove();
            console.log('Semua elemen dihapus');
          });
        });
      });
    }, 500); // Penundaan 0.5 detik
  }
});
