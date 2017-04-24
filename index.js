((Rx, jQuery) => {
    console.log('start');

    var refreshClickStream = Rx.Observable.fromEvent(jQuery('.refresh'), 'click');

    // Emited on startup and refresh button click
    var requestStream = refreshClickStream.startWith('startup click')
        .map(() => {
            var offset = Math.floor(Math.random()*500);
            return 'https://api.github.com/users?since=' + offset;
        });


    var responseStream = requestStream
        .flatMap((requestUrl) => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)))
        .subscribe((r) => {
            console.log('response');
            renderUser(r[0], jQuery('.user-list-item'));
        });

    function renderUser(user, userElement) {
        console.log(user.avatar_url);
        //console.log(userElement.find('user-list-item')[0])
        userElement.find('.user-avatar').attr('src',   user.avatar_url);
        userElement.find('.user-name').text(user.login);
    }
})(Rx, jQuery);


