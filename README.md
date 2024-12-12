
# How To Use
Cara Penggunaan:
Tambahkan file CSS dan JavaScript ke halaman Anda:

```sh
<link rel="stylesheet" href="assets/css/form-validator.css">
<script src="assets/js/form-validator.js"></script>

```

Contoh Penggunaan pada Form:
```sh
<form id="myForm">
  <!-- Email validation -->
  <input type="email" 
         data-validate="required email" 
         data-required-message="Email wajib diisi"
         data-email-message="Format email tidak valid">

  <!-- Phone validation -->
  <input type="tel" 
         data-validate="required phone" 
         data-required-message="Nomor telepon wajib diisi"
         data-phone-message="Format nomor telepon tidak valid">

  <!-- Custom pattern validation -->
  <input type="text" 
         data-validate="pattern:^[A-Za-z]+$"
         data-pattern-message="Hanya huruf yang diperbolehkan">
</form>

```

## Contoh:
```sh
// Example usage of FormValidator
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validator
    const form = document.getElementById('myForm');
    if (form) {
        const validator = new FormValidator(form, {
            // Optional callbacks
            onSuccess: (form) => {
                console.log('Form is valid, proceeding with submission');
                // Proceed with form submission
                form.submit();
            },
            onError: (form) => {
                console.log('Form validation failed');
            }
        });
    }
});
```

Fitur-fitur Validasi yang Tersedia:
- required: Field wajib diisi
- email: Validasi format email
- min:number: Minimal panjang karakter
- max:number: Maksimal panjang karakter
- minValue:number: Nilai minimal untuk angka
- maxValue:number: Nilai maksimal untuk angka
- pattern:regex: Validasi menggunakan regular expression
- numeric: Hanya menerima angka
- phone: Validasi format nomor telepon
- url: Validasi format URL

Kustomisasi Pesan Error:
Gunakan atribut data-[rule]-message untuk mengatur pesan error kustom
Contoh: data-required-message="Field ini wajib diisi"
Validasi Real-time:
Validasi akan berjalan secara otomatis saat user mengetik
Pesan error akan muncul di bawah field yang tidak valid
Field yang valid akan ditandai dengan border hijau
Field yang tidak valid akan ditandai dengan border merah
Sistem ini sangat fleksibel dan dapat digunakan di berbagai platform karena:

Tidak memiliki dependencies eksternal
Menggunakan vanilla JavaScript
Mudah dikustomisasi melalui CSS
Dapat diintegrasikan dengan framework apapun
Mendukung validasi real-time dan on-submit
