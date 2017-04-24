((Rx, jQuery) => {
    'use strict';
    var refreshClickStream = Rx.Observable.fromEvent(jQuery('.refresh'), 'click');

    // Emited on startup and refresh button click
    var requestStream = refreshClickStream.map(() => {
        var offset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + offset;
    }).startWith('https://api.github.com/users');


    var responseStream = requestStream
        .flatMap((requestUrl) => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));
})(Rx, jQuery);


