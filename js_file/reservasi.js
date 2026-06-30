document.addEventListener('DOMContentLoaded', function () {
  const roomButtons = document.querySelectorAll('.room-body button');
  const modalRoomType = document.getElementById('modalRoomType');
  const openModalButton = document.getElementById('openBookingModal');
  const closeModalButton = document.getElementById('closeBookingModal');
  const bookingModal = document.getElementById('bookingModal');
  const modalBookingForm = document.getElementById('modalBookingForm');
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
  const paymentDetails = document.getElementById('paymentDetails');

  roomButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const room = button.getAttribute('data-room');
      if (modalRoomType) modalRoomType.value = room;
      if (openModalButton) openModalButton.click();
    });
  });

  function openModal() {
    if (bookingModal) {
      bookingModal.classList.remove('hidden');
      bookingModal.setAttribute('aria-hidden', 'false');
      const firstInput = bookingModal.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.add('hidden');
      bookingModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (openModalButton) {
    openModalButton.addEventListener('click', openModal);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', function (event) {
      if (event.target === bookingModal) {
        closeModal();
      }
    });
  }

  function updatePaymentDetails() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod || !paymentDetails) return;

    if (selectedMethod.value === 'QRIS') {
      paymentDetails.innerHTML = '<div class="qris-card"><div class="qris-label">QRIS</div><div class="qris-code">Scan QRIS untuk membayar</div><p>Nomor referensi: <strong>1234 5678 9012 3456</strong></p></div>';
    } else if (selectedMethod.value === 'Transfer Bank') {
      paymentDetails.innerHTML = '<div class="qris-card"><div class="qris-label">Transfer Bank</div><p>Bank BCA<br>Nomor Rekening: <strong>1234567890</strong><br>Atas nama: Sapphire Hotel Palace</p></div>';
    } else {
      paymentDetails.innerHTML = '<div class="qris-card"><div class="qris-label">Bayar di Hotel</div><p>Bayar langsung saat tiba di hotel.</p></div>';
    }
  }

  paymentMethods.forEach(function (radio) {
    radio.addEventListener('change', updatePaymentDetails);
  });

  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(modalBookingForm);
      const details = {
        TipeKamar: formData.get('roomType'),
        CheckIn: formData.get('checkIn'),
        CheckOut: formData.get('checkOut'),
        Tamu: formData.get('guests'),
        Nama: formData.get('guestName'),
        Email: formData.get('email'),
        HP: formData.get('phone'),
        MetodePembayaran: formData.get('paymentMethod') || 'QRIS',
        Catatan: formData.get('notes') || '-'
      };

      alert(
        'Reservasi terkirim!\n\n' +
        'Tipe Kamar: ' + details.TipeKamar + '\n' +
        'Check-in: ' + details.CheckIn + '\n' +
        'Check-out: ' + details.CheckOut + '\n' +
        'Tamu: ' + details.Tamu + '\n' +
        'Nama: ' + details.Nama + '\n' +
        'Metode Pembayaran: ' + details.MetodePembayaran
      );

      modalBookingForm.reset();
      updatePaymentDetails();
      closeModal();
    });
  }

  updatePaymentDetails();

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  document.querySelectorAll('.animate-fade-up').forEach(function (element) {
    observer.observe(element);
  });
});
