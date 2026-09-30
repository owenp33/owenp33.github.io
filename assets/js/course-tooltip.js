(function () {
    var margin = 8;
    var gap = 6;

    var tooltip = document.createElement('div');
    tooltip.className = 'course-tooltip';
    tooltip.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'background-color: var(--bg-panel)',
        'color: var(--text-primary)',
        'padding: 4px 8px',
        'border-radius: 6px',
        'font-size: 11px',
        'line-height: 1.4',
        'white-space: normal',
        'width: max-content',
        'max-width: min(240px, calc(100vw - 16px))',
        'opacity: 0',
        'visibility: hidden',
        'pointer-events: none',
        'transition: opacity 0.3s',
        'z-index: 1000'
    ].join(';');
    document.body.appendChild(tooltip);

    function show(course) {
        tooltip.textContent = course.getAttribute('data-tooltip');
        tooltip.style.visibility = 'visible';

        var viewportWidth = document.documentElement.clientWidth;
        var c = course.getBoundingClientRect();
        var t = tooltip.getBoundingClientRect();

        var left = c.left + c.width / 2 - t.width / 2;
        left = Math.max(margin, Math.min(left, viewportWidth - t.width - margin));

        var top = c.top - t.height - gap;
        if (top < margin) {
            top = c.bottom + gap;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.opacity = '1';
    }

    function hide() {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    }

    document.querySelectorAll('.course[data-tooltip]').forEach(function (course) {
        course.addEventListener('mouseenter', function () { show(course); });
        course.addEventListener('mouseleave', hide);
    });

    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('resize', hide);
})();
