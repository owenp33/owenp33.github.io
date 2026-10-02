(function () {
    var items = document.querySelectorAll('.gallery-item');
    if (!items.length) {
        return;
    }

    var dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Photo viewer');
    dialog.innerHTML =
        '<figure class="lightbox-figure">' +
            '<img class="lightbox-image" alt="">' +
            '<figcaption class="lightbox-caption"></figcaption>' +
        '</figure>' +
        '<button class="lightbox-close" type="button" aria-label="Close photo">&times;</button>';
    document.body.appendChild(dialog);

    var image = dialog.querySelector('.lightbox-image');
    var caption = dialog.querySelector('.lightbox-caption');

    items.forEach(function (item) {
        item.addEventListener('click', function (event) {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            var thumb = item.querySelector('img');
            image.src = item.href;
            image.alt = thumb.alt;
            caption.textContent = thumb.alt;
            dialog.showModal();
        });
    });

    dialog.addEventListener('click', function () {
        dialog.close();
    });

    dialog.addEventListener('close', function () {
        image.removeAttribute('src');
    });
})();
