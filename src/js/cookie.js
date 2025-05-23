window.onload = function() {
  if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').classList.remove('hidden');
  }
};

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  document.getElementById('cookie-banner').remove();
}