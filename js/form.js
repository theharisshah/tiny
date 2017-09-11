$('.form').on('submit', function() {
    var $form = $(this);
    var data = $form.serialize();
    var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    if ($form.hasClass('form-image')) {
        data = new FormData($form[0]);
        contentType = false;
    }
    var url = $form.prop('action');
    var method = $form.prop('method');

    var request = ajax(url, method, data, contentType);

    request.done(function(response) {
        var successFunction = $form.data('success');
        var destination = $form.data('destination');
        if (successFunction != undefined) {
            window[successFunction](response);
        } else if (destination != undefined) {
            window.location = destination;
        } else {
            location.reload();
        }
    });

    request.fail(function(error) {
        var errorFunction = $form.data('error');
        if (errorFunction != undefined) {
            window[errorFunction](error);
        } else {
            onError(error);
        }
    });

    return false;
});

function ajax(url, method, data, contentType) {
    return $.ajax({
        url: url,
        data: data,
        type: method,
        processData: false,
        contentType: contentType,
    });
}

function onError() {
    alert('error');
}
