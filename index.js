((Rx, jQuery) => {
    'use strict';

    const getMessage = () => "Hello World";
    document.getElementById('output').innerHTML = getMessage();

    
    var requestStream = Rx.Observable.just('https://api.github.com/users');
    requestStream.subscribe((requestUrl) => {
        Rx.Observable.create((observer) => {
            jQuery.getJSON(requestUrl)
                .done((r) => observer.onNext(r))
                .fail((jqXHR, status, error) => observer.onError(error))
                .always(() => onserver.onComplete());
        }).subscribe(() => {
            
        });
    });
})(Rx, jQuery);


