$('.form-button').on('click', function() {
    var $form = $($(this).data('form'));
    if ($form == undefined) {
        $form = $(this).closest('form');
    }
    var url = $(this).data('action');
    if (url == undefined) {
        url = $form.prop('action');
    }
    onFormSubmitted($form, url);
});

$(document).on('submit', '.form', function() {
    var $form = $(this);
    var url = $form.prop('action');
    onFormSubmitted($form, url);
    return false;
});

function onFormSubmitted($form, url) {
    $form.find('.mobile-country-picker').each(function() {
        $(this).val($(this).intlTelInput("getNumber"));
    });
    var data = $form.serialize();
    var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    if ($form.hasClass('form-multipart')) {
        data = new FormData($form[0]);
        contentType = false;
    }

    var method = $form.prop('method');
    var request = ajax(url, method, data, contentType);

    request.done(function(response) {
        var successFunction = $form.data('success');
        var destination = $form.data('destination');
        if (successFunction != undefined) {
            window[successFunction](response);
        } else if (destination != undefined) {
            if (destination != false) {
                var regex = /#(\S+)#/;
                while (match = regex.exec(destination)) {
                    path = match[1].split('.');
                    var value = response;
                    for (var i = 0; i < path.length; i++)
                        value = value[path[i]];
                    destination = destination.replace(match[0], value == undefined ? "" : value);
                    match = regex.exec(destination);
                }
                window.location = destination;
            }
        } else {
            location.reload();
        }
    });

    request.fail(function(error) {
        var errorFunction = $form.data('error');
        if (errorFunction != undefined) {
            window[errorFunction](error);
        } else if (error.status == 422) {
            showFormErrors($form, error);
            showMessage(error);
        } else {
            showMessage(error);
        }
    });
}

function ajax(url, method, data, contentType) {
    return $.ajax({
        url: url,
        data: data,
        type: method,
        processData: false,
        contentType: contentType,
    });
}

function showFormErrors($form, error) {
    var errors = error.responseJSON.errors;
    $form.find('.error').removeClass('active');
    for (key in errors) {
        let $error = $form.find('.error.error-' + key);
        $error.text(errors[key]);
        $error.addClass('active');
    }
}

function showMessage(error) {
    var message = error.responseJSON.message;
    if (message == undefined) {
        message = "An unexpected error has occurred";
    }
    var toast = new Toast(message);
    toast.show();
}
