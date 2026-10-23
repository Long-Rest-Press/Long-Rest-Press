// Builds the dynamic parts of each page from the catalog in posts.js.
(function () {
  var SITE = window.SITE;
  // Released posts first (newest first), then planned ones in catalog order.
  var released = SITE.posts.filter(function (p) { return !p.soon; })
    .sort(function (a, b) { return b.date.localeCompare(a.date); });
  var upcoming = SITE.posts.filter(function (p) { return p.soon; });
  var posts = released.concat(upcoming);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function kind(p) {
    if (p.kindLabel) return p.kindLabel;
    return p.class ? p.class + " " + p.type.toLowerCase() : p.type;
  }

  // "Subclass" → "Subclasses", "Optional Rules" stays as is, "Spell" → "Spells".
  function plural(t) { return /ss$/.test(t) ? t + "es" : /s$/.test(t) ? t : t + "s"; }

  function browseLink(param, value) { return "browse.html?" + param + "=" + encodeURIComponent(value); }

  // Small card used in the "Latest" row and on the Browse page.
  function postCard(p) {
    var tag = p.url ? "a" : "div";
    var href = p.url ? ' href="' + esc(p.url) + '"' : "";
    var status = p.soon ? '<span class="status">Coming soon</span>' : '<span class="status live">' + esc(fmtDate(p.date)) + "</span>";
    return "<" + tag + ' class="card post-card' + (p.soon ? " soon" : "") + '"' + href + ">" +
      '<div class="top"><span class="label sm">' + esc(kind(p)) + "</span>" + status + "</div>" +
      '<span class="t">' + esc(p.title) + "</span>" +
      '<span class="m">' + esc(p.summary) + "</span>" +
      // Planned cards aren't links themselves, so a shared-rules page gets its own link.
      (p.guide && p.soon ? '<a class="label sm gold cardlink" href="' + esc(p.guide) + '">Shared ' + esc(p.fandom) + " rules →</a>" : "") +
      '<span class="status live foot">' + esc(p.fandom) + "</span>" +
      "</" + tag + ">";
  }

  // ---- Home page ----
  function renderHome() {
    var featuredEl = document.getElementById("featured");
    if (!featuredEl) return;
    var releases = released.filter(function (p) { return !p.reference; });
    var f = releases[0];
    var art = f.image ? '<img src="' + esc(f.image) + '" alt="">' : "release art · " + esc(f.title);
    featuredEl.outerHTML =
      '<a class="release" href="' + esc(f.url || "#") + '">' +
        '<div class="art">' + art + "</div>" +
        '<div class="release-body">' +
          '<div class="label sm metarow"><span class="gold">Latest release</span>' + (f.version ? "<span>" + esc(f.version) + "</span>" : "") + "</div>" +
          '<span class="label sm">' + esc(kind(f)) + " · " + esc(f.fandom) + "</span>" +
          "<h3>" + esc(f.title) + "</h3>" +
          "<p>" + esc(f.summary) + "</p>" +
          '<span class="label gold" style="letter-spacing:.14em;margin-top:6px">Read it →</span>' +
        "</div>" +
      "</a>";

    // Until there are more releases, the row under the featured card previews what's coming next.
    var row = releases.slice(1, 5);
    if (!row.length) document.getElementById("recent-label").hidden = false;
    row = row.concat(upcoming.slice(0, 4 - row.length));
    document.getElementById("recent").innerHTML = row.map(postCard).join("");

    document.getElementById("fandoms").innerHTML = SITE.fandoms.map(function (fd) {
      var inFandom = posts.filter(function (p) { return p.fandom === fd.name; });
      var live = inFandom.some(function (p) { return !p.soon; });
      var subclasses = inFandom.filter(function (p) { return p.type === "Subclass" && p.class; }).length;
      var tag = inFandom.length ? "a" : "div";
      return "<" + tag + ' class="card' + (live ? "" : " soon") + '"' + (inFandom.length ? ' href="' + browseLink("fandom", fd.name) + '"' : "") + ">" +
        '<div class="top"><span class="n">' + Math.max(fd.planned || 0, subclasses) + '</span><span class="status' + (live ? " live" : "") + '">' + (live ? "Available" : "Coming soon") + "</span></div>" +
        '<span class="t">' + esc(fd.name) + "</span>" +
        '<span class="m">' + esc(fd.blurb) + "</span>" +
        "</" + tag + ">";
    }).join("");

    document.getElementById("quicklinks").innerHTML = SITE.types.map(function (t) {
      return '<a class="label sm" href="' + browseLink("type", t) + '">' + esc(plural(t)) + "</a>";
    }).join("");
  }

  // ---- Browse page ----
  function renderBrowse() {
    var root = document.getElementById("browse");
    if (!root) return;
    var params = new URLSearchParams(location.search);
    var state = { q: params.get("q") || "", type: params.get("type") || "", fandom: params.get("fandom") || "", class: params.get("class") || "" };
    var groups = [
      { key: "type", label: "Type", values: SITE.types },
      { key: "fandom", label: "Fandom", values: SITE.fandoms.map(function (f) { return f.name; }) },
      { key: "class", label: "Class", values: SITE.classes }
    ];

    var input = document.getElementById("q");
    input.value = state.q;

    function chips(g) {
      var all = '<button type="button" class="chip" data-k="' + g.key + '" data-v="" aria-pressed="' + (state[g.key] === "") + '">All</button>';
      return all + g.values.map(function (v) {
        return '<button type="button" class="chip" data-k="' + g.key + '" data-v="' + esc(v) + '" aria-pressed="' + (state[g.key] === v) + '">' + esc(v) + "</button>";
      }).join("");
    }

    function matches(p) {
      if (state.type && p.type !== state.type) return false;
      if (state.fandom && p.fandom !== state.fandom) return false;
      if (state.class && p.class !== state.class) return false;
      if (state.q) {
        var hay = [p.title, p.summary, p.type, p.class, p.fandom, p.inspired].join(" ").toLowerCase();
        var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
        for (var i = 0; i < words.length; i++) if (hay.indexOf(words[i]) === -1) return false;
      }
      return true;
    }

    function update() {
      document.getElementById("filters").innerHTML = groups.map(function (g) {
        return '<div class="fgroup"><span class="label sm">' + g.label + '</span><div class="chips">' + chips(g) + "</div></div>";
      }).join("");

      var hits = posts.filter(matches);
      document.getElementById("results").innerHTML = hits.length
        ? hits.map(postCard).join("")
        : '<div class="grid-empty">Nothing matches yet. Try clearing a filter.</div>';
      document.getElementById("count").textContent = hits.length + (hits.length === 1 ? " result" : " results");
      var active = state.q || state.type || state.fandom || state.class;
      document.getElementById("clear").hidden = !active;

      var qs = new URLSearchParams();
      Object.keys(state).forEach(function (k) { if (state[k]) qs.set(k, state[k]); });
      history.replaceState(null, "", location.pathname + (qs.toString() ? "?" + qs : ""));
    }

    document.getElementById("filters").addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state[b.dataset.k] = b.dataset.v;
      update();
    });
    input.addEventListener("input", function () { state.q = input.value.trim(); update(); });
    document.getElementById("browse-form").addEventListener("submit", function (e) { e.preventDefault(); });
    document.getElementById("clear").addEventListener("click", function () {
      state = { q: "", type: "", fandom: "", class: "" };
      input.value = "";
      update();
    });
    update();
  }

  renderHome();
  renderBrowse();

  // Images and the Kit form resize the page after the browser's first jump to a #hash,
  // so links like index.html#newsletter would land in the wrong spot. Jump again once loaded.
  window.addEventListener("load", function () {
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  });
})();
