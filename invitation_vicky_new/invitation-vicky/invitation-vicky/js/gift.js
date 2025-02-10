document.getElementById('gift-button').addEventListener('click', function () {
    const giftBox = document.getElementById('gift-box');
    giftBox.classList.toggle('d-none');
});

document.getElementById('copy-button').addEventListener('click', function () {
    const rekeningNumber = '123-456-7890';
    navigator.clipboard.writeText(rekeningNumber).then(() => {
        alert('Kode rekening berhasil disalin!');
    });
});

document.getElementById('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil nilai dari form
    const name = document.getElementById('name').value.trim();
    const guests = document.getElementById('guests').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validasi
    if (!name || !guests || !message) {
        alert('Harap isi semua kolom form!');
        return;
    }

    // Tambahkan ucapan ke daftar
    const wishList = document.getElementById('wishList');
    const newWish = document.createElement('div');
    newWish.classList.add('mb-3', 'p-3', 'rounded', 'pastel-bg', 'underlist');
    newWish.innerHTML = `
        <strong class="wish-sender">${name}</strong> 
        <p class="wish-text">"${message}"</p>
        <small class="text-muted">Jumlah tamu: ${guests}</small>
    `;
    wishList.appendChild(newWish);

    // Perbarui jumlah ucapan
    const wishCount = document.getElementById('wishCount');
    wishCount.textContent = wishList.children.length;

    // Reset form
    document.getElementById('rsvpForm').reset();
});
