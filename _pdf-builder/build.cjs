// Long Rest Press PDF builder
// ---------------------------
// Turns every content page (subclasses, spells, optional rules) into a printable
// PDF at pdf/<page-name>.pdf, and adds a "Download PDF" button to the page.
//
// Runs automatically on GitHub (see .github/workflows/build-pdfs.yml, a copy of build-pdfs.yml here) whenever
// pages are uploaded. Only pages that changed since the last build are re-rendered;
// pdf/manifest.json remembers what was built.
//
// Run by hand:   cd _pdf-builder && npm ci && npx playwright install chromium && node build.cjs
// Options:       --force            rebuild every PDF
//                --only a.html,b.html  build just these pages
//                --no-link          don't add Download PDF buttons

const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");
const { chromium } = require("playwright");

const HERE = __dirname;
const SITE = path.resolve(HERE, "..");
const OUT = path.join(SITE, "pdf");
const FONTS = path.join(HERE, "node_modules", "@fontsource");
const SITE_URL = "https://longrestpress.com/";
const KOFI = "https://ko-fi.com/T1N0299Y80";
const BUTTON = 'class="btn-ghost pdf-download"';
const SKIP = ["index.html", "browse.html", "about.html"]; // site pages, not content

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const NO_LINK = args.includes("--no-link");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1].split(",").map((s) => s.trim()) : null;

// A content page has the small hero and an article body.
function contentPages() {
  return fs.readdirSync(SITE)
    .filter((f) => f.endsWith(".html"))
    .filter((f) => !SKIP.includes(f))
    .filter((f) => !ONLY || ONLY.includes(f))
    .filter((f) => {
      const html = fs.readFileSync(path.join(SITE, f), "utf8");
      return html.includes('class="hero small"') && html.includes('class="article"');
    })
    .sort();
}

// Adds the Download PDF button under the credits line (once).
function addButton(file) {
  const p = path.join(SITE, file);
  let html = fs.readFileSync(p, "utf8");
  if (html.includes(BUTTON)) return false;
  const slug = file.replace(/\.html$/, "");
  const btn = `<a ${BUTTON} href="pdf/${slug}.pdf" download>Download PDF</a>`;
  const credits = html.match(/([ \t]*)<div class="label sm credits">[\s\S]*?<\/div>/);
  if (credits) {
    html = html.replace(credits[0], credits[0] + "\n" + credits[1] + btn);
  } else {
    const hero = html.match(/<section class="hero small">[\s\S]*?(\n?[ \t]*)<\/section>/);
    if (!hero) return false;
    html = html.replace(hero[0], hero[0].replace(/(\n?[ \t]*)<\/section>$/, "\n  " + btn + "$1</section>"));
  }
  fs.writeFileSync(p, html);
  return true;
}

