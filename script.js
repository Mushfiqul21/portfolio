 /* SIDEBAR */
    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('hamburger').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('show');
    }
    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
      document.getElementById('overlay').classList.remove('show');
    }
    document.querySelectorAll('.sidebar-nav a').forEach(function(a) {
      a.addEventListener('click', function() { if (window.innerWidth <= 992) closeSidebar(); });
    });

    /* THEME */
    var isDark = true;
    function toggleTheme() {
      isDark = !isDark;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      document.getElementById('themeIcon').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      document.getElementById('themeLabel').textContent = isDark ? 'Light Mode' : 'Dark Mode';
      document.getElementById('toggleTrack').classList.toggle('on', !isDark);
      document.getElementById('toggleThumb').classList.toggle('on', !isDark);
    }

    /* PROJECT TABS — the only logic needed */
    var tabBtns = document.querySelectorAll('.proj-tab-btn');
    var tabPanels = document.querySelectorAll('.proj-tab-panel');

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var targetId = btn.getAttribute('data-target');

        /* update buttons */
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        /* update panels */
        tabPanels.forEach(function(p) { p.classList.remove('tab-active'); });
        document.getElementById(targetId).classList.add('tab-active');
      });
    });

    /* ACTIVE NAV ON SCROLL */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.sidebar-nav a');
    var secObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function(s) { secObserver.observe(s); });

    /* SCROLL TO TOP */
    var scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', function() {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    });

    /* FADE IN */
    var fadeEls = document.querySelectorAll('.fade-in');
    var fadeObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function() { entry.target.classList.add('visible'); }, (i % 4) * 80);
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(function(el) { fadeObs.observe(el); });