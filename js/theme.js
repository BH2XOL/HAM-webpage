/* Theme Toggle & View Transition */
(function () {
  var html = document.documentElement;
  var btn = document.getElementById('theme-btn');
  if (!btn) return;

  function setTheme(isDark) {
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  function toggleTheme() {
    setTheme(html.getAttribute('data-theme') !== 'dark');
  }

  btn.addEventListener('click', function () {
    var rect = btn.getBoundingClientRect();
    var cx = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    var cy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    html.style.setProperty('--vt-x', cx + '%');
    html.style.setProperty('--vt-y', cy + '%');

    if (document.startViewTransition) {
      document.startViewTransition(function () {
        toggleTheme();
      });
    } else {
      toggleTheme();
    }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
    }
  });
})();
