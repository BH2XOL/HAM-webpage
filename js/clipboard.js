/* Email Clipboard Copy Interaction */
(function () {
  var emailLink = document.getElementById('email-link');
  if (!emailLink) return;

  var hint = emailLink.querySelector('.external-hint');
  var timerId = null;

  function showFeedback(text) {
    if (!hint) return;
    if (timerId) clearTimeout(timerId);
    hint.textContent = text;
    emailLink.classList.add('is-copied');
    timerId = setTimeout(function () {
      hint.textContent = '复制';
      emailLink.classList.remove('is-copied');
      timerId = null;
    }, 1500);
  }

  emailLink.addEventListener('click', function (e) {
    e.preventDefault();
    var email = 'bh2xol@bh2xol.com';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () {
          showFeedback('已复制');
        },
        function () {
          showFeedback('失败');
        }
      );
      return;
    }

    try {
      var textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      showFeedback(ok ? '已复制' : '失败');
    } catch (_) {
      showFeedback('失败');
    }
  });
})();
