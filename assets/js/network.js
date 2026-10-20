// Home hero background: a network of "agents".
// Pointer movement warms nearby nodes; a click sends a heat pulse through the network.
(function () {
  var hero = document.querySelector('.hero'), canvas = document.getElementById('net');
  if (!hero || !canvas) return;
  var ctx = canvas.getContext('2d'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = [], edges = [], pulses = [], pointer = null, last = 0, W = 0, H = 0;
  var stops = [[0,[43,56,90]],[.3,[70,40,140]],[.55,[150,40,150]],[.75,[225,72,45]],[.9,[245,165,36]],[1,[255,240,196]]];
  function col(v, a) {
    v = Math.max(0, Math.min(1, v)); var k = 0;
    while (k < stops.length - 2 && v > stops[k + 1][0]) k++;
    var s0 = stops[k], s1 = stops[k + 1], f = (v - s0[0]) / (s1[0] - s0[0]), c = [];
    for (var i = 0; i < 3; i++) c.push(Math.round(s0[1][i] + (s1[1][i] - s0[1][i]) * f));
    return 'rgba(' + c.join(',') + ',' + a + ')';
  }
  function build() {
    var dpr = Math.min(2, devicePixelRatio || 1);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = []; edges = [];
    var n = Math.round(W * H / 7000), tries = 0;
    while (nodes.length < n && tries++ < n * 30) {
      var x = Math.random() * W, y = Math.random() * H, ok = true;
      for (var i = 0; i < nodes.length && ok; i++) { var dx = nodes[i].x - x, dy = nodes[i].y - y; if (dx * dx + dy * dy < 1600) ok = false; }
      if (ok) nodes.push({ x: x, y: y, h: Math.random() * .15 });
    }
    nodes.forEach(function (a, ai) {
      nodes.map(function (b, bi) { return { bi: bi, d: Math.hypot(a.x - b.x, a.y - b.y) }; })
        .filter(function (o) { return o.bi !== ai && o.d < 150; })
        .sort(function (p, q) { return p.d - q.d; }).slice(0, 3)
        .forEach(function (o) { if (ai < o.bi) edges.push([ai, o.bi]); });
    });
  }
  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    if (pointer) nodes.forEach(function (n) { var d = Math.hypot(n.x - pointer.x, n.y - pointer.y); if (d < 130) n.h = Math.min(1, n.h + .05 * (1 - d / 130)); });
    pulses.forEach(function (p) {
      p.r += 6;
      nodes.forEach(function (n) { if (Math.abs(Math.hypot(n.x - p.x, n.y - p.y) - p.r) < 10) n.h = Math.min(1, n.h + .75 * (1 - p.r / p.max)); });
    });
    pulses = pulses.filter(function (p) { return p.r < p.max; });
    ctx.lineWidth = 1;
    edges.forEach(function (e) { var a = nodes[e[0]], b = nodes[e[1]], h = (a.h + b.h) / 2; ctx.strokeStyle = col(h, .08 + h * .55); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
    nodes.forEach(function (n) { ctx.fillStyle = col(n.h, .35 + n.h * .65); ctx.beginPath(); ctx.arc(n.x, n.y, 1.6 + n.h * 3.2, 0, 6.283); ctx.fill(); n.h *= .965; });
    pulses.forEach(function (p) { ctx.strokeStyle = col(.85, .35 * (1 - p.r / p.max)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.stroke(); });
    if (!reduce && t - last > 4000 && nodes.length) { var s = nodes[(Math.random() * nodes.length) | 0]; pulses.push({ x: s.x, y: s.y, r: 0, max: 380 }); last = t; }
    requestAnimationFrame(frame);
  }
  function loc(e) { var r = hero.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  hero.addEventListener('pointermove', function (e) { pointer = loc(e); last = performance.now(); });
  hero.addEventListener('pointerleave', function () { pointer = null; });
  hero.addEventListener('pointerdown', function (e) { var p = loc(e); pulses.push({ x: p.x, y: p.y, r: 0, max: Math.max(W, H) * .8 }); last = performance.now(); });
  var tm; addEventListener('resize', function () { clearTimeout(tm); tm = setTimeout(build, 200); });
  build(); requestAnimationFrame(frame);
})();
