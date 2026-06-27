document.addEventListener('DOMContentLoaded', function () {
  const roomButtons = document.querySelectorAll('.room-body button');
  const roomSelect = document.getElementById('roomType');
  const bookingForm = document.getElementById('bookingForm');

  roomButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const room = button.getAttribute('data-room');
      if (roomSelect) roomSelect.value = room;
      const checkIn = document.getElementById('checkIn');
      if (checkIn) checkIn.focus();
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const details = {
        TipeKamar: formData.get('roomType'),
        CheckIn: formData.get('checkIn'),
        CheckOut: formData.get('checkOut'),
        Tamu: formData.get('guests'),
        Nama: formData.get('guestName'),
        Email: formData.get('email'),
        HP: formData.get('phone'),
        Catatan: formData.get('notes') || '-'
      };

      alert(
        'Reservasi terkirim!\n\n' +
        'Tipe Kamar: ' + details.TipeKamar + '\n' +
        'Check-in: ' + details.CheckIn + '\n' +
        'Check-out: ' + details.CheckOut + '\n' +
        'Tamu: ' + details.Tamu + '\n' +
        'Nama: ' + details.Nama
      );
      bookingForm.reset();
    });
  }

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
