function clean(str) {
    return str.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

module.exports = { clean };