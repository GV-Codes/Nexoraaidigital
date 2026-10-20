(function () {
'use strict';
function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }
  /* ---------- 3D book reader: click a book on the shelf to open it ---------- */
  var bk = null;
  function bookSize() {
    var vw = window.innerWidth, vh = window.innerHeight, single = vw <= 760;
    var h = Math.max(360, Math.min(single ? 720 : 660, vh - (single ? 130 : 140)));
    var w = single ? Math.min(vw - 24, 480) : Math.min(1060, vw - 56);
    return { w: Math.round(w), h: Math.round(h), single: single };
  }
  function mk(tag, cls, text) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (text != null) { e.textContent = text; } return e; }
  function fmtDate(iso) { try { return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }); } catch (e) { return ''; } }

  function openBook(b, opts) {
    opts = opts || {};
    if (bk) { return; }
    var slug = (b.link || '').split('/').filter(Boolean).pop();
    var st = mk('div', 'nbk-stage'); st.setAttribute('role', 'dialog'); st.setAttribute('aria-modal', 'true'); st.setAttribute('aria-label', b.title);
    var top = mk('div', 'nbk-top');
    var nt = mk('a', 'nbk-btn', opts.standalone ? 'Plain page \u2197' : 'Open in new tab \u2197'); nt.href = b.link; if (!opts.standalone) { nt.target = '_blank'; nt.rel = 'noopener'; }
    var cl = mk('button', 'nbk-btn', opts.standalone ? '\u2190 Back to library' : 'Close \u2715'); cl.type = 'button';
    top.appendChild(nt); top.appendChild(cl);
    var scene = mk('div', 'nbk-scene'), book = mk('div', 'nbk');
    st.style.setProperty('--h', b.hue);
    var board = mk('div', 'nbk-board'), pages = mk('div', 'nbk-pages'), wrap = mk('div', 'nbk-wrap'), flow = mk('div', 'nbk-flow');
    var pnl = mk('div', 'nbk-pn l', ''), pnr = mk('div', 'nbk-pn r', '');
    wrap.appendChild(flow); pages.appendChild(wrap); pages.appendChild(pnl); pages.appendChild(pnr);
    var cover = mk('div', 'nbk-cover'), front = mk('div', 'nbk-face nbk-front'), back = mk('div', 'nbk-face nbk-back');
    front.appendChild(mk('small', '', 'Nexora reading nook')); front.appendChild(mk('i')); front.appendChild(mk('h2', '', b.title)); front.appendChild(mk('i')); front.appendChild(mk('span', '', b.cat || ''));
    cover.appendChild(back); cover.appendChild(front);
    book.appendChild(board); book.appendChild(pages); book.appendChild(cover); scene.appendChild(book);
    var nav = mk('div', 'nbk-nav'), prev = mk('button', 'nbk-btn', '\u2190 Prev'), next = mk('button', 'nbk-btn', 'Next \u2192'), ind = mk('span', '', '');
    prev.type = next.type = 'button'; nav.appendChild(prev); nav.appendChild(ind); nav.appendChild(next);
    st.appendChild(top); st.appendChild(scene); st.appendChild(nav);
    document.body.appendChild(st);

    var S = { si: 0, sn: 1, shift: 0, per: 2, loaded: false, timer: null, lastFocus: document.activeElement };
    bk = S;

    function layout() {
      var sz = bookSize(), padX = sz.single ? 26 : 42, padY = sz.single ? 30 : 38, foot = 34;
      var pageW = sz.single ? sz.w : sz.w / 2;
      var colW = Math.floor(pageW - 2 * padX), gap = 2 * padX;
      S.per = sz.single ? 1 : 2;
      var fw = S.per === 1 ? colW : 2 * colW + gap, fh = sz.h - padY - foot - 6;
      st.classList.toggle('single', sz.single);
      scene.style.setProperty('--bw', sz.w + 'px'); scene.style.setProperty('--bh', sz.h + 'px');
      wrap.style.left = padX + 'px'; wrap.style.top = padY + 'px'; wrap.style.width = fw + 'px'; wrap.style.height = fh + 'px';
      flow.style.height = fh + 'px'; flow.style.width = fw + 'px'; flow.style.columnWidth = colW + 'px'; flow.style.webkitColumnWidth = colW + 'px';
      flow.style.columnGap = gap + 'px'; flow.style.webkitColumnGap = gap + 'px';
      flow.style.fontSize = (sz.single ? 16 : 16.5) + 'px';
      flow.style.setProperty('--ih', Math.round(fh * 0.55) + 'px');
      pnl.style.left = padX + 'px'; pnr.style.right = sz.single ? '' : padX + 'px';
      var cols = Math.max(1, Math.ceil((flow.scrollWidth - 1 + gap) / (colW + gap)));
      S.shift = S.per * (colW + gap); S.sn = Math.max(1, Math.ceil(cols / S.per));
      if (S.si > S.sn - 1) { S.si = S.sn - 1; }
      go(S.si, 0, true);
    }
    function go(i, dir, quiet) {
      i = Math.max(0, Math.min(S.sn - 1, i));
      if (!quiet && i !== S.si) { pages.classList.remove('turn'); void pages.offsetWidth; pages.classList.add('turn'); }
      S.si = i;
      flow.style.transform = 'translateX(' + (-i * S.shift) + 'px)';
      var a = i * S.per + 1, total = S.sn * S.per;
      pnl.textContent = S.per === 2 ? String(a) : '';
      pnr.textContent = String(S.per === 2 ? a + 1 : a);
      ind.textContent = S.per === 2 ? ('Pages ' + a + '\u2013' + Math.min(a + 1, total) + ' of ' + total) : ('Page ' + a + ' of ' + total);
      prev.disabled = i <= 0; next.disabled = i >= S.sn - 1;
    }
    function close() {
      if (!bk) { return; }
      if (opts.standalone) { try { window.close(); } catch (e0) {} setTimeout(function () { location.href = '/'; }, 200); return; }
      document.removeEventListener('keydown', onKey, true); window.removeEventListener('resize', onResize);
      st.classList.remove('on'); clearTimeout(S.timer);
      setTimeout(function () { if (st.parentNode) { st.parentNode.removeChild(st); } }, 380);
      bk = null;
      try { if (S.lastFocus && S.lastFocus.focus) { S.lastFocus.focus(); } } catch (e) {}
    }
    function onKey(e) {
      if (e.key === 'Escape') { if (!opts.standalone) { e.stopImmediatePropagation(); e.preventDefault(); close(); } }
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(S.si + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(S.si - 1); }
    }
    var rz; function onResize() { clearTimeout(rz); rz = setTimeout(function () { if (S.loaded) { layout(); } else { var sz = bookSize(); st.classList.toggle('single', sz.single); scene.style.setProperty('--bw', sz.w + 'px'); scene.style.setProperty('--bh', sz.h + 'px'); } }, 120); }
    document.addEventListener('keydown', onKey, true); window.addEventListener('resize', onResize);
    cl.onclick = close; prev.onclick = function () { go(S.si - 1); }; next.onclick = function () { go(S.si + 1); };
    st.addEventListener('mousedown', function (e) { if (e.target === st && !opts.standalone) { close(); } });
    var tx = null;
    scene.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    scene.addEventListener('touchend', function (e) { if (tx == null) { return; } var dx = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(dx) > 45) { go(S.si + (dx < 0 ? 1 : -1)); } }, { passive: true });

    var sz0 = bookSize(); st.classList.toggle('single', sz0.single);
    scene.style.setProperty('--bw', sz0.w + 'px'); scene.style.setProperty('--bh', sz0.h + 'px');
    book.style.setProperty('--h', b.hue); book.style.setProperty('--h', b.hue);
    requestAnimationFrame(function () { st.classList.add('on'); });
    cl.focus();

    function fill(data) {
      flow.innerHTML = '';
      flow.appendChild(mk('div', 'nbk-eyebrow', (data.labels && data.labels[0]) || 'Nexora reading nook'));
      flow.appendChild(mk('h1', 'nbk-title', data.title || b.title));
      var meta = fmtDate(data.published); if (data.labels && data.labels.length) { meta += (meta ? ' \u00b7 ' : '') + data.labels.join(', '); }
      if (meta) { flow.appendChild(mk('div', 'nbk-meta', meta)); }
      var body = mk('div', 'nbk-body'); body.innerHTML = data.html || '';
      flow.appendChild(body);
      var links = body.querySelectorAll('a[href]'); for (var i = 0; i < links.length; i++) { links[i].target = '_blank'; links[i].rel = 'noopener'; }
      var imgs = body.querySelectorAll('img'); for (var j = 0; j < imgs.length; j++) { imgs[j].addEventListener('load', onResize); }
      S.loaded = true; layout();
    }
    function failed() {
      flow.innerHTML = '';
      flow.appendChild(mk('h1', 'nbk-title', b.title));
      var p = mk('p', '', 'This article could not be loaded inside the book. '); var a = mk('a', '', 'Open it in a new tab'); a.href = b.link; a.target = '_blank'; a.rel = 'noopener'; p.appendChild(a); flow.appendChild(p);
      S.loaded = true; layout();
    }
    if (opts.data) { fill(opts.data); }
    else { fetch('/book/' + encodeURIComponent(slug) + '.json').then(function (r) { if (!r.ok) { throw new Error('http ' + r.status); } return r.json(); }).then(fill).catch(failed); }
    /* the cover swings open, then fades so the text underneath shows */
    S.timer = setTimeout(function () {
      book.classList.add('open');
      S.timer = setTimeout(function () { book.classList.add('settled'); st.classList.add('ready'); }, 1250);
    }, opts.standalone ? 450 : 750);
  }


  window.NexoraBook = { open: openBook, hash: hash };
})();
