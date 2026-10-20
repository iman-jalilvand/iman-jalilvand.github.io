// Resume page: "Focus" buttons swap the summary and fade less relevant lines.
// Nothing is hidden. To retag a line, edit its data-lens attribute in resume.html
// (values: ai, xr, research; several allowed, separated by spaces).
(function () {
  var summaries = {
    all: 'Applied ML scientist and simulation engineer with a <strong>Ph.D. in machine learning-based control</strong> and 6+ years taking AI from research to working prototypes with industry partners. Author of <strong>MATRL, a multi-agent transfer reinforcement learning framework</strong> that cut training time by 32% and energy use by nearly 40%. Builds <strong>LLM coaching grounded in validated simulation data</strong> and mixed reality tools in Unity, and proves their value through <strong>user studies and rigorous benchmarking</strong>. Has led six graduate researchers across four industry-supported projects and designed eight university courses.',
    ai: 'Applied ML scientist with a <strong>Ph.D. in machine learning-based control</strong> and 6+ years building ML systems end to end: problem framing, physics-based simulation, training, evaluation and deployment readiness. Author of <strong>MATRL</strong> (32% faster multi-agent training, nearly 40% less energy) and the FCNN-MAPPO architecture. Designs <strong>LLM decision support grounded in validated system data</strong> and builds <strong>evaluation pipelines that expose failure modes</strong> before deployment.',
    xr: 'XR engineer and designer with <strong>six years of Unity and C#</strong>, building mixed and virtual reality tools for HoloLens 2 and Meta Quest for industrial training and decision support. Takes interfaces from <strong>paper sketches and wireframes</strong> to the headset and <strong>validates them with user studies</strong>, cutting trainees’ spatial error by 74% (ACM CHI 2026). <strong>Teaches user-centered design</strong> and game development at UBC.',
    research: 'Applied researcher who designs studies, surveys and evaluation frameworks and turns the results into decisions. Builds <strong>custom survey instruments</strong> with validated scales, applies <strong>statistical and multicriteria analysis</strong> (ANOVA, post-hoc tests, TOPSIS) in Python, and reports to <strong>funders and industry partners</strong>. Contributed to $420K+ in research funding and a techno-economic feasibility study for a European partner.'
  };
  var sheet = document.getElementById('sheet'), summary = document.getElementById('summary');
  var btns = document.querySelectorAll('[data-lens-btn]'), items = sheet.querySelectorAll('[data-lens]');
  function apply(lens) {
    summary.innerHTML = summaries[lens] || summaries.all;
    sheet.classList.toggle('lensed', lens !== 'all');
    items.forEach(function (el) { el.classList.toggle('match', el.dataset.lens.split(' ').indexOf(lens) > -1); });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lensBtn === lens ? 'true' : 'false'); });
  }
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.dataset.lensBtn);
      history.replaceState(null, '', (b.dataset.lensBtn === 'all' ? location.pathname : '?focus=' + b.dataset.lensBtn) + location.hash);
    });
  });
  apply(new URLSearchParams(location.search).get('focus') || 'all');
  // Opening resume.html#teaching expands that section
  if (location.hash === '#teaching') { var d = document.getElementById('teaching'); if (d) d.open = true; }
})();
