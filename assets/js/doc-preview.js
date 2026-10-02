document.addEventListener('DOMContentLoaded', function () {
    var canvases = document.querySelectorAll('canvas[data-pdf-thumb]');
    if (!canvases.length || typeof pdfjsLib === 'undefined') return;

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    canvases.forEach(function (canvas) {
        var url = canvas.getAttribute('data-pdf-thumb');
        pdfjsLib.getDocument(url).promise
            .then(function (pdf) { return pdf.getPage(1); })
            .then(function (page) {
                var width = canvas.parentElement.clientWidth || 140;
                var unscaledViewport = page.getViewport({ scale: 1 });
                var scale = width / unscaledViewport.width;
                var viewport = page.getViewport({ scale: scale });
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                var context = canvas.getContext('2d');
                return page.render({ canvasContext: context, viewport: viewport }).promise;
            })
            .catch(function () {
                var icon = document.createElement('i');
                icon.className = 'fa fa-file-pdf-o doc-thumb-icon';
                canvas.replaceWith(icon);
            });
    });
});
