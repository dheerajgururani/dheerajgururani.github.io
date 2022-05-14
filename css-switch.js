(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var contrast = localStorage.getItem('alt');

    if (contrast) switchMode('alt', 'main');
  });

  document.getElementById('activate-alt').addEventListener('click', function () {
    switchMode('alt', 'main');
    localStorage.setItem('alt', 'true');
  });

  document.getElementById('activate-main').addEventListener('click', function () {
    switchMode('main', 'alt');
    localStorage.removeItem('alt');
  });

  function switchMode(newMode, prevMode) {
    var link = document.querySelector('link[rel=stylesheet][href*="' + prevMode + '"]');
    link.parentNode.removeChild(link);

    link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'css/' + newMode + '.css'

    document.head.appendChild(link)
  }
})();


