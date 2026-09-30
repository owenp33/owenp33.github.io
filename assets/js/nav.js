(function () {
    var nav = document.querySelector('.nav-right');
    var indicator = nav && nav.querySelector('.nav-indicator');
    if (!indicator) {
        return;
    }

    var SLIDE_MS = 250;
    var links = Array.prototype.slice.call(nav.querySelectorAll('.underline'));
    var pageLink = nav.querySelector('.underline.active');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    nav.classList.add('js-nav');

    function moveTo(link) {
        if (!link) {
            indicator.style.width = '0';
            return;
        }
        var label = link.querySelector('h2') || link;
        var navRect = nav.getBoundingClientRect();
        var labelRect = label.getBoundingClientRect();
        indicator.style.left = (labelRect.left - navRect.left) + 'px';
        indicator.style.top = (labelRect.bottom - navRect.top) + 'px';
        indicator.style.width = labelRect.width + 'px';
    }

    function placeWithoutAnimation(link) {
        indicator.classList.remove('is-animated');
        moveTo(link);
        void indicator.offsetWidth;
        indicator.classList.add('is-animated');
    }

    function setActive(link) {
        links.forEach(function (l) { l.classList.toggle('active', l === link); });
    }

    placeWithoutAnimation(pageLink);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { placeWithoutAnimation(nav.querySelector('.underline.active')); });
    }

    window.addEventListener('resize', function () {
        placeWithoutAnimation(nav.querySelector('.underline.active'));
    });

    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            setActive(pageLink);
            placeWithoutAnimation(pageLink);
        }
    });

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (event.defaultPrevented || event.button !== 0 ||
                event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
                link === pageLink || reduceMotion) {
                return;
            }
            event.preventDefault();
            setActive(link);
            moveTo(link);
            setTimeout(function () { window.location.href = link.href; }, SLIDE_MS);
        });
    });
})();
