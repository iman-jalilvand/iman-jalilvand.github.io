# iman-jalilvand.github.io

Hand-built personal site: plain HTML, CSS and JavaScript, no build step.
What is in these files is exactly what the browser gets.

## Structure
    index.html            Home: hero, highlights, recognition, how my work connects
    portfolio.html        Portfolio: project tiles (from assets/js/portfolio.js), tutorials, more work
    resume.html           Resume: 2-page sheet + web-only teaching, publications, talks
    assets/css/style.css  All styling. Colours and fonts at the top (section 1, Tokens)
    assets/js/main.js     Every page: menu, lightbox, recognition animation
    assets/js/network.js  Home: interactive agent network behind the hero
    assets/js/portfolio.js  Portfolio: PROJECTS list, charts, wireframes, panels
    assets/js/resume.js   Resume: focus buttons and summaries
    images/               Photos and figures
    files/                Iman_Jalilvand_Resume.pdf (printed from resume.html)
    sitemap.xml, robots.txt  For Google

## Common edits
- Colours or fonts: style.css, section 1.
- Add or change a project: portfolio.js, PROJECTS list (each grid row adds up to 6).
- Resume text: resume.html. Keep resume line ids (r-...) matching the project "resume" fields.
- Regenerate the PDF: open resume.html in Chrome, Print, Save as PDF, Letter, no headers.
