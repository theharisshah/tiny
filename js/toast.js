$(document).on('click', '.toast .remove', function() {
    $(this).closest('.toast').remove();
});

var Toast = function(message) {
    var $toastHtml = $('.templates>.toast').clone();
    $toastHtml.find('.message').text(message);

    this.show = function() {
        var self = this;
        $('body .toast').hide();
        $('body').append($toastHtml);
        $toastHtml.show();
        setTimeout(function() {
            self.hide();
        }, 3000);
    };

    this.hide = function() {
        $toastHtml.remove();
    };
}

// var toast = new Toast("testing message");
// toast.show();
