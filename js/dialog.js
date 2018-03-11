function dialog(title, message, success, reject) {
    $dialog = $('#dialog');
    $dialog.find('.title').text(title);
    $dialog.find('.message').text(message);
    $buttonSuccess = $dialog.find('.button-success');
    $buttonReject = $dialog.find('.button-reject');
    $buttonSuccess.on('click', function() {
        $buttonSuccess.off('click');
        $buttonReject.off('click');
        Modal.hide($dialog);
        success();
    });
    $buttonReject.on('click', function() {
        $buttonSuccess.off('click');
        $buttonReject.off('click');
        Modal.hide($dialog);
        if (reject != undefined) {
            reject();
        }
    });
    Modal.show($dialog);
}
