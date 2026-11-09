/* SetPoint Labs — site behavior. No dependencies. */
(function () {
  var d = document, SITE = window.SITE || {};
  d.documentElement.classList.remove('no-js');

  // Solutions dropdown
  var ddBtn = d.querySelector('[data-dd-btn]'), dd = d.querySelector('[data-dd]');
  if (ddBtn && dd) {
    var setDD = function (open) { dd.classList.toggle('open', open); ddBtn.setAttribute('aria-expanded', open); };
    var li = ddBtn.parentElement, t, hoverAt = 0;
    ddBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (Date.now() - hoverAt < 500) return; // just opened by hover; keep it open
      setDD(!dd.classList.contains('open'));
    });
    li.addEventListener('mouseenter', function () { clearTimeout(t); if (matchMedia('(hover:hover)').matches && !dd.classList.contains('open')) { hoverAt = Date.now(); setDD(true); } });
    li.addEventListener('mouseleave', function () { t = setTimeout(function () { setDD(false); }, 160); });
    d.addEventListener('click', function (e) { if (!li.contains(e.target)) setDD(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setDD(false); ddBtn.focus(); } });
  }

  // Mobile menu
  var mBtn = d.querySelector('[data-menu-btn]'), mNav = d.querySelector('[data-mnav]');
  if (mBtn && mNav) {
    mBtn.addEventListener('click', function () {
      var open = !mNav.classList.contains('open');
      mNav.classList.toggle('open', open); mBtn.setAttribute('aria-expanded', open);
      mBtn.querySelector('span').textContent = open ? 'CLOSE' : 'MENU';
    });
  }

  // Reveal on scroll
  var rv = d.querySelectorAll('.rv, .dash');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // Hero live-call transcript
  var tx = d.querySelector('[data-tx]');
  if (tx) {
    var msgs = tx.querySelectorAll('.msg'), booked = d.querySelector('[data-booked]');
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var play = function () {
      msgs.forEach(function (m) { m.classList.remove('show'); });
      if (booked) booked.classList.remove('show');
      msgs.forEach(function (m, i) { setTimeout(function () { m.classList.add('show'); }, 500 + i * 1400); });
      if (booked) setTimeout(function () { booked.classList.add('show'); }, 500 + msgs.length * 1400);
    };
    if (reduce) { msgs.forEach(function (m) { m.classList.add('show'); }); if (booked) booked.classList.add('show'); }
    else { play(); setInterval(play, 500 + msgs.length * 1400 + 5200); }
  }

  // Booking form
  var form = d.querySelector('[data-book-form]');
  if (form) {
    var msg = form.querySelector('.form-msg'), btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.sms_conversational = !!form.querySelector('[name=sms_conversational]:checked');
      data.sms_marketing = !!form.querySelector('[name=sms_marketing]:checked');
      data.page = location.href; data.submitted_at = new Date().toISOString();
      var done = function () {
        msg.className = 'form-msg ok';
        msg.textContent = 'Got it, ' + (data.name || '').split(' ')[0] + '. We\'ll reach out within one business day to lock in a time.';
        form.reset(); btn.disabled = false; btn.firstChild.textContent = 'Book my call ';
      };
      btn.disabled = true; btn.firstChild.textContent = 'Sending… ';
      if (SITE.formEndpoint) {
        fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
          .catch(function () {
            btn.disabled = false; btn.firstChild.textContent = 'Book my call ';
            msg.className = 'form-msg err';
            msg.textContent = 'That didn\'t send. Please try again' + (SITE.phone ? ' or call ' + SITE.phone : '') + '.';
          });
      } else if (SITE.email) {
        var body = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
        location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('Strategy call request: ' + (data.company || data.name)) + '&body=' + encodeURIComponent(body);
        done();
      } else {
        if (window.console) console.info('[SetPoint] formEndpoint not set in site.config.js. Submission:', data);
        done();
      }
    });
  }

  // Missed-call calculator
  var calc = d.querySelector('[data-calc]');
  if (calc) {
    var $ = function (s) { return calc.querySelector(s); };
    var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
    var num = function (n) { return Math.round(n).toLocaleString('en-US'); };
    var run = function () {
      var calls = +$('#c-calls').value, missed = +$('#c-missed').value / 100, gone = +$('#c-gone').value / 100,
          book = +$('#c-book').value / 100, ticket = +$('#c-ticket').value;
      $('#o-calls').textContent = num(calls);
      $('#o-missed').textContent = Math.round(missed * 100) + '%';
      $('#o-gone').textContent = Math.round(gone * 100) + '%';
      $('#o-book').textContent = Math.round(book * 100) + '%';
      $('#o-ticket').textContent = fmt(ticket);
      var missedMo = calls * 4.33 * missed, lostCallers = missedMo * gone, lostJobs = lostCallers * book, lostMo = lostJobs * ticket;
      $('#r-month').textContent = fmt(lostMo);
      $('#r-year').textContent = fmt(lostMo * 12);
      $('#r-missed').textContent = num(missedMo);
      $('#r-jobs').textContent = num(lostJobs);
    };
    calc.addEventListener('input', run); run();
  }
})();
