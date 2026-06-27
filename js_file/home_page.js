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


document.addEventListener('DOMContentLoaded', function() {
        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-up-visible');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.15
        });

        document.querySelectorAll('.animate-fade-up').forEach(function(element) {
          observer.observe(element);
        });
      });