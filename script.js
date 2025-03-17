function generateFields() { 
    // Membuat input field berdasarkan jumlah pilihan yang diinputkan
    let nama = document.getElementById('nama').value.trim();
    let jumlah = parseInt(document.getElementById('jumlah').value);

    // Validasi input
    if (nama === '' || isNaN(jumlah) || jumlah < 1) {
        alert('Masukkan nama dan jumlah pilihan yang valid!');
        return;
    }

    document.getElementById('okButton').style.display = "none";

    // Menonaktifkan input nama dan jumlah agar tidak bisa diubah
    document.getElementById('nama').disabled = true;
    document.getElementById('jumlah').disabled = true;

    let container = document.getElementById('pilihanContainer');
    container.innerHTML = `<h2>Masukkan ${jumlah} Pilihan</h2>`; // Menampilkan judul sesuai jumlah pilihan

    // Membuat input field sesuai jumlah pilihan yang dimasukkan
    for (let i = 1; i <= jumlah; i++) {
        container.innerHTML += `<div class='input-group'>
            <label for='pilihan${i}'>Pilihan ${i}:</label>
            <input type='text' id='pilihan${i}'>
        </div>`;
    }

    // Menambahkan tombol untuk mengirim pilihan dan memberikan id agar bisa disembunyikan
    container.innerHTML += `<button id="okButton1" onclick="submitChoices(${jumlah})">OK</button>`;

    container.classList.remove('hidden'); // Menampilkan container jika sebelumnya disembunyikan
}

function submitChoices(jumlah) { // Mengambil data yang telah diinput pengguna dan menampilkan opsi dalam bentuk radio button untuk dipilih
    let nama = document.getElementById('nama').value.trim();
    let pilihan = [];

    for (let i = 1; i <= jumlah; i++) {
        let inputField = document.getElementById(`pilihan${i}`);
        let value = inputField.value.trim();
        if (value === '') {
            alert(`Isi semua pilihan sebelum melanjutkan!`);
            return;
        }
        pilihan.push(value);

        document.getElementById('okButton1').style.display = "none";

        // Menonaktifkan input field setelah diisi
        inputField.disabled = true;
    }

    let hasilContainer = document.getElementById('hasilContainer');
    hasilContainer.innerHTML = `<h2>Pilihan :</h2>`; // Menampilkan header daftar pilihan

    // Menampilkan setiap pilihan dalam bentuk radio button
    pilihan.forEach((item, index) => {
        hasilContainer.innerHTML += `
            <div>
                <input type="radio" name="pilihan" id="radio${index}" value="${item}">
                <label for="radio${index}">${item}</label>
            </div>`;
    });

    // Menambahkan tombol untuk mengonfirmasi pilihan yang dipilih dan memberikan id agar bisa disembunyikan
    hasilContainer.innerHTML += `<button id="submitButton" onclick="confirmSelection('${nama}', ${jumlah}, ['${pilihan.join("','")}'])">Submit</button>`;
    hasilContainer.classList.remove('hidden'); // Menampilkan hasil pilihan jika sebelumnya disembunyikan
}

function confirmSelection(nama, jumlah, pilihan) { 
    let selectedOption = document.querySelector('input[name="pilihan"]:checked');

    // Jika pengguna belum memilih, tampilkan peringatan
    if (!selectedOption) {
        alert('Pilih salah satu opsi sebelum melanjutkan!');
        return;
    }
    document.getElementById('submitButton').style.display = "none";


    let pilihanTerpilih = selectedOption.value; // Mengambil nilai dari pilihan yang dipilih

    // Menonaktifkan semua radio button setelah pilihan dikonfirmasi
    document.querySelectorAll('input[name="pilihan"]').forEach(radio => {
        radio.disabled = true;
    });

    // Mengubah array pilihan menjadi format yang lebih enak dibaca
    let pilihanText = pilihan.join(", ");

    // Membuat elemen div untuk menampilkan hasil dengan border dan padding
    let resultDiv = document.createElement("div");
    resultDiv.style.border = "1px solid black";
    resultDiv.style.padding = "10px";
    resultDiv.style.marginTop = "10px";

    // Menampilkan hasil di dalam elemen div
    resultDiv.innerHTML = `
        <p>Halo, nama saya <b>${nama}</b>, saya mempunyai <b>${jumlah}</b> pilihan yaitu <b>${pilihanText}</b>, dan saya memilih <b>${pilihanTerpilih}</b>.</p>
    `;

    // Menambahkan elemen hasil ke dalam hasilContainer
    document.getElementById("hasilContainer").appendChild(resultDiv);
}
