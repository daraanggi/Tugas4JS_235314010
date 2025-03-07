function generateFields() {
    let nama = document.getElementById('nama').value.trim();
    let jumlah = parseInt(document.getElementById('jumlah').value);
    let namaError = document.getElementById('namaError');
    let jumlahError = document.getElementById('jumlahError');
    
    namaError.classList.add('hidden');
    jumlahError.classList.add('hidden');
    
    if (nama === '') {
        namaError.classList.remove('hidden');
        return;
    }
    if (isNaN(jumlah) || jumlah < 1) {
        jumlahError.classList.remove('hidden');
        return;
    }
    
    let container = document.getElementById('pilihanContainer');
    container.innerHTML = `<h2>Masukkan ${jumlah} Pilihan</h2>`;
    
    for (let i = 1; i <= jumlah; i++) {
        container.innerHTML += `<label for='pilihan${i}'>Pilihan ${i}:</label>
                                <input type='text' id='pilihan${i}'><br>`;
    }
    container.innerHTML += `<button onclick="generateSelection(${jumlah})">OK</button>`;
    container.classList.remove('hidden');
}

function generateSelection(jumlah) {
    let pilihanContainer = document.getElementById('pilihanContainer');
    let hasilContainer = document.getElementById('hasilContainer');
    let selectedHTML = '<h2>Pilih Salah Satu</h2>';
    
    selectedHTML += '<select id="finalChoice">';
    for (let i = 1; i <= jumlah; i++) {
        let pilihan = document.getElementById(`pilihan${i}`).value.trim();
        if (pilihan === '') {
            alert(`Pilihan ${i} tidak boleh kosong!`);
            return;
        }
        selectedHTML += `<option value='${pilihan}'>${pilihan}</option>`;
    }
    selectedHTML += '</select><br><button onclick="showResult()">OK</button>';
    
    hasilContainer.innerHTML = selectedHTML;
    hasilContainer.classList.remove('hidden');
}

function showResult() {
    let nama = document.getElementById('nama').value;
    let jumlah = document.getElementById('jumlah').value;
    let selectedOption = document.getElementById('finalChoice').value;
    let resultText = `Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlah} pilihan, dan saya memilih ${selectedOption}.`;
    alert(resultText);
}
