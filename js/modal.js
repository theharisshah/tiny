var Modal = (function($) {
    return {
        $body: $('body'),
        $modalBackdrop: $('.modal-backdrop'),
        init: function() {
            $(document).on('click', '[data-dismiss="modal"]', function() {
                Modal.hide($(this).closest('.modal'));
            });
            $(document).on('click', '[data-modal]', function() {
                var selector = $(this).data('modal');
                Modal.show($(selector));
            });
        },
        hide: function($selector) {
            $selector.removeClass('active');
            this.$modalBackdrop.removeClass('active');
            this.$body.css('overflow', 'auto');
        },
        show: function($selector) {
            this.$body.css('overflow', 'hidden');
            this.$modalBackdrop.addClass('active');
            $selector.addClass('active');
        }
    };
})(jQuery);

Modal.init();