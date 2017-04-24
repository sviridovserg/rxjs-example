((Rx, jQuery) => {
    'use strict';

    const getMessage = () => "Hello World";
    document.getElementById('output').innerHTML = getMessage();



    var requestStream = Rx.Observable.just('https://api.github.com/users');
    var responseStream = requestStream
        .flatMap((requestUrl) => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));

})(Rx, jQuery);


