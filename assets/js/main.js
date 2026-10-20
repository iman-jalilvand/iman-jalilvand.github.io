// Every page: mobile menu, footer year, light image protection, lightbox.
(function () {
  document.documentElement.classList.add('js');
  // Recognition timeline: draws left to right when scrolled into view
  // Recognition timeline and the "How my work connects" steps animate in when scrolled into view
  document.querySelectorAll('#recognition, .loop').forEach(function (list) {
    list.querySelectorAll('li').forEach(function (li, i) { li.style.setProperty('--i', i); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { list.classList.add('in'); o.disconnect(); } }, { threshold: .35 }).observe(list);
    else list.classList.add('in');
  });
  var btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Deterrent only: blocks right-click "Save image". Not true protection.
  document.addEventListener('contextmenu', function (e) { if (e.target.closest('.shot, .lightbox')) e.preventDefault(); });

  // Lightbox: data-yt plays a YouTube video, data-img shows a full image.
  var box = document.getElementById('lightbox'); if (!box) return;
  var frame = box.querySelector('.frame');
  document.querySelectorAll('.shot').forEach(function (b) {
    if (b.dataset.yt) b.insertAdjacentHTML('afterbegin', '<img src="https://img.youtube.com/vi/' + b.dataset.yt + '/hqdefault.jpg" alt="" loading="lazy"><span class="play" aria-hidden="true"></span>');
    b.addEventListener('click', function () {
      if (b.dataset.yt) {
        frame.className = 'frame';
        frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0&modestbranding=1" title="' + b.getAttribute('aria-label') + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      } else {
        frame.className = 'frame img';
        frame.innerHTML = '<img src="' + b.dataset.img + '" alt="' + b.querySelector('img').alt + '" draggable="false">';
      }
      box.showModal();
    });
  });
  box.addEventListener('close', function () { frame.innerHTML = ''; });
  box.querySelector('.close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
})();
