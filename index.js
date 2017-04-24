((Rx, jQuery) => {
    'use strict';

    // Emitted on startup
    var startupRequestStream = Rx.Observable.just('https://api.github.com/users');
    var refreshClickStream = Rx.Observable.fromEvent(jQuery('.refresh'), 'click');

    // Emited on refresh button click
    var refreshOnRequestStream = requestStream.map(() => {
        var offset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + offset;
    });


    var responseStream = Rx.Observable.merge(startupRequestStream, refreshOnRequestStream)
        .flatMap((requestUrl) => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));
})(Rx, jQuery);


