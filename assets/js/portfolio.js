// Portfolio page.
// EDIT PROJECTS in the PROJECTS list below: one object per tile.
//   id       used in links, e.g. portfolio.html#matrl
//   size     w2, w3 or w4 (columns out of 6; each row adds up to 6)
//   cats     filter categories: ml xr design research teaching venture
//   tile     visual on the card; media = larger visual in the panel
//   paper    optional image from the published paper (shown with "From papers")
//   pubs     published work: [authors, title, venue, year, link]
//   resume   id of the matching line on resume.html
(function () {
  var C = { i1: '#2B1C6E', i2: '#8C2290', i3: '#E1482D', i4: '#F5A524', i5: '#FFF0C4', sky: '#8FD3FF', line: '#2A3D57', muted: '#A9B6C8', text: '#ECF0F6', bg: '#0B1524' };
  var STYLE = 'redrawn';

  // ---------- SVG helpers ----------
  function svg(w, h, body, label) { return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (label || '') + '" preserveAspectRatio="xMidYMid meet" font-family="IBM Plex Sans, sans-serif">' + body + '</svg>'; }
  function t(x, y, s, size, fill, anchor, weight) { return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '" fill="' + (fill || C.text) + '" text-anchor="' + (anchor || 'start') + '" font-weight="' + (weight || 400) + '">' + s + '</text>'; }
  function arrow(x1, y1, x2, y2, col, dash) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 8;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + col + '" stroke-width="2"' + (dash ? ' stroke-dasharray="5 5"' : '') + '/>' +
      '<path d="M' + x2 + ' ' + y2 + ' L' + (x2 - h * Math.cos(a - .45)) + ' ' + (y2 - h * Math.sin(a - .45)) + ' L' + (x2 - h * Math.cos(a + .45)) + ' ' + (y2 - h * Math.sin(a + .45)) + 'Z" fill="' + col + '"/>';
  }
  function heatCol(v) { return v > .8 ? C.i4 : v > .6 ? C.i3 : v > .4 ? C.i2 : C.i1; }

  // 15 heaters in 3 columns of 5; one agent per column; transfer from agent 1
  function matrlGrid() {
    var b = t(320, 28, '15 heaters, 3 columns, one learning agent per column', 15, C.muted, 'middle');
    var temps = [.55, .7, .85, .62, .5, .9, .75, .66, .82, .58, .45, .68, .92, .72, .6];
    [200, 320, 440].forEach(function (cx, k) {
      b += '<rect x="' + (cx - 54) + '" y="112" width="108" height="234" rx="10" fill="none" stroke="' + (k ? C.sky : C.i4) + '" stroke-opacity=".55"/>';
      for (var r = 0; r < 5; r++) b += '<rect x="' + (cx - 45) + '" y="' + (120 + r * 45) + '" width="90" height="36" rx="5" fill="' + heatCol(temps[k * 5 + r]) + '"/>';
      b += '<circle cx="' + cx + '" cy="74" r="20" fill="' + C.bg + '" stroke="' + (k ? C.sky : C.i4) + '" stroke-width="2.5"/>' + t(cx, 79, 'A' + (k + 1), 14, C.text, 'middle', 600);
      b += '<line x1="' + cx + '" y1="94" x2="' + cx + '" y2="112" stroke="' + (k ? C.sky : C.i4) + '" stroke-opacity=".7"/>';
    });
    b += arrow(222, 66, 296, 66, C.i4) + arrow(214, 54, 418, 54, C.i4, true);
    b += t(560, 70, 'parameter', 12, C.i4, 'middle') + t(560, 86, 'transfer', 12, C.i4, 'middle');
    return svg(640, 360, b, 'Fifteen heaters in three columns, each column controlled by one agent, with knowledge transferred from the first agent');
  }
  function hbars(title, rows, unit, max) {
    max = max || 50; var b = t(24, 34, title, 15, C.muted), cols = [C.i2, C.i3, C.i4, C.i5, C.sky];
    rows.forEach(function (r, i) {
      var y = 60 + i * 56, w = 300 * r[1] / max;
      b += t(24, y + 18, r[0], 14) + '<rect x="270" y="' + y + '" width="300" height="26" rx="4" fill="' + C.line + '"/>' +
        '<rect x="270" y="' + y + '" width="' + w + '" height="26" rx="4" fill="' + cols[i % 5] + '"/>' + t(278 + w, y + 18, r[1] + (unit || ''), 14, C.text, 'start', 600);
    });
    return svg(640, 70 + rows.length * 56, b, title);
  }
  function pair(title, a, b2, note) {
    var body = t(320, 38, title, 15, C.muted, 'middle');
    [[a, 200, C.i2], [b2, 360, C.i4]].forEach(function (p) {
      var hgt = 1.7 * p[0][1];
      body += '<rect x="' + p[1] + '" y="' + (300 - hgt) + '" width="80" height="' + hgt + '" rx="5" fill="' + p[2] + '"/>' +
        t(p[1] + 40, 290 - hgt, p[0][1], 20, C.text, 'middle', 600) + t(p[1] + 40, 322, p[0][0], 14, C.muted, 'middle');
    });
    return svg(640, 360, body + '<line x1="170" y1="300" x2="470" y2="300" stroke="' + C.line + '"/>' + (note ? t(320, 348, note, 12, C.muted, 'middle') : ''), title);
  }
  function flow(steps, title) {
    var n = steps.length, w = 580 / n, cols = [C.i2, C.i3, C.i4, C.i5, C.sky], b = t(320, 92, title || '', 15, C.muted, 'middle');
    steps.forEach(function (s, i) {
      var x = 30 + i * w, words = s.split(' '), half = Math.ceil(words.length / 2), cx = x + (w - 22) / 2;
      var l1 = words.slice(0, half).join(' '), l2 = words.slice(half).join(' ');
      b += '<rect x="' + x + '" y="140" width="' + (w - 22) + '" height="84" rx="9" fill="' + C.bg + '" stroke="' + cols[i % 5] + '" stroke-width="2"/>';
      b += t(cx, l2 ? 178 : 188, l1, 13, C.text, 'middle') + (l2 ? t(cx, 197, l2, 13, C.text, 'middle') : '');
      if (i < n - 1) b += arrow(x + w - 20, 182, x + w - 4, 182, C.muted);
    });
    return svg(640, 360, b, title);
  }
  function line(title, labels, vals, unit, note) {
    var x0 = 90, x1 = 570, y0 = 290, y1 = 80, max = Math.max.apply(null, vals) * 1.15, b = t(320, 38, title, 15, C.muted, 'middle'), pts = [];
    vals.forEach(function (v, i) { pts.push([x0 + i * (x1 - x0) / (vals.length - 1), y0 - (y0 - y1) * v / max]); });
    b += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="' + C.line + '"/>';
    b += '<polyline points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '" fill="none" stroke="' + C.i4 + '" stroke-width="3"/>';
    pts.forEach(function (p, i) { b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="' + C.i5 + '"/>' + t(p[0], p[1] - 14, vals[i] + unit, 13, C.text, 'middle', 600) + t(p[0], y0 + 24, labels[i], 13, C.muted, 'middle'); });
    return svg(640, 360, b + (note ? t(320, 348, note, 12, C.muted, 'middle') : ''), title);
  }
  function runCompare() { // CHI 2026, run 1 vs run 4, n = 14
    var rows = [['Time', '426.8 s', '185.3 s', 43.4], ['Average error', '92.1 °C', '18.3 °C', 19.9], ['Spatial variability', '27.9 °C', '12.1 °C', 43.2]];
    var b = t(320, 34, 'Run 1 vs Run 4, 14 trainees (CHI 2026)', 15, C.muted, 'middle');
    rows.forEach(function (r, i) {
      var y = 70 + i * 92;
      b += t(30, y + 14, r[0], 14, C.text, 'start', 600);
      b += '<rect x="190" y="' + (y - 4) + '" width="320" height="22" rx="4" fill="' + C.i2 + '"/>' + t(520, y + 12, 'Run 1: ' + r[1], 12, C.muted);
      b += '<rect x="190" y="' + (y + 26) + '" width="' + (3.2 * r[3]) + '" height="22" rx="4" fill="' + C.i4 + '"/>' + t(200 + 3.2 * r[3], y + 42, 'Run 4: ' + r[2], 12, C.text);
    });
    return svg(640, 340, b, 'Time, error and spatial variability all fell between the first and fourth run');
  }
  function dots(n, label) {
    var cols = n > 100 ? 19 : 10, r = n > 100 ? 7 : 11, gap = r * 2 + 8, b = '', pal = [C.i2, C.i3, C.i4];
    var rows = Math.ceil(n / cols), ox = 320 - (cols * gap) / 2 + r + 4, oy = 165 - (rows * gap) / 2 + r;
    for (var i = 0; i < n; i++) b += '<circle cx="' + (ox + (i % cols) * gap) + '" cy="' + (oy + ((i / cols) | 0) * gap) + '" r="' + r + '" fill="' + pal[i % 3] + '" opacity="' + (.55 + (i % 5) * .09) + '"/>';
    return svg(640, 360, b + t(320, 340, label, 14, C.muted, 'middle'), label);
  }
  function chirp() {
    var p = 'M40 180';
    for (var x = 0; x <= 560; x += 2) { var f = .01 + x * .00018; p += ' L' + (40 + x) + ' ' + (180 - 80 * Math.sin(f * x * 3) * Math.exp(-x / 900)).toFixed(1); }
    return svg(640, 360, '<path d="' + p + '" stroke="' + C.i4 + '" stroke-width="2.5" fill="none"/>' + t(320, 320, 'Chirp excitation on a buried pipe specimen (illustrative)', 13, C.muted, 'middle'), 'Chirp signal');
  }
  function bbn() {
    var N = { a: [120, 90, 'Heater power'], b: [320, 90, 'Sheet thickness'], c: [520, 90, 'Ambient temp.'], d: [220, 200, 'Heating time'], e: [420, 200, 'Sheet temp.'], f: [320, 300, 'Energy use'] };
    var E = [['a', 'd'], ['a', 'e'], ['b', 'd'], ['b', 'e'], ['c', 'e'], ['d', 'f'], ['e', 'f']], b = '';
    E.forEach(function (e) { var p = N[e[0]], q = N[e[1]]; b += arrow(p[0], p[1] + 22, q[0] + (p[0] - q[0]) * .12, q[1] - 24, C.muted); });
    Object.keys(N).forEach(function (k, i) { var n = N[k]; b += '<rect x="' + (n[0] - 75) + '" y="' + (n[1] - 22) + '" width="150" height="44" rx="22" fill="' + C.bg + '" stroke="' + (k === 'f' ? C.i4 : C.i2) + '" stroke-width="2"/>' + t(n[0], n[1] + 5, n[2], 13, C.text, 'middle'); });
    return svg(640, 360, b + t(320, 30, 'Bayesian belief network (simplified, illustrative)', 13, C.muted, 'middle'), 'Bayesian network linking process parameters to energy use');
  }
  function ivModes() {
    var b = t(320, 34, 'Which way should a mixed reality tutor talk to a nurse?', 15, C.muted, 'middle');
    [['Text', 140, C.i2], ['Audio', 320, C.i3], ['Visual cues', 500, C.i4]].forEach(function (m) {
      b += '<circle cx="' + m[1] + '" cy="140" r="52" fill="' + C.bg + '" stroke="' + m[2] + '" stroke-width="2.5"/>' + t(m[1], 145, m[0], 15, C.text, 'middle', 600) + arrow(m[1], 196, 320 + (m[1] - 320) * .25, 262, C.muted);
    });
    return svg(640, 360, b + '<rect x="230" y="266" width="180" height="50" rx="10" fill="' + C.bg + '" stroke="' + C.sky + '" stroke-width="2"/>' + t(320, 297, 'IV infusion training', 14, C.text, 'middle'), 'Three communication modes compared');
  }
  function topsis() {
    return hbars('Overall ranking, TOPSIS score (26 participants)', [['Mixed reality', .917], ['Virtual reality', .416], ['Video', .165]], '', 1);
  }
  function criteria() { // normalized means per criterion (MCDM decision matrix)
    var crit = ['Usefulness', 'Satisfaction', 'Trust', 'Training', 'Preference'], M = [[.395, .361, .274, .377, .335], [.278, .262, .206, .297, .223], [.233, .238, .305, .203, .135]];
    var cols = [C.i4, C.i2, C.sky], names = ['Mixed reality', 'Virtual reality', 'Video'], b = '';
    crit.forEach(function (c, i) {
      var x = 70 + i * 112; b += t(x + 40, 330, c, 12, C.muted, 'middle');
      M.forEach(function (row, k) { var h = row[i] * 520; b += '<rect x="' + (x + k * 27) + '" y="' + (305 - h) + '" width="24" height="' + h + '" rx="3" fill="' + cols[k] + '"/>'; });
    });
    names.forEach(function (n, k) { b += '<rect x="' + (150 + k * 140) + '" y="22" width="12" height="12" rx="2" fill="' + cols[k] + '"/>' + t(168 + k * 140, 33, n, 12, C.text); });
    return svg(640, 350, b + '<line x1="60" y1="305" x2="620" y2="305" stroke="' + C.line + '"/>', 'Normalized mean ratings per criterion for the three training methods');
  }
  function protocol() {
    var seg = [['Intro', 4, C.i1], ['Demographics', 3, C.i2], ['Three trials, Latin square order', 21, C.i3], ['Questionnaires', 7, C.i4], ['Interview', 10, C.sky]], x = 20, b = t(20, 30, 'One 45-minute session per participant', 15, C.muted);
    seg.forEach(function (s) { var w = 600 * s[1] / 45; b += '<rect x="' + x + '" y="50" width="' + (w - 3) + '" height="46" rx="5" fill="' + s[2] + '"/>' + t(x + w / 2, 79, s[1] + ' min', 13, s[2] === C.i4 || s[2] === C.sky ? C.bg : C.text, 'middle', 600) + t(x + 2, 118, s[0], 12, C.muted); x += w; });
    return svg(640, 130, b, 'Study protocol timeline');
  }

  // ---------- hand-drawn wireframes (sketch style, redrawn from paper sketches) ----------
  var INK = '#2E2A26', HL = '#E1482D';
  function sk(w, h, body, label) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '" font-family="Caveat, cursive">' +
      '<defs><filter id="rough' + w + h + '"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="#F6F1E7"/><g filter="url(#rough' + w + h + ')" stroke="' + INK + '" stroke-width="2" fill="none" stroke-linecap="round">' + body + '</g></svg>';
  }
  function st(x, y, s, size, fill, anchor) { return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 20) + '" fill="' + (fill || INK) + '" stroke="none" text-anchor="' + (anchor || 'start') + '">' + s + '</text>'; }
  function waves(x, y, n, col) { var b = ''; for (var i = 0; i < n; i++) { var xx = x + i * 14; b += '<path d="M' + xx + ' ' + y + ' q6 -8 0 -16 q-6 -8 0 -16" stroke="' + (col || HL) + '"/>'; } return b; }
  function sgrid(x, y, cols, rows, cw, ch, fills) {
    var b = '';
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var f = fills ? fills[(r * cols + c) % fills.length] : null;
      b += '<rect x="' + (x + c * cw) + '" y="' + (y + r * ch) + '" width="' + (cw - 4) + '" height="' + (ch - 4) + '"' + (f ? ' fill="' + f + '" fill-opacity=".35"' : '') + '/>';
    }
    return b;
  }
  function wfBrand() {
    var b = st(20, 34, '1. Naming and identity sketches', 24);
    [[110, 'HeatMaster'], [320, 'HeatMaster XR'], [530, 'HeatMaster']].forEach(function (p, i) {
      var x = p[0];
      b += '<path d="M' + (x - 70) + ' 150 q70 90 140 0" />' + '<line x1="' + (x - 78) + '" y1="150" x2="' + (x + 78) + '" y2="150" stroke="' + HL + '" stroke-width="4"/>' + waves(x - 30, 196, 5);
      b += '<path d="M' + (x - 34) + ' 112 q34 -26 68 0 l0 12 q-34 10 -68 0z" fill="' + INK + '" fill-opacity=".85"/>';
      b += st(x, 92, p[1], 22, INK, 'middle');
      if (i === 1) b += '<circle cx="' + x + '" cy="150" r="104" stroke="' + HL + '" stroke-dasharray="6 6"/>' + st(x, 286, 'picked: headset + heat', 18, HL, 'middle');
    });
    return sk(640, 300, b, 'Hand-drawn logo sketches for HeatMaster XR');
  }
  function wfLayout() {
    var b = st(20, 34, '2. Panel layout around the oven', 24);
    b += '<rect x="24" y="60" width="160" height="190" rx="6"/>' + st(34, 82, 'Control panel', 18) + sgrid(40, 96, 3, 5, 44, 30, null);
    b += '<rect x="214" y="60" width="200" height="150" rx="6"/>' + st(224, 82, 'Instructions', 18) + sgrid(226, 92, 3, 5, 30, 22, ['#8BC34A', '#4FC3F7', '#4FC3F7']) + st(330, 110, 'target', 16) + st(330, 128, 'profile', 16) + '<rect x="330" y="140" width="18" height="16"/><rect x="352" y="140" width="18" height="16"/><rect x="374" y="140" width="18" height="16"/>';
    b += '<rect x="444" y="60" width="176" height="190" rx="6"/>' + st(454, 82, 'Performance', 18) + '<line x1="456" y1="210" x2="530" y2="210"/>' + '<rect x="462" y="150" width="12" height="60"/><rect x="480" y="130" width="12" height="80" fill="' + HL + '" fill-opacity=".4"/><rect x="498" y="170" width="12" height="40"/><rect x="516" y="160" width="12" height="50"/>' + sgrid(540, 100, 3, 5, 24, 22, ['#fff', '#F5A524', '#E1482D']);
    b += '<path d="M220 262 l200 0 l-30 22 l-140 0z"/>' + st(320, 306, 'heated sheet in the headset view', 16, INK, 'middle');
    return sk(640, 320, b, 'Hand-drawn wireframe of three floating panels around a virtual oven');
  }
  function wfFlow() {
    var labels = [['A', 'select profile'], ['B-D', 'adjust heaters'], ['E', 'save run'], ['F', 'export data']], b = st(20, 34, '3. Interaction flow, one training run', 24);
    labels.forEach(function (l, i) {
      var x = 24 + i * 152;
      b += '<rect x="' + x + '" y="70" width="128" height="120" rx="8"/>' + '<circle cx="' + (x + 18) + '" cy="88" r="12" fill="' + HL + '" fill-opacity=".25"/>' + st(x + 18, 94, l[0][0], 18, INK, 'middle');
      b += st(x + 64, 222, l[1], 18, INK, 'middle');
      if (i === 0) b += sgrid(x + 28, 110, 4, 1, 22, 22, null);
      if (i === 1) b += '<line x1="' + (x + 24) + '" y1="120" x2="' + (x + 104) + '" y2="120"/><circle cx="' + (x + 74) + '" cy="120" r="7" fill="' + INK + '"/><line x1="' + (x + 24) + '" y1="150" x2="' + (x + 104) + '" y2="150"/><circle cx="' + (x + 44) + '" cy="150" r="7" fill="' + INK + '"/>';
      if (i === 2) b += '<rect x="' + (x + 40) + '" y="104" width="48" height="52"/><line x1="' + (x + 48) + '" y1="118" x2="' + (x + 80) + '" y2="118"/>';
      if (i === 3) b += '<path d="M' + (x + 64) + ' 100 l0 48 m-14 -14 l14 14 l14 -14"/><line x1="' + (x + 40) + '" y1="160" x2="' + (x + 88) + '" y2="160"/>';
      if (i < 3) b += '<path d="M' + (x + 132) + ' 130 l16 0 m-6 -6 l6 6 l-6 6"/>';
    });
    b += '<path d="M600 196 q20 70 -280 70 q-290 0 -260 -60" stroke-dasharray="6 6"/>' + st(320, 292, 'repeat for four profiles', 17, INK, 'middle');
    return sk(640, 300, b, 'Hand-drawn storyboard of the training run steps A to F');
  }
  function wfCoach() {
    var b = st(20, 34, '4. Adding an AI coaching panel', 24);
    b += '<rect x="40" y="60" width="250" height="210" rx="8"/>' + st(56, 86, 'Dashboard (built)', 18) + '<line x1="60" y1="230" x2="160" y2="230"/><rect x="66" y="170" width="16" height="60"/><rect x="90" y="140" width="16" height="90"/><rect x="114" y="190" width="16" height="40"/>' + sgrid(180, 110, 3, 5, 22, 24, ['#fff', '#F5A524', '#E1482D']);
    b += '<path d="M300 165 l40 0 m-8 -8 l8 8 l-8 8"/>';
    b += '<rect x="350" y="60" width="250" height="210" rx="8" stroke="' + HL + '"/>' + st(366, 86, 'AI-assisted feedback', 18, HL) + '<rect x="364" y="98" width="120" height="16" fill="' + HL + '" fill-opacity=".2"/>' + st(368, 111, 'summary', 15) + '<line x1="364" y1="124" x2="586" y2="124"/><line x1="364" y1="136" x2="560" y2="136"/>' + st(368, 162, 'warnings', 15) + '<line x1="364" y1="172" x2="586" y2="172"/>' + sgrid(366, 186, 3, 5, 16, 14, null) + st(430, 214, 'next run:', 15) + '<line x1="430" y1="226" x2="586" y2="226"/><line x1="430" y1="240" x2="560" y2="240"/>';
    return sk(640, 290, b, 'Hand-drawn wireframe of an AI coaching panel beside the performance dashboard');
  }

  function vid(id) { return '<img src="https://img.youtube.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy"><span class="play" aria-hidden="true"></span>'; }
  function embed(id) { return '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'; }
  function img(src, alt) { return '<img src="' + src + '" alt="' + alt + '" draggable="false" loading="lazy">'; }

  // ---------- publications (shared) ----------
  var P = {
    eaai: ['Jalilvand, I., Soufi Enayati, A. M., Hosseinionari, H., Seethaler, R., Narayan, A., Gopaluni, B., Milani, A. S.', 'Integrating transfer learning into multi-agent reinforcement learning for energy-efficient adaptive control of heating systems in thermoforming', 'Engineering Applications of Artificial Intelligence', 2026, 'https://doi.org/10.1016/j.engappai.2026.114780'],
    chi: ['Jalilvand, I., Gopaluni, B., Milani, A. S.', 'Data-driven extended reality dashboards: integrating operator training and decision support in manufacturing backed by physics-based simulations', 'CHI EA ’26, ACM', 2026, 'https://doi.org/10.1145/3772363.3798455'],
    hcii26: ['Jalilvand, I., Milani, A. S.', 'Integrating simulation-based LLM coaching for adaptive mixed-reality manufacturing training', 'HCI International 2026 Posters, Springer', 2026, 'https://doi.org/10.1007/978-3-032-30816-0_19'],
    jms: ['Jalilvand, I., Jang, J., Gopaluni, B., Milani, A. S.', 'VR/MR systems integrated with heat transfer simulation for training of thermoforming: a multicriteria decision-making user study', 'Journal of Manufacturing Systems', 2024, 'https://doi.org/10.1016/j.jmsy.2023.11.007'],
    hcii23: ['Jalilvand, I., Jang, J., Hosseinionari, H., Seethaler, R., Gopaluni, B., Milani, A. S.', 'An interactive digital twin of a composite manufacturing process for training operators via immersive technology (Silver Award)', 'HCI International 2023 Posters, Springer', 2023, 'https://doi.org/10.1007/978-3-031-36004-6_28'],
    iise: ['Jalilvand, I., Gopaluni, B., Milani, A. S.', 'Towards a robust deep reinforcement learning for optimization of heating setup in thermoforming process', 'Proceedings of the IISE Annual Conference and Expo', 2024, 'https://iise.confex.com/iise/2024/meetingapp.cgi/Paper/7645'],
    jmp: ['Hosseinionari, H., Seethaler, R., Krishnamurthy, R. J., Jalilvand, I., Milani, A. S.', 'A scalable multi-agent deep reinforcement learning in thermoforming: an experimental evaluation of thermal control by infrared camera-based feedback', 'Journal of Manufacturing Processes', 2024, 'https://doi.org/10.1016/j.jmapro.2024.09.019'],
    ieom: ['Jalilvand, I., Akbarian-Saravi, N., Crawford, B., Gopaluni, B., Milani, A. S.', 'Optimizing energy-intensive heating processes in manufacturing using Bayesian belief networks: a case study in thermoforming', 'IEOM European Conference, Paris', 2025, 'https://doi.org/10.46254/EU08.20250283'],
    chbr: ['Krishnamurthy, R. J., Lo, V., Jang, J., Jalilvand, I., et al.', 'Exploring different communication modes for intravenous infusion training using mixed reality', 'Computers in Human Behavior Reports', 2025, 'https://doi.org/10.1016/j.chbr.2025.100814'],
    wpc: ['Shamshirsaz, M., Jalilvand, I.', 'Damage detection in fuel transfer pipelines caused by ground subsidence using the electro-mechanical impedance method', '25th WPC Energy Congress, Riyadh', 2026, ''],
    patent: ['Jalilvand, I., Milani, A. S., Gopaluni, B.', 'Physics-informed immersive analytics and edge-interface system with adaptive coaching for manufacturing operator decision support', 'US Provisional Patent Application 64/093,684, filed 2026', 2026, '']
  };

  // ---------- the projects (each row of the grid adds up to 6) ----------
  var PROJECTS = [
    { id: 'mr-training', size: 'w4', cats: 'xr design research', video: '0yGOxAKJUXI', meta: '2021 to 2024 | Kohler partnership',
      title: 'Mixed reality operator training', line: 'HoloLens 2 and Quest apps driven by a live heat transfer simulation.',
      problem: 'Thermoforming operators learn a hot, costly process by watching others, and most XR training studies test only one headset type.',
      built: 'Unity apps for HoloLens 2 and Meta Quest 2 coupled to heat transfer simulation, compared against a video course.',
      outcome: 'Across 26 participants and five decision-making methods, mixed reality ranked first for training effectiveness, satisfaction and preference.',
      credit: '© Iman Jalilvand. Developed at UBC, Materials and Manufacturing Research Institute.',
      skills: ['Unity', 'C#', 'MRTK', 'HoloLens 2', 'Meta Quest'], pubs: ['jms', 'hcii23'], resume: 'r-mr-training' },

    { id: 'matrl', size: 'w2', cats: 'ml research', meta: '2024 to 2026 | UBC',
      title: 'MATRL: heater agents that transfer what they learn', line: 'Multi-agent PPO with transfer learning for a 15-heater oven.',
      tile: matrlGrid, paper: ['images/matrl-transfer.jpg', 'Three-step transfer learning diagram from the paper'],
      media: matrlGrid,
      extra: function () { return '<h4>Results against the multi-agent baseline</h4>' + hbars('Reduction with MATRL (%)', [['Training time, high convection', 29.3], ['Energy, high convection', 28.1], ['Energy, warm room', 42.6], ['Settling time, warm room', 41.7], ['Temperature spread', 47]], '%'); },
      problem: 'Fixed oven controllers waste energy and need retuning whenever materials or room conditions change.',
      built: 'One PPO agent per column of five heaters. A pretrained agent passes its parameters to the other two, then all three share experience. FCNN-MAPPO replaces recurrent policies with state augmentation.',
      outcome: 'Shorter training and 28 to 43% less energy across conditions, stable across random seeds (7.3% coefficient of variation).',
      skills: ['PyTorch', 'MAPPO', 'Transfer learning', 'Domain randomization'], pubs: ['eaai'], resume: 'r-matrl' },

    { id: 'llm-coach', size: 'w3', cats: 'ml xr design', meta: '2025 to 2026 | UBC',
      title: 'LLM coaching grounded in simulation data', line: 'Feedback built from each run’s measured performance, not generic advice.',
      tile: function () { return flow(['Physics simulation', 'Run telemetry', 'Structured prompt', 'LLM coach', 'Feedback in headset'], 'Coaching grounded in what the operator actually did'); },
      media: function () { return flow(['Physics simulation', 'Run telemetry', 'Structured prompt', 'LLM coach', 'Feedback in headset'], 'Coaching grounded in what the operator actually did'); },
      extra: function () { return '<h4>Preliminary study, six novice operators</h4>' + line('Mean zone temperature error by training profile', ['Profile 1', 'Profile 2', 'Profile 3', 'Profile 4'], [33.3, 34.3, 15.1, 8.2], ' °C', 'All six participants improved; mean reduction 74.9% (HCII 2026)'); },
      problem: 'A general chatbot can sound confident and be wrong. Coaching for a high-temperature process has to match what the operator actually did.',
      built: 'After each run, the headset turns simulation telemetry into a structured, data-anchored prompt for an LLM, and shows the coaching beside the performance dashboard.',
      outcome: 'Every participant lowered their zone error, by 74.9% on average. A US provisional patent application was filed in 2026.',
      skills: ['LLM', 'Prompt grounding', 'Unity', 'HoloLens 2'], pubs: ['hcii26', 'patent'], resume: 'r-llm-coach' },

    { id: 'xr-dashboards', size: 'w3', cats: 'xr design research', meta: '2025 to 2026 | ACM CHI, Barcelona',
      title: 'XR dashboards that show how well, not just whether', line: '74% less spatial error, with error heat maps and energy use inside the headset.',
      tile: runCompare, paper: ['images/chi-ui.jpg', 'Mixed reality control panel, instructions and performance dashboard'],
      media: runCompare,
      extra: function () { return '<h4>Usability</h4><p>UMUX averaged 77.7 out of 100 (n = 14). Trainees who rated the system more usable reduced zone-to-zone variability sooner.</p>'; },
      problem: 'Trainers could see that an operator finished a task, but not how close they came to the target temperature profile.',
      built: 'A Mixed Reality Training Platform with target profile selection, a heater control panel and a post-run dashboard of energy, time and an error heat map.',
      outcome: 'Trainees cut spatial error by 74% on average across repeated runs, and finished runs 57% faster.',
      skills: ['Unity', 'Data visualization', 'UMUX', 'ANOVA'], pubs: ['chi'], resume: 'r-xr-dashboards' },

    { id: 'design-process', size: 'w3', cats: 'design xr', meta: 'Design process | 2023 to 2026',
      title: 'HeatMaster XR: from paper sketches to headset', line: 'Identity, layout and interaction flow, sketched before anything was built.',
      tile: wfLayout, sketch: true, paper: ['images/chi-method.jpg', 'Methodology overview of the mixed reality training platform'],
      media: function () { return wfLayout(); },
      extra: function () {
        return '<h4>Process</h4><ol class="steps"><li>Shadow operators</li><li>Sketch identity</li><li>Wireframe panels</li><li>Storyboard a run</li><li>Build in Unity</li><li>Test with UMUX</li><li>Add AI coaching</li></ol>' +
          '<div class="gallery" style="margin-top:1rem">' +
          '<figure>' + wfBrand() + '<figcaption>Identity sketches</figcaption></figure>' +
          '<figure>' + wfFlow() + '<figcaption>Storyboard of one training run</figcaption></figure>' +
          '<figure>' + wfCoach() + '<figcaption>Next iteration: AI coaching panel</figcaption></figure>' +
          '<figure>' + img('images/chi-ui.jpg', 'Mixed reality control panel, instructions and performance dashboard') + '<figcaption>Built: the final interface on HoloLens 2</figcaption></figure></div>';
      },
      problem: 'Operators in hot, noisy settings need to read a lot of process data at a glance, while their hands are busy.',
      built: 'Hand sketches of the brand, panel layout and run flow, refined into three floating panels around the oven, then built in Unity for HoloLens 2.',
      outcome: 'A layout that held up in user testing, and the base for the LLM coaching panel.',
      credit: 'Wireframes redrawn from the original paper sketches.',
      skills: ['Sketching', 'Wireframing', 'Information architecture', 'Unity'], pubs: ['chi', 'hcii26'], resume: 'r-xr-dashboards' },

    { id: 'user-study', size: 'w3', cats: 'design research', meta: 'User research | 26 participants',
      title: 'Designing and analyzing a 26-person user study', line: 'Mixed reality vs virtual reality vs video, measured seven ways.',
      tile: topsis, media: protocol,
      extra: function () {
        return '<h4>Instrument</h4><p>A custom Qualtrics survey with 27 items on a 5-point Likert scale, grouped into seven blocks: usefulness, ease of use, satisfaction, trust, reliability, ease of training and preference, each followed by an open question on the most and least preferred method. Order of the three methods was balanced with a Latin square.</p>' +
          '<h4 style="margin-top:1rem">Analysis</h4><p>Bonferroni-corrected post-hoc tests found significant differences in training effectiveness, satisfaction and preference, all favouring mixed reality. Video scored higher on trust, and virtual reality was fastest. Prior XR experience made no significant difference.</p>' +
          criteria() + '<p style="margin-top:.6rem">TOPSIS ranked mixed reality first in the base case and in all seven weighting scenarios of the sensitivity analysis.</p>';
      },
      problem: 'Choosing a training format for industry needs evidence beyond "users liked it".',
      built: 'A 45-minute protocol, a custom survey on seven criteria, task timing, and five multicriteria decision methods to rank the formats.',
      outcome: 'Mixed reality ranked first overall (TOPSIS 0.92 vs 0.42 for VR and 0.17 for video), and stayed first under every weighting tested.',
      credit: 'Study instrument © 2025 Milani, Jalilvand. Summarized here, not reproduced.',
      skills: ['Qualtrics', 'Likert scales', 'ANOVA', 'TOPSIS', 'MCDM'], pubs: ['jms'], resume: 'r-mr-training' },

    { id: 'rl-testbed', size: 'w2', cats: 'ml research', meta: '2021 to 2024 | UBC',
      title: 'From simulation to a real oven', line: 'PPO against DQN, then a lab testbed with infrared feedback.',
      tile: function () { return pair('Time to converge (relative)', ['DQN', 100], ['PPO', 63], 'Derived from: 37% faster convergence (IISE 2024)'); },
      problem: 'A policy that works in simulation proves little until it controls real heaters.',
      built: 'A PPO framework benchmarked against DQN across 30+ scenarios, then a lab testbed where a multi-agent policy reads a FLIR infrared camera.',
      outcome: '37% faster convergence than DQN with lower energy use, and experimental validation on hardware.',
      skills: ['PPO', 'DQN', 'Reward shaping', 'FLIR'], pubs: ['iise', 'jmp'], resume: 'r-rl-testbed' },

    { id: 'bbn', size: 'w2', cats: 'ml research', meta: '2025 | IEOM Europe, Paris',
      title: 'Bayesian networks for energy decisions', line: 'Probabilistic, explainable decision support for oven settings.',
      tile: bbn,
      problem: 'Engineers choosing oven settings need to see how each choice shifts energy use, with the uncertainty visible.',
      built: 'Bayesian belief networks linking process parameters to heating outcomes and energy consumption.',
      outcome: 'Explainable what-if analysis for energy-intensive heating, published at IEOM Europe.',
      skills: ['Bayesian networks', 'Uncertainty', 'Decision support'], pubs: ['ieom'], resume: 'r-bbn' },

    { id: 'abc3d', size: 'w2', cats: 'ml design', meta: '2024 to 2025 | Advanced BioCarbon 3D',
      title: 'Material picks engineers could act on', line: 'A recommender with a real-time 3D explanation.',
      tile: function () { return pair('Usability score (relative)', ['Model only', 100], ['With 3D view', 124], 'Derived from: +24% usability'); },
      problem: 'Engineers choosing sustainable materials were searching a whole catalogue by hand.',
      built: 'Python classification and recommendation models that return a short ranked list, with a real-time 3D view explaining the ranking.',
      outcome: 'Usability scores rose 24% after adding the visual layer.',
      skills: ['scikit-learn', 'Recommendation', 'Unity', 'Usability testing'], pubs: [], resume: 'r-abc3d' },

    { id: 'cosc416', size: 'w3', cats: 'teaching design', video: 'YMc435W5tGY', meta: '2025 | UBC Computer Science',
      title: 'Capstone showcase, Game Development with Unity', line: 'Top student games from COSC 416, a course I designed for 152 students.',
      problem: 'The department had never offered this course, and 152 students needed a working pipeline from day one.',
      built: 'Full curriculum, a GitHub organization of reusable C# modules, recorded video guides, one running in-class demo, and a two-week game jam.',
      outcome: 'Student evaluations averaged 4.8/5, and a peer review panel rated the course 6.4/7.',
      credit: 'Student projects, COSC 416, UBC.',
      links: [['Course GitHub organization', 'https://github.com/UBCO-COSC-416'], ['Lecture recordings', 'https://www.youtube.com/playlist?list=PLBTEPhxxp5YEFeEoeZ1RV7ol4Nw2Ur3iy'], ['Tutorials', '#tutorials']],
      skills: ['Unity', 'C#', 'Curriculum design', 'GitHub'], pubs: [], resume: 'r-cosc416' },

    { id: 'teaching-ucd', size: 'w3', cats: 'teaching design', meta: '2023 to 2026 | UBC and IGK',
      title: 'Teaching user-centred design', line: 'Two years of IMTC 506 at UBC, plus three UI/UX courses at IGK.',
      tile: function () { return flow(['Intake form', 'Pre-brief', 'Guest session', 'Student proposal', 'Mitacs application'], 'IMTC 506 industry research challenge, 10 partners'); },
      extra: function () {
        return '<h4>Courses</h4><ul style="margin:0;padding-left:1.1rem">' +
          '<li>User-Centred Design in Immersive Technologies (IMTC 506), UBC graduate course, two consecutive years; rated 4.84/5</li>' +
          '<li>Information Architecture; Prototyping and Wireframing; UX Portfolio Capstone (Figma, Adobe XD), IGK College</li>' +
          '<li>Workshop: inclusive and engaging user study design, from recruitment to retention (REWLI, UBC, 2025)</li></ul>';
      },
      problem: 'Graduate students needed real design problems, and industry partners needed a low-effort way to bring them.',
      built: 'An industry research challenge with 10 partner organizations, and a Sketchfab 3D storytelling project using audio, video and image annotations.',
      outcome: 'The strongest student proposals moved on to Mitacs research applications.',
      skills: ['User-centred design', 'Information architecture', 'Prototyping', 'Figma'], pubs: [], resume: 'r-imtc506' },

    { id: 'innoxr', size: 'w2', cats: 'venture design', meta: '2024 to 2025 | Past venture',
      title: 'InnoXR: would industry buy XR training?', line: 'UBC Venture Founder Program, 2024.',
      tile: function () { return dots(50, '50+ customer discovery interviews'); },
      problem: 'A research prototype is not a product. The question was who would pay, and for what.',
      built: 'Customer discovery across manufacturing, construction and technology, and prototype demos for partners.',
      outcome: 'Support from Kohler, Dassault Systèmes and Cognitive3D, and the UBC Dean’s Award for Knowledge Translation and Entrepreneurship.',
      skills: ['Customer discovery', 'Product strategy', 'Prototyping'], pubs: [], resume: 'r-innoxr' },

    { id: 'iv-training', size: 'w2', cats: 'xr design research', meta: '2022 to 2025 | Healthcare',
      title: 'Mixed reality for IV infusion training', line: 'Text, audio or visual cues: what helps nursing students most?',
      tile: ivModes,
      problem: 'A mixed reality tutor can guide a learner in several ways, and it was unclear which suits clinical training.',
      built: 'Co-designed the questionnaire, data quality checks and MR interface with an interdisciplinary team from computing, engineering and nursing.',
      outcome: 'Published in Computers in Human Behavior Reports.',
      skills: ['Survey design', 'HoloLens 2', 'Healthcare'], pubs: ['chbr'], resume: 'r-mr-training' },

    { id: 'pipeline', size: 'w2', cats: 'research', meta: '2015 to 2018 | M.Sc. research',
      title: 'Listening for damage in buried pipelines', line: 'Piezoelectric sensing under ground subsidence.',
      tile: chirp,
      problem: 'Ground subsidence can damage buried fuel pipelines where no one can see it.',
      built: 'Piezoelectric sensing with chirp signals on welded pipe specimens under bending, validated against COMSOL finite element models.',
      outcome: 'Presented at the 25th WPC Energy Congress, Riyadh, 2026.',
      skills: ['Piezoelectric sensing', 'Signal analysis', 'COMSOL', 'FEM'], pubs: ['wpc'], resume: 'r-pipeline' }
  ];

  // ---------- render ----------
  var grid = document.getElementById('bento');
  function tileVisual(p) {
    if (p.video) return { html: vid(p.video), cls: '' };
    if (STYLE === 'paper' && p.paper) return { html: img(p.paper[0], p.paper[1]), cls: 'paper' };
    return { html: p.tile(), cls: p.sketch ? 'sketch' : '' };
  }
  function render() {
    grid.innerHTML = '';
    PROJECTS.forEach(function (p) {
      var v = tileVisual(p), el = document.createElement('button');
      el.className = 'tile ' + p.size; el.dataset.cats = p.cats; el.setAttribute('aria-label', 'Open project: ' + p.title);
      el.innerHTML = '<div class="vis ' + v.cls + '">' + v.html + '</div><div class="cap"><p class="meta">' + p.meta + '</p><h3>' + p.title + '</h3><p class="line">' + p.line + '</p><div class="skills-row">' +
        p.skills.slice(0, 4).map(function (s) { return '<span class="sk">' + s + '</span>'; }).join('') + '</div></div>';
      el.addEventListener('click', function () { pin(p); });
      // Hover preview (mouse only): opens after a short pause, closes when the pointer leaves the panel
      el.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse' || dlg.open) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () { originRect = el.getBoundingClientRect(); open(p, true); }, 250);
      });
      el.addEventListener('pointerleave', function () { clearTimeout(hoverTimer); });
      grid.appendChild(el);
    });
    filter(current);
  }

  var dlg = document.getElementById('drawer'), hoverTimer, peeking = false, entered = false, openedAt = 0, justPinned = false, originRect = null;
  function pin(p) { clearTimeout(hoverTimer); if (!dlg.open || !peeking) open(p, false); setPeek(false); history.replaceState(null, '', location.pathname + location.search + '#' + p.id); }
  function setPeek(v) { peeking = v; dlg.classList.toggle('peek', v); if (v) { entered = false; openedAt = performance.now(); } }
  function cite(k) {
    var c = P[k], title = c[4] ? '<a href="' + c[4] + '">' + c[1] + '</a>' : c[1];
    return '<li>' + c[0] + ' (' + c[3] + '). ' + title + '. <em>' + c[2] + '</em>.</li>';
  }
  function open(p, peek) {
    var media, cls = '';
    if (p.video) { media = embed(p.video); cls = 'video'; }
    else if (STYLE === 'paper' && p.paper) media = img(p.paper[0], p.paper[1]);
    else media = (p.media || p.tile)();
    var figcap = (STYLE === 'paper' && p.paper && !p.video && p.pubs.length) ? 'Figure: ' + P[p.pubs[0]][0].split(',')[0] + ' et al., ' + P[p.pubs[0]][2] + ', ' + P[p.pubs[0]][3] + '.' : (p.credit || '');
    var links = (p.links || []).map(function (l) { return '<a class="btn ghost" href="' + l[1] + '">' + l[0] + '</a>'; }).join('') +
      '<a class="btn" href="resume.html#' + p.resume + '">See it on my resume</a>';
    dlg.querySelector('.inner').innerHTML =
      '<p class="peek-hint">Preview. Click to keep it open, or move away to close.</p><div class="media ' + cls + '">' + media + '</div>' + (figcap ? '<p class="figcap">' + figcap + '</p>' : '') +
      '<div class="body"><p class="meta" style="color:var(--accent);font-size:.85rem;margin:0 0 .3rem">' + p.meta + '</p><h2>' + p.title + '</h2>' +
      '<div class="skills-row">' + p.skills.map(function (s) { return '<span class="sk">' + s + '</span>'; }).join('') + '</div>' +
      '<div class="story"><div><h4>Problem</h4><p>' + p.problem + '</p></div><div><h4>What I built</h4><p>' + p.built + '</p></div><div><h4>Outcome</h4><p>' + p.outcome + '</p></div></div>' +
      (p.extra ? '<div class="extra">' + p.extra() + '</div>' : '') +
      (p.pubs.length ? '<div class="pubs"><h4>Published work</h4><ul>' + p.pubs.map(cite).join('') + '</ul></div>' : '') +
      '<div class="panel-links">' + links + '</div></div>';
    setPeek(!!peek);
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    if (peek) dlg.querySelector('.close').blur();
  }
  dlg.addEventListener('close', function () { setPeek(false); dlg.querySelector('.inner').innerHTML = ''; history.replaceState(null, '', location.pathname + location.search); });
  // In preview mode: leaving the panel closes it; clicking inside pins it
  document.addEventListener('pointermove', function (e) {
    if (!peeking || !dlg.open) return;
    var r = dlg.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    var o = originRect, onTile = o && e.clientX >= o.left && e.clientX <= o.right && e.clientY >= o.top && e.clientY <= o.bottom;
    if (inside) entered = true;
    else if (entered || !onTile) quickClose();
  });
  document.addEventListener('mouseleave', function () { if (peeking && dlg.open) quickClose(); });
  // Fast fade-out for previews, so leaving feels instant
  function quickClose() {
    if (dlg.classList.contains('leaving')) return;
    dlg.classList.add('leaving');
    setTimeout(function () { dlg.classList.remove('leaving'); if (dlg.open) dlg.close(); }, 110);
  }
  // Any click while previewing (on the panel or the dimmed page) keeps it open
  dlg.addEventListener('pointerdown', function () { if (peeking) { setPeek(false); justPinned = true; } });
  dlg.querySelector('.close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (justPinned) { justPinned = false; return; } if (e.target === dlg) dlg.close(); if (e.target.closest('a[href="#tutorials"]')) dlg.close(); });
  dlg.addEventListener('contextmenu', function (e) { if (e.target.tagName === 'IMG') e.preventDefault(); });

  // ---------- filter ----------
  var chips = document.querySelectorAll('.chip'), current = new URLSearchParams(location.search).get('filter') || 'all';
  function filter(f) {
    current = f;
    grid.classList.toggle('filtered', f !== 'all');
    grid.querySelectorAll('.tile').forEach(function (el) { el.hidden = !(f === 'all' || el.dataset.cats.split(' ').indexOf(f) > -1); });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.filter === f ? 'true' : 'false'); });
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { filter(c.dataset.filter); }); });

  // ---------- figure style toggle (prototype only) ----------
  document.querySelectorAll('[data-style]').forEach(function (b) {
    b.addEventListener('click', function () {
      STYLE = b.dataset.style;
      document.querySelectorAll('[data-style]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      render();
    });
  });

  render();
  function fromHash() { var hit = PROJECTS.filter(function (p) { return '#' + p.id === location.hash; })[0]; if (hit) open(hit, false); }
  window.addEventListener('hashchange', fromHash); fromHash();
})();
