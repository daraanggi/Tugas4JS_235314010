function generateFields() {
    let nama = document.getElementById('nama').value.trim();
    let jumlah = parseInt(document.getElementById('jumlah').value);

    if (nama === '' || isNaN(jumlah) || jumlah < 1) {
        alert('Masukkan Nama dan Jumlah Pilihan yang valid!');
        return;
    }

    let container = document.getElementById('pilihanContainer');
    container.innerHTML = `<h2>Masukkan ${jumlah} Pilihan</h2>`;

    for (let i = 1; i <= jumlah; i++) {
        container.innerHTML += `<div class='input-group'>
            <label for='pilihan${i}'>Pilihan ${i}:</label>
            <input type='text' id='pilihan${i}'>
        </div>`;
    }
    container.innerHTML += `<button onclick="submitChoices(${jumlah})">OK</button>`;
    container.classList.remove('hidden');
}

function submitChoices(jumlah) {
    let nama = document.getElementById('nama').value.trim();
    let pilihan = [];
    
    for (let i = 1; i <= jumlah; i++) {
        let value = document.getElementById(`pilihan${i}`).value.trim();
        if (value === '') {
            alert(`Isi semua pilihan sebelum melanjutkan!`);
            return;
        }
        pilihan.push(value);
    }

    let hasilContainer = document.getElementById('hasilContainer');
    hasilContainer.innerHTML = `<h2>Pilihan :</h2>`;

    pilihan.forEach((item, index) => {
        hasilContainer.innerHTML += `
            <div>
                <input type="radio" name="pilihan" id="radio${index}" value="${item}">
                <label for="radio${index}">${item}</label>
            </div>`;
    });

    hasilContainer.innerHTML += `<button onclick="confirmSelection('${nama}', ${jumlah}, ['${pilihan.join("','")}'])">Submit</button>`;
    hasilContainer.classList.remove('hidden');
}

function confirmSelection(nama, jumlah, pilihan) {
    let selectedOption = document.querySelector('input[name="pilihan"]:checked');
    if (!selectedOption) {
        alert('Pilih salah satu opsi sebelum melanjutkan!');
        return;
    }

    let pilihanTerpilih = selectedOption.value;
    let params = new URLSearchParams({
        nama: nama,
        jumlah: jumlah,
        pilihan: pilihan.join(","),
        terpilih: pilihanTerpilih
    });

    window.location.href = `output.html?${params.toString()}`;
}
