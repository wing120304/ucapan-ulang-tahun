// Function untuk menampilkan section yang sesuai dengan tombol kategori
function showSection(section) {
    // Sembunyikan semua media section
    const allSections = document.querySelectorAll('.media-section');
    allSections.forEach((sec) => {
        sec.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    const selectedSection = document.querySelector(`.${section}-section`);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}
