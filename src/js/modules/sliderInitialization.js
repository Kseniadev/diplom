export function sliderInitialization() {
    let Flickity = require('flickity');
    let flkty = new Flickity( '.commits-history__carousel', {
        freeScroll: true,
        wrapAround:  true,
        initialIndex: 0,
        groupCells: true
    });
}
