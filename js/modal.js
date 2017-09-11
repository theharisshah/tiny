$(document).on('click', '[data-dismiss="modal"]', function() {
    hideModal($(this).closest('.modal'));
});

$(document).on('click', '[data-modal]', function() {
    var selector = $(this).data('modal');
    showModal($(selector));
});

function showModal($selector) {
    $('body').css('overflow', 'hidden');
    $('.modal-backdrop').addClass('active');
    $selector.addClass('active');
}

function hideModal($selector) {
    $selector.removeClass('active');
    $('.modal-backdrop').removeClass('active');
    $('body').css('overflow', 'auto');
}