// Tiny static server: the site, plus the PDF stylesheet and bundled fonts.
function serve() {
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let base = SITE;
    if (rel.startsWith("/__pdf/")) { base = HERE; rel = rel.slice(6); }
    else if (rel.startsWith("/__fonts/")) { base = FONTS; rel = rel.slice(8); }
    const file = path.join(base, path.normalize(rel));
    if (!file.startsWith(base) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

// Runs inside the page: rebuilds the body in the print layout from the page's own content.
function transform({ slug, siteUrl, kofi }) {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const moon = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true"><path d="M24 9a11 11 0 1 0 6 18 9 9 0 0 1-6-18z" fill="#B8923A"/></svg>`;
  const diamond = '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0 10 5 5 10 0 5z" fill="#D8B25A"/></svg>';

  const hero = $(".hero");
  const kicker = $(".label.gold", hero);
  const h1 = $("h1", hero);
  const lede = $(".lede", hero);
  const credits = $$(".credits span", hero).map((s) => s.textContent.trim()).filter(Boolean);
  const article = $(".article").cloneNode(true);
  const footerParas = $$("footer p").map((p) => p.innerHTML);

  // Pull out the bits that get their own treatment.
  const playtest = $(".playtest", article);
  if (playtest) playtest.remove();
  const signup = $(".signup", article);
  const closingLine = signup && $("h3", signup) ? $("h3", signup).textContent.trim() : "Take a long rest, we'll wake you for the loot.";
  $$(".signup", article).forEach((s) => s.remove());

  // Links: on-page anchors stay; site links become full web addresses.
  const absolutize = (root) => $$("a[href]", root).forEach((a) => {
    const href = a.getAttribute("href");
    if (/^(#|https?:|mailto:)/.test(href)) return;
    a.setAttribute("href", siteUrl + href);
  });

  // Callout links (shared rules) become boxes with the address spelled out.
  $$("a.callout", article).forEach((a) => {
    const box = el("div", "callout");
    const label = $(".label", a);
    const href = a.getAttribute("href") || "";
    if (label) { label.className = "label"; label.textContent = label.textContent.replace(/\s*→\s*$/, ""); }
    box.innerHTML = a.innerHTML;
    if (href && !href.startsWith("#")) {
      const full = /^https?:/.test(href) ? href : siteUrl + href;
      box.appendChild(el("a", "see", full.replace(/^https?:\/\//, ""))).setAttribute("href", full);
    }
    a.replaceWith(box);
  });
  absolutize(article);

  // Tables: mark numeric columns so they get the mono figures (right-aligned unless first).
  $$("table", article).forEach((t) => {
    const rows = $$("tbody tr", t);
    const cols = rows[0] ? rows[0].children.length : 0;
    for (let c = 0; c < cols; c++) {
      const cells = rows.map((r) => r.children[c]).filter(Boolean);
      const numeric = cells.length && cells.every((td) => /^[\s\d\/+\-–—.,×x%d]*\d[\s\d\/+\-–—.,×x%d]*$/.test(td.textContent.trim()) && td.textContent.trim().length <= 8);
      if (!numeric) continue;
      cells.forEach((td) => { td.classList.add("num"); if (c > 0) td.classList.add("num-r"); });
      const th = $$("thead tr th", t)[c];
      if (th && c > 0) th.classList.add("num-r");
    }
  });

  // Features at a glance, from the leveled feature sections.
  const leveled = $$("section.feature", article)
    .filter((s) => $(":scope > .lvl", s) && $(":scope > h2", s))
    .map((s) => ({ lvl: $(":scope > .lvl", s).textContent.replace(/level/i, "").trim(), name: $(":scope > h2", s).textContent.trim() }));
  const firstFeature = $("section.feature", article);
  let tableBeforeFeatures = false;
  for (const child of article.children) { if (child === firstFeature) break; if (child.querySelector("table") || child.matches("table")) tableBeforeFeatures = true; }

  // ---- Assemble ----
  const page = el("div", "pdf");
  page.appendChild(el("header", "runhead",
    `<span class="brand">${moon(16)}<span>Long Rest Press</span></span><a href="${siteUrl}${slug}.html">longrestpress.com</a>`));

  const tb = el("section", "titleblock");
  if (kicker) tb.appendChild(el("div", "mono kicker", kicker.innerHTML));
  tb.appendChild(el("h1", null, h1 ? h1.innerHTML : slug));
  if (lede) tb.appendChild(el("p", "lede", lede.innerHTML));
  tb.appendChild(el("div", "ornament", `<i></i>${diamond}<i></i>`));
  if (credits.length) tb.appendChild(el("div", "credits", credits.map((c) => `<span>${c.replace(/</g, "&lt;")}</span>`).join("")));
  page.appendChild(tb);

  const body = el("div", "body");
  if (leveled.length >= 3 && !tableBeforeFeatures) {
    const g = el("aside", "glance", '<span class="mono accent">Features</span>');
    leveled.forEach((f) => g.appendChild(el("div", "row", `<span>${f.lvl}</span><span>${f.name.replace(/</g, "&lt;")}</span>`)));
    body.appendChild(g);
  }
  while (article.firstChild) body.appendChild(article.firstChild);
  page.appendChild(body);

  if (playtest) {
    const notes = el("section", "notes");
    const labels = $$(":scope > .label", playtest);
    notes.appendChild(el("span", "mono", labels[0] ? labels[0].textContent.trim() : "Playtest notes"));
    $$(":scope > :not(.label)", playtest).forEach((n) => notes.appendChild(n));
    if (labels.length > 1) notes.appendChild(el("span", "mono version", labels[labels.length - 1].textContent.trim()));
    absolutize(notes);
    page.appendChild(notes);
  }

  page.appendChild(el("div", "ornament wide", `<i></i>${diamond}<i></i>`));
  page.appendChild(el("section", "closing",
    `${moon(22)}<p class="line">${closingLine}</p>` +
    `<p class="cta">New subclasses and homebrew every week, free, at <a href="${siteUrl}">longrestpress.com</a>. ` +
    `If this one earned a spot at your table, you can support the press at <a href="${kofi}">${kofi.replace(/^https?:\/\//, "")}</a>.</p>`));

  const legal = el("footer", "legal");
  footerParas.forEach((p, i) => legal.appendChild(el("p", null, i === 0 ? p.replace(/\s*·\s*New releases every week\s*$/i, "") : p)));
  absolutize(legal);
  page.appendChild(legal);

  // Swap the page out for the print layout.
  $$('link[rel="stylesheet"], style').forEach((s) => s.remove());
  document.body.className = "";
  document.body.replaceChildren(page);
  return h1 ? h1.textContent.trim() : slug;
}

function hashFor(file, extra) {
  const h = crypto.createHash("sha256");
  h.update(fs.readFileSync(path.join(SITE, file)));
  h.update(extra);
  return h.digest("hex").slice(0, 16);
}

(async () => {
  const pages = contentPages();
  if (!pages.length) { console.log("No content pages found."); return; }
  fs.mkdirSync(OUT, { recursive: true });

  if (!NO_LINK) pages.forEach((f) => { if (addButton(f)) console.log(`+ Download button added to ${f}`); });

  const manifestPath = path.join(OUT, "manifest.json");
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
  const toolHash = fs.readFileSync(path.join(HERE, "pdf.css"), "utf8") + fs.readFileSync(__filename, "utf8");

  const todo = pages.filter((f) => {
    const slug = f.replace(/\.html$/, "");
    return FORCE || manifest[slug] !== hashFor(f, toolHash) || !fs.existsSync(path.join(OUT, slug + ".pdf"));
  });
  if (!todo.length) { console.log("All PDFs are up to date."); return; }

  const server = await serve();
  const port = server.address().port;
  const browser = await chromium.launch();
  let failed = 0;

  for (const file of todo) {
    const slug = file.replace(/\.html$/, "");
    const page = await browser.newPage();
    // Keep it offline and quiet: no analytics, no Google Fonts (fonts are bundled).
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    try {
      await page.goto(`http://127.0.0.1:${port}/${file}`, { waitUntil: "load" });
      const title = await page.evaluate(transform, { slug, siteUrl: SITE_URL, kofi: KOFI });
      await page.addStyleTag({ url: "/__pdf/pdf.css" });
      await page.addStyleTag({ content: `@page{@bottom-left{content:${JSON.stringify("Long Rest Press · " + title)}}}` });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: "print" });
      await page.pdf({
        path: path.join(OUT, slug + ".pdf"),
        printBackground: true,
        preferCSSPageSize: true,
        tagged: true,
        outline: true,
      });
      manifest[slug] = hashFor(file, toolHash);
      console.log(`✓ pdf/${slug}.pdf  (${title})`);
    } catch (e) {
      failed++;
      console.error(`✗ ${file}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
  if (failed) process.exitCode = 1;
})();
