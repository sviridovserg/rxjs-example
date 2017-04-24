((Rx, jQuery) => {
    console.log('start');

    var refreshClickStream = Rx.Observable.fromEvent(jQuery('.refresh'), 'click');
    var closeClickStream = Rx.Observable.fromEvent(jQuery('.user-list-item .remove-user'), 'click');

    // Emited on startup and refresh button click
    var requestStream = refreshClickStream.startWith('startup click')
        .map(() => {
            var offset = Math.floor(Math.random()*500);
            return 'https://api.github.com/users?since=' + offset;
        });


    var responseStream = requestStream
        .flatMap((requestUrl) => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)))
        .flatMap((list) => list);

    var suggestionStream = closeClickStream.startWith('startup click')
        .combineLatest(responseStream, (click, user) => {
            return user;
        })
        .merge(refreshClickStream.map(() => null))
        .startWith(null);

    suggestionStream.subscribe((suggestion) => {
        console.log('response');
        if(!suggestion) {
            hideUser(jQuery('.user-list-item'))
        } else {
            renderUser(suggestion, jQuery('.user-list-item'));
        }

    });


    function renderUser(user, userElement) {
        userElement.show();
        userElement.find('.user-avatar').attr('src',   user.avatar_url);
        userElement.find('.user-profile-link').attr('href',   user.html_url);
        userElement.find('.user-nik').text(user.login);
    }

    function hideUser(userElement) {
        userElement.hide();
    }
})(Rx, jQuery);


