document.addEventListener('DOMContentLoaded', function () {
  const heroCarouselElement = document.getElementById('heroCarousel');
  if (heroCarouselElement) {
    const carousel = new bootstrap.Carousel(heroCarouselElement, {
      interval: 5000,
      ride: 'carousel',
      pause: false,
      wrap: true,
    });
  }
});
