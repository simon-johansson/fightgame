
if (window.location.pathname.indexOf('input') !== -1) {
    require('./input');
} else {
    require('./host');
}
