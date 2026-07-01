document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop()?.toLowerCase() || '';
  const links = document.querySelectorAll('.navbar-nav .nav-link');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const targetPage = href.split('/').pop()?.toLowerCase() || '';

    if (
      targetPage === currentPath ||
      (currentPath === '' && targetPage === 'home_page.html') ||
      (currentPath === 'home_page.html' && targetPage === 'home_page.html')
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
