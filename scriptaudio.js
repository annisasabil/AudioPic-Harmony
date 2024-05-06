// Fungsi untuk menampilkan audio yang dipilih
function previewAudio(event) {
    const file = event.target.files[0];
    const audio = document.getElementById('audioPreview');
    audio.src = URL.createObjectURL(file);
    audio.style.display = 'block';
}

let modifiedAudio = null; // Variabel untuk menyimpan audio yang dimodifikasi

// Fungsi untuk mempercepat audio
function speedUpAudio() {
    const audio = document.getElementById('audioPreview');
    audio.playbackRate += 1.0;
    modifiedAudio = audio.src; // Simpan audio yang telah dimodifikasi
}

// Fungsi untuk memperlambat audio
function slowDownAudio() {
    const audio = document.getElementById('audioPreview');
    audio.playbackRate -= 0.5;
    modifiedAudio = audio.src; // Simpan audio yang telah dimodifikasi
}

