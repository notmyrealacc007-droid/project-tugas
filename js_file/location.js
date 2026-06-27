document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'hotel_reviews_v1';
  const LIKES_KEY = 'hotel_likes_v1';

  function getReviews() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  function saveReviews(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function getLikes() {
    return parseInt(localStorage.getItem(LIKES_KEY) || '0', 10);
  }

  function saveLikes(n) {
    localStorage.setItem(LIKES_KEY, String(n));
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c];
    });
  }

  function renderAggregate() {
    const reviews = getReviews();
    const total = reviews.length;
    const avg = total ? (reviews.reduce(function (sum, r) { return sum + r.rating; }, 0) / total) : 0;
    const avgRatingEl = document.getElementById('avg-rating');
    const totalReviewsEl = document.getElementById('total-reviews');
    const avgStarsEl = document.getElementById('avg-stars');
    const likeCountEl = document.getElementById('like-count');

    if (avgRatingEl) avgRatingEl.textContent = avg ? avg.toFixed(1) : '0.0';
    if (totalReviewsEl) totalReviewsEl.textContent = 'Dari ' + total + ' ulasan';
    if (avgStarsEl) {
      const stars = Math.round(avg);
      avgStarsEl.textContent = Array(5).fill(0).map(function (_, i) { return i < stars ? '★' : '☆'; }).join(' ');
    }
    if (likeCountEl) likeCountEl.textContent = getLikes() + ' orang menyukai ini';
  }

  function renderList() {
    const container = document.getElementById('reviews-list');
    if (!container) return;

    const reviews = getReviews().slice().reverse();
    if (reviews.length === 0) {
      container.innerHTML = '<p class="text-muted">Belum ada ulasan. Jadilah yang pertama!</p>';
      return;
    }

    container.innerHTML = reviews.map(function (r) {
      return '<div class="card shadow-sm mb-3">' +
        '<div class="card-body">' +
        '<div class="d-flex justify-content-between align-items-center mb-2">' +
        '<h6 class="card-title mb-0">' + escapeHtml(r.name) + '</h6>' +
        '<small class="text-warning">' + ('★'.repeat(r.rating)) + ('☆'.repeat(5 - r.rating)) + '</small>' +
        '</div>' +
        '<p class="text-muted mb-2">' + escapeHtml(r.time) + '</p>' +
        '<p class="card-text">' + escapeHtml(r.text) + '</p>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  document.addEventListener('click', function (e) {
    if (e.target.matches('#star-input .star')) {
      const val = parseInt(e.target.getAttribute('data-value'), 10) || 5;
      const reviewRatingEl = document.getElementById('review-rating');
      const stars = document.querySelectorAll('#star-input .star');

      if (reviewRatingEl) reviewRatingEl.value = val;
      stars.forEach(function (star) {
        star.classList.toggle('selected', parseInt(star.getAttribute('data-value'), 10) <= val);
      });
    }
  });

  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const name = document.getElementById('review-name').value.trim();
      const rating = parseInt(document.getElementById('review-rating').value, 10) || 5;
      const text = document.getElementById('review-text').value.trim();

      if (!name || !text) return alert('Isi nama dan ulasan terlebih dahulu.');

      const reviews = getReviews();
      reviews.push({ name: name, rating: rating, text: text, time: new Date().toLocaleString() });
      saveReviews(reviews);
      renderAggregate();
      renderList();
      reviewForm.reset();
      const reviewRatingEl = document.getElementById('review-rating');
      if (reviewRatingEl) reviewRatingEl.value = 5;
      document.querySelectorAll('#star-input .star').forEach(function (star) {
        star.classList.remove('selected');
      });
    });
  }

  const likeBtn = document.getElementById('like-btn');
  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      const liked = sessionStorage.getItem('hotel_user_liked');
      if (liked) {
        alert('Anda sudah menyukai hotel ini pada sesi ini.');
        return;
      }
      const n = getLikes() + 1;
      saveLikes(n);
      sessionStorage.setItem('hotel_user_liked', '1');
      renderAggregate();
    });
  }

  renderAggregate();
  renderList();

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
